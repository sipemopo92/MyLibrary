import { IGoogleapiBook } from "./googleapi-book";

export interface ResponseGoogleapiBooks {
    success: boolean;
    message: string;
    data: IGoogleapiBook[];
}