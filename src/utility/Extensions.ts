declare global {
    interface ObjectConstructor {
        isEmpty(obj: any): boolean;
    }

    interface String {
        toDate(): Date;
    }

    interface Array<T> {
        delete(index: number): void;
        delete(item: T): void;
        delete(predicate: (value: T, index: number, obj: T[]) => any, thisArg?: any): void;
    }
}

Object.isEmpty = function (obj: any): boolean {
    if (obj === undefined || obj === null || obj === '')
        return true;
    else if ((typeof obj === 'object' || Array.isArray(obj)))
        return Object.entries(obj).length === 0;
    else
        return false;
}

String.prototype.toDate = function (): Date {
    const date = Date.parse(this as string);

    if (!isNaN(date)) {
        return new Date(date);
    }
    else
        throw new Error('Data non valida');
}

Array.prototype.delete = function <T>(predicate: ((value: T, index: number, obj: T[]) => any) | T | number, thisArg?: any): void {
    let index = -1;

    if (typeof predicate == 'function')
        index = this.indexOf(this.find(predicate as any, thisArg));
    else if (predicate instanceof Object)
        index = this.indexOf(predicate);
    else if (typeof predicate == 'number')
        index = predicate;

    if (index > -1)
        this.splice(index, 1);
}

export { }; 
