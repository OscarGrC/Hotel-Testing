import { IRoomData } from "./IRoomData";

export interface IBooking {
    Name: string;
    Email: string;
    CheckIn: Date;
    CheckOut: Date;
    Discount: number;
    Room: IRoomData;

    get fee(): number;
    validate(name: string, email: string, checkIn: Date, checkOut: Date, discount: number, room: IRoomData): void;
}