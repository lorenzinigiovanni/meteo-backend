import { plainToClass } from 'class-transformer';
import { JSONRenameClass } from '../utility/decorators/JSONRename';
import { JSONSchemaClass } from '../utility/decorators/JSONSchema';
import StatusCodes, { IStatusCodes } from '../utility/errors/StatusCodes';
import { RequiredParams, ErrorObject, TypeParams, AdditionalPropertiesParams, EnumParams } from 'ajv';

export class BodyValidationError extends Error implements IStatusCodes {
    httpCode?: number | null;
    code?: number | null;
    error?: IStatusCodes;

    constructor(message?: IStatusCodes, validationError?: ErrorObject) {
        super(message?.message as string | undefined);
        Object.setPrototypeOf(this, BodyValidationError.prototype);

        this.name = 'BodyValidationError';
        this.httpCode = message?.httpCode;
        this.code = message?.code;
        this.error = message;
    }
}

export abstract class BaseRequest {
    // eslint-disable-next-line @typescript-eslint/ban-types
    public static fromJSON<T extends BaseRequest>(this: (new () => T), input: any, checkEmptyJSON = true, trim = true, exposeProps = false): T {
        const res = new this();

        if (checkEmptyJSON)
            if (Object.isEmpty(input))
                throw StatusCodes.emptyJSON;

        const renameDecorators = JSONRenameClass.getDecorators(res);

        if (!Object.isEmpty(renameDecorators)) {
            for (const property of renameDecorators) {
                Reflect.set(input, property.propertyName, input[property.renameString]);
                Reflect.deleteProperty(input, property.renameString);
            }
        }

        const schemaDecorators = JSONSchemaClass.getDecorators(res);
        if (!Object.isEmpty(schemaDecorators)) {
            const valid = schemaDecorators?.compiledSchema(input);

            if (!valid)
                BaseRequest.parseError(schemaDecorators?.compiledSchema.errors as ErrorObject[]);
        }

        if (trim)
            for (const key in input) {
                if (key == 'constructor')
                    continue;

                if (!Object.isEmpty(input[key]) && input[key].constructor === String) {
                    input[key] = input[key].trim();
                }
            }

        const requestInstance = plainToClass(this, input, { excludeExtraneousValues: exposeProps });
        return requestInstance;
    }

    private static parseError(errors: ErrorObject[]) {
        errors.forEach(error => {
            switch (error.keyword) {
                case 'required': {
                    const customError = StatusCodes.missingField;
                    customError.message += ` in body: ${(<RequiredParams>error.params).missingProperty}`;

                    throw new BodyValidationError(customError);
                }
                case 'type': {
                    const schemaErrorType = (<TypeParams>error.params).type;

                    if (schemaErrorType == 'number')
                        throw new BodyValidationError(StatusCodes.invalidNumber, error);
                    else if (schemaErrorType == 'string')
                        throw new BodyValidationError(StatusCodes.invalidString, error);
                    else if (schemaErrorType == 'boolean')
                        throw new BodyValidationError(StatusCodes.invalidBoolean, error)
                    else
                        throw new BodyValidationError(StatusCodes.invalidType, error);
                }
                case 'additionalProperties': {
                    const customError = StatusCodes.notAllowedField;
                    customError.message += ` in body: ${(<AdditionalPropertiesParams>error.params).additionalProperty}`;

                    throw new BodyValidationError(customError);
                }
                case 'enum': {
                    const customError = StatusCodes.valueNotInEnum;
                    customError.message += `${(<EnumParams>error.params).allowedValues}`;

                    throw new BodyValidationError(customError, error);
                }
                default:
                    throw new BodyValidationError(StatusCodes.unkownError);
            }
        })
    }
}
