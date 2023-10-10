export type TUid = string;

export type TUnixDate = number;

export type TPayload<T> = {
    type: string;
    payload: T;
};
