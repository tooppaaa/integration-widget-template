import { Status } from "./components/Search/Status";

export interface Expense {
    name: string,
    amount: number,
    date: string,
    description: string,
    status: Status
}