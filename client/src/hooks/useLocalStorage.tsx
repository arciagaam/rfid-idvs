import { useState } from "react"

function useLocalStorage<T>(key: string, defaultValue?: unknown) {
    const [storedValue, setStoredValue] = useState<T | null>(
        () => {
            let _value = localStorage.getItem(key);

            if (_value === null) {
                _value = JSON.stringify(defaultValue);
            }

            // try {
            //     const _localStorageValue = localStorage.getItem(key);

            //     if (_localStorageValue === null) {
            //         _value = JSON.stringify(defaultValue);
            //     } else {
            //         _value = JSON.stringify(_localStorageValue);
            //     }
            // } catch (error) {
            //     _value = JSON.stringify(defaultValue);
            // }

            return JSON.parse(_value);
        }
    );

    const storeValueToStorage = (value: unknown) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            if (defaultValue) {
                localStorage.setItem(key, JSON.stringify(defaultValue));
            }
        }
    }

    const setValue = (value: T) => {
        setStoredValue(() => {
            storeValueToStorage(value);
            return value;
        })
    }

    return [
        storedValue,
        setValue
    ];
}

export { useLocalStorage };
