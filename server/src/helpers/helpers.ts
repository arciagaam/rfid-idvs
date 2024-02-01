import fs from 'fs';

export const convertKeyToCamelCase = (key: string) => {
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
            const _key = convertKeyToCamelCase(key);
            let _val = value[key] as object;

            if (value[key] instanceof Array) {
                _val = convertObjectKeys(_val);
            }

            Object.assign(_obj, { [_key]: _val })
        }
    }

    return _obj;
}

export function convertBase64toBlob(base64Data: string) {
    const parts = base64Data.split(',');
    const contentType = parts[0].split(':')[1].split(';')[0];
    const base64 = parts[1];
    const decodedData = atob(base64);
    const arrayBuffer = new ArrayBuffer(decodedData.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < decodedData.length; i++) {
        uint8Array[i] = decodedData.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: contentType });
}

export function storeFile(dest: string, name: string, buffer: Buffer) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    try {
        fs.writeFileSync(`${dest}/${name}`, buffer);
    } catch (error) {
        console.log(error);
    }
}

export function getBase64FileType(base64: string) {
    try {
        return base64.substring("data:image/".length, base64.indexOf(";base64"));
    } catch (error) {
        return "";
    }
}

export function mimeToExtension(mime: string) {
    return "." + mime.split('/')[1];
}

export function convertBase64toBuffer(base64Value: string) {
    const base64 = base64Value.split(',')[1];
    return Buffer.from(base64, "base64");
}

export function storeCorrectDate(date: Date) {
    return new Date(
        Date.parse(date.toUTCString()) - date.getTimezoneOffset() * 60000
    );
}

export function ordinalSuffix(i: number) {

    if(i === 0) return 'Invalid Number';

    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}
