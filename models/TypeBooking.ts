import { IBooking } from "../Interfaces/IBooking";
import { IRoomData } from "../Interfaces/IRoomData";

export class Booking implements IBooking {
    Name: string;
    Email: string;
    CheckIn: Date;
    CheckOut: Date;
    Discount: number;
    Room: IRoomData;

    constructor(name: string, email: string, checkIn: Date, checkOut: Date, discount: number, room: IRoomData) {
        this.validate(name, email, checkIn, checkOut, discount, room)
        this.Name = name;
        this.Email = email;
        this.CheckIn = checkIn;
        this.CheckOut = checkOut;
        this.Discount = discount;
        this.Room = room;
    }

    get fee(): number {
        let discountedRate = this.Room.Rate * (1 - this.Room.Discount / 100);
        let finalPrice = discountedRate * (1 - this.Discount / 100);
        return Math.floor(finalPrice);
    }

    validate(name: string, email: string, checkIn: Date, checkOut: Date, discount: number, room: IRoomData): void {
        if (name.length < 3) {
            throw new Error("Error Name: Longitud minima requerida 3");
        }
        if (name.length > 256) {
            throw new Error("Error Name: Longitud maxima superada");
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Error Email: No cumple patron email@example.com");
        }
        if (!(checkIn instanceof Date) || !(checkOut instanceof Date) || checkOut < checkIn) {
            throw new Error("Error CheckOut menor a CheckIn");
        }
        if (!Number.isInteger(discount) || discount < 0 || discount > 100) {
            throw new Error("Error Discount: Fuera de rango se espera valor de 0 a 100");
        }
    }
}
