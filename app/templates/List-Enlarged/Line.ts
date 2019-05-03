import { Status } from "../../components/Search/Status";

export interface Line {
    id: number;
    urlPicture: string;
    title: string;
    date: string;
    subtitle: string;
    description: string;
    detail: Status;
}