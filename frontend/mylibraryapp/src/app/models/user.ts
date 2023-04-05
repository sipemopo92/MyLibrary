export interface IUser {
    id: number;
    name: string;
    lastname: string;
    email: string;
}

export class User implements IUser {
    id: number;
    name: string;
    lastname: string;
    email: string;

    constructor() {
        this.id = -1;
        this.name = '';
        this.lastname = '';
        this.email = '';
    }
}