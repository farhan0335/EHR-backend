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
    readonly Refresh_token : string
    readonly accesstoken : string;
}