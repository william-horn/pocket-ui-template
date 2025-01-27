export type SmartOmit<T, U extends keyof T> = Omit<T, U>;
export type StringKeyObject = { [key: string]: any };
