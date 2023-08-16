import { type } from "os";

export enum Role {
    Admin = 'admin',
    Customer = 'customer',
}
type User = {
    id : number;
    Fullname : string;
    Password : string;
    role : Role; 

};
export interface IAuthenticate {
    readonly refresh_token : string
    readonly access_token : string;
}