import Ajv = require('ajv');
import tsj = require('ts-json-schema-generator');
import { Config } from 'ts-json-schema-generator';
import { ValidateFunction } from 'ajv';

export interface IJSONSchema {
    className: string,
    rawSchema: JSONSchemaClass,
    compiledSchema: ValidateFunction
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function JSONSchema(): Function {
    return function (target: any) {
        JSONSchemaClass.registerDecorator(target);
    }
}

export class JSONSchemaClass {
    private static decoratorsMap = new Map<unknown, IJSONSchema>();
    private static ajv = new Ajv();
    private static readonly config: Config = {
        tsconfig: 'tsconfig.json',
        expose: 'export',
        jsDoc: 'none',
        topRef: false
    };

    static registerDecorator(target: any): void {
        this.config.type = target.name;
        const schema = tsj.createGenerator(this.config).createSchema(this.config.type);

        const compiledSchema = this.ajv.compile(schema);
        this.decoratorsMap.set(target, { className: target.name, rawSchema: schema, compiledSchema: compiledSchema });
    }

    static getDecorators(target: any): IJSONSchema | undefined {
        return this.decoratorsMap.get(Object.getPrototypeOf(target).constructor);
    }
}
