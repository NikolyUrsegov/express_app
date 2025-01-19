export type ValueOf<T> = T[keyof T]

export type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
