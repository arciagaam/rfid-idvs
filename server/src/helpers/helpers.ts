export const convertKeysToCamelCase = (key: string) => {
    return key.split('_').reduce((acc, curr, idx) => {
        if (idx === 0) {
            return curr;
        }

        return acc + curr.charAt(0).toUpperCase() + curr.slice(1);
    }, "")
}

export function convertObjectKeys<T>(value: T): object {
    const _obj = new Object;

    if (value instanceof Array) {
        const arrOfObj = [];

        for (const obj of value) {
            arrOfObj.push(convertObjectKeys(obj));
        }

        return arrOfObj;
    } else {
        for (const key in value) {
            const _key = convertKeysToCamelCase(key);
            let _val = value[key] as object;

            if (value[key] instanceof Array) {
                _val = convertObjectKeys(_val);
            }
            
            Object.assign(_obj, { [_key]: _val })
        }
    }

    return _obj;
}
