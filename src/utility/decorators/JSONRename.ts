export interface IJSONRename {
    propertyName: string,
    renameString: string
}

export function JSONRename(name: string) {
    return function (target: any, propertyKey: string) {
        JSONRenameClass.registerDecorator(target, propertyKey, name);
    }
}

export class JSONRenameClass {
    private static decoratorsMap: Map<any, IJSONRename[]> = new Map();

    static registerDecorator(target: any, property: any, val: string): void {
        let keys: IJSONRename[] | undefined = this.decoratorsMap.get(target);
        if (!keys) {
            keys = [];
            this.decoratorsMap.set(target, keys);
        }

        keys.push({ propertyName: property, renameString: val });
    }

    static getDecorators(target: any): IJSONRename[] {
        return this.decoratorsMap.get(Object.getPrototypeOf(target))!;
    }
}
