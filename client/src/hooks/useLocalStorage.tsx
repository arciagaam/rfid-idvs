import { useCallback, useState } from "react"

function useLocalStorage<T>(key: string, defaultValue?: unknown): [T | null, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T | null>(
        () => {
            try {
                let _value = localStorage.getItem(key);

                if (_value === null) {
                    _value = JSON.stringify(defaultValue);
                }

                return JSON.parse(_value);
            } catch (error) {
                return null;
            }
        }
    );

    const storeValueToStorage = useCallback(
        (value: unknown) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                if (defaultValue) {
                    localStorage.setItem(key, JSON.stringify(defaultValue) ?? null);
                }
            }
        },
        [key, defaultValue]
    )

    const setValue = useCallback(
        (value: T) => {
            setStoredValue(() => {
                storeValueToStorage(value);
                return value;
            })
        },
        [storeValueToStorage]
    )

    return [
        storedValue,
        setValue
    ]
}

export { useLocalStorage };
