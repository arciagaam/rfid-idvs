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

export function storeFile(path: string, blob: Blob) {
    const writeStream = fs.createWriteStream(path);
    writeStream.on('finish', () => {
        console.log('File saved successfully!');
    });
    writeStream.on('error', (err) => {
        console.error('Error saving file:', err);
    });
    writeStream.write(blob);
    writeStream.end();
}

export function mimeToExtension(mime: string) {
    return "." + mime.split('/')[1];
}
