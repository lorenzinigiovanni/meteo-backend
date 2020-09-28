export interface IStatusCodes {
    httpCode?: number | null;
    code?: number | null;
    message?: string | null;
}

export default class StatusCodes implements IStatusCodes {
    httpCode?: number | null;
    code?: number | null;
    message?: string | null;

    constructor(object?: keyof typeof StatusCodes | IStatusCodes) {
        if (!Object.isEmpty(object)) {
            if (object === 'prototype')
                throw new Error('Prototype can not be used as StatusCodes key');

            if (object?.constructor === String) {
                const keys = Reflect.getOwnPropertyDescriptor(StatusCodes, <string>object);

                Object.assign(this, keys?.value);
            }
            else {
                this.code = (<IStatusCodes>object).code;
                this.httpCode = (<IStatusCodes>object).httpCode;
                this.message = (<IStatusCodes>object).message;
            }
        }
        else {
            this.code = null;
            this.httpCode = null;
            this.message = null;
        }
    }

    /**
    * Messaggio di errore da usare alla richiesta di login.
    * Codice HTTP: 400
    */
    static get invalidCredentials(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10000, message: 'Invalid username or password' });
    }
    /**
    * Messaggio di errore da usare quando si vuole accedere ad una risorsa e non si ha il permesso.
    * Codice HTTP: 401
    */
    static get unauthorizedAccess(): StatusCodes {
        return new StatusCodes({ httpCode: 401, code: 10001, message: 'Unauthorized access' });
    }
    /**
     * Messaggio di errore da usare durante la registrazione o se si modifica la password, e la password è troppo weak.
     * Codice HTTP: 400
     */
    static get weakPassword(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10002, message: 'Password does not satisfy the policy requirements' });
    }
    /**
     * Messaggio di errore da usare durante la registrazione, se l'email non è una email o è già usata.
     * Messaggio di errore da usare se la richiesta contiene un tipo sbagliato (mail richiesta).
     * Codice HTTP: 400
     */
    static get invalidEmail(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10003, message: 'Email address invalid or already used' });
    }
    /**
     * Messaggio di errore da usare se si modifica la password e la vecchia password è sbagliata.
     * Codice HTTP: 400
     */
    static get invalidOldPassword(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10004, message: 'Old password wrong' });
    }
    /**
     * Messaggio di errore da usare se il token ricevuto è scaduto.
     * Codice HTTP: 401
     */
    static get expiredToken(): StatusCodes {
        return new StatusCodes({ httpCode: 401, code: 10005, message: 'Token expired' });
    }
    /**
     * Messaggio di errore da usare se il token ricevuto non è valido.
     * Codice HTTP: 400
     */
    static get invalidToken(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10006, message: 'Token invalid' });
    }
    /**
     * Messaggio di errore da usare se la richiesta è stata fatta non specificando tutti i campi necessari.
     * Codice HTTP: 400
     */
    static get missingField(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10100, message: 'Mandatory fields missing' });
    }
    /**
     * Messaggio di errore da usare se la richiesta è stata fatta specificando un campo non consentito.
     * Codice HTTP: 400
     */
    static get notAllowedField(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10101, message: 'Field not allowed' });
    }
    /**
     * Messaggio di errore da usare se la richiesta è stata fatta specificando più campi incompatibili tra loro.
     * Codice HTTP: 400
     */
    static get invalidFields(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10102, message: 'Fields not allowed together' });
    }
    /**
     * Messaggio di errore da usare se la richiesta contiene un range non valido.
     * Codice HTTP: 400
     */
    static get invalidRange(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10103, message: 'Range not valid' });
    }
    /**
     * Messaggio di errore da usare se la richiesta contiene un tipo sbagliato (stringa richiesta).
     * Codice HTTP: 400
     */
    static get invalidString(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10104, message: 'Required a string, get other' });
    }
    /**
     * Messaggio di errore da usare se la richiesta contiene un tipo sbagliato (intero richiesto).
     * Codice HTTP: 400
     */
    static get invalidNumber(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10105, message: 'Required a number, get other' });
    }
    /**
     * Messaggio di errore da usare se la richiesta contiene un tipo sbagliato (JSON richiesto).
     * Codice HTTP: 400
     */
    static get invalidJSON(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10107, message: 'JSON not valid' });
    }
    /**
     * Messaggio di errore da usare se la richiesta contiene un tipo sbagliato (data richiesta).
     * Codice HTTP: 400
     */
    static get invalidDate(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10108, message: 'Date not valid' });
    }
    /**
     * Messaggio di errore da usare se la richiesta contiene una stringa troppo corta.
     * Codice HTTP: 400
     */
    static get tooShortString(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10109, message: 'Minimum length not valid' });
    }
    /**
     * Messaggio di errore da usare se la richiesta contiene una stringa troppo lunga.
     * Codice HTTP: 400
     */
    static get tooLongString(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10111, message: 'String length too long' });
    }
    /**
     * Messaggio di errore da usare se c'è un campo duplicato nel database.
     * Codice HTTP: 400
     */
    static get duplicateField(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10112, message: 'Duplicate field' });
    }
    /**
     * Messaggio di errore da usare se la richiesta contiene un valore numero al di sotto della soglia.
     * Codice HTTP: 400
     */
    static get tooSmallNumber(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10113, message: 'Number too small' });
    }
    /**
     * Messaggio di errore da usare se c'è un campo vuoto.
     * Codice HTTP: 400
     */
    static get emptyField(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10114, message: 'Empty field' });
    }
    /**
    * Messaggio di errore da usare se la richiesta contiene un tipo sbagliato. Da usare quando non è possibile determinare i tipi con precisione.
    * Codice HTTP: 400
    */
    static get invalidType(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10115, message: 'Invalid type' });
    }
    /**
    * Messaggio di errore da usare se la richiesta contiene un valore non booleano.
    * Codice HTTP: 400
    */
    static get invalidBoolean(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10116, message: 'Invalid boolean' });
    }
    /**
    * Messaggio di errore da usare se la richiesta contiene un JSON vuoto.
    * Codice HTTP: 400
    */
    static get emptyJSON(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10117, message: 'Empty JSON' });
    }
    /**
    * Messaggio di errore da usare se la richiesta contiene un valore che non è presente nell'enum.
    * Codice HTTP: 400
    */
    static get valueNotInEnum(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10118, message: 'Value not in enum. Values allowed: ' });
    }
    /**
    * Messaggio di errore da usare se la richiesta contiene un valore numero al di sotto della soglia.
    * Codice HTTP: 400
    */
    static get tooBigNumber(): StatusCodes {
        return new StatusCodes({ httpCode: 400, code: 10119, message: 'Number too big' });
    }
    /**
     * Messaggio di errore da usare se non si trova un entità.
     * Codice HTTP: 404
     */
    static get notFoundEnitity(): StatusCodes {
        return new StatusCodes({ httpCode: 404, code: 10206, message: 'Entity not found' });
    }
    /**
     * Messaggio di errore da usare quando viene riscontrato un problema non gestito, aggiungere a 'message' il dump dell'errore.
     * Codice HTTP: 500
     */
    static get unkownError(): StatusCodes {
        return new StatusCodes({ httpCode: 500, code: 1300, message: 'Unknown error' });
    }
}
