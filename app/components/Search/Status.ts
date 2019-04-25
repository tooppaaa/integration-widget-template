export enum Status {
    Validated = "Validated",
    InProgress = "InProgress",
    Canceled = "Canceled"
}

export interface StatusAvailable {
    value: Status;
    show: boolean;
}
