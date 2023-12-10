/**
    * Makes passed keys as optional objects
    */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & { [P in K]+?: T[P] };


/**
    * Makes passed keys as required objects
    */
export type WithRequired<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };

/**
    * Remove created_at and updated_at types if it exists
    */
export type WithoutDates<T> = Omit<T, "created_at" | "updated_at">;
