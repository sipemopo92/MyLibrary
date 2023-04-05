import { Book } from "./book";
import { IGoogleapiBook } from "./googleapi-book";

export interface ResponseGoogleapiBooks {
    success: boolean;
    message: string;
    data: IGoogleapiBook[];
}

export interface ResponseBook {
    success: boolean;
    message: string;
    data: Book;
}

export interface ResponseBooks {
    success: boolean;
    message: string;
    data: Book[];
}