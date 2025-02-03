import { IRoom } from "../Interfaces/IRoom";
import { IBooking } from "../Interfaces/IBooking";


export class Room implements IRoom {
    Name: string;
    Bookings: IBooking[];
    Rate: number;
    Discount: number;

    constructor(name: string, bookings: IBooking[], rate: number, discount: number) {
        this.validate(name, bookings, rate, discount);
        this.Name = name;
        this.Bookings = bookings;
        this.Rate = rate;
        this.Discount = discount;
    }

    isOccupied(date: Date): boolean {
        if (!(date instanceof Date)) {
            throw new Error("Error isOccupied: Valor pasado a función incorrecto");
        }
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        return this.Bookings.some(booking => {
            if (booking.CheckIn instanceof Date && booking.CheckOut instanceof Date) {
                const normalizedCheckIn = new Date(booking.CheckIn);
                const normalizedCheckOut = new Date(booking.CheckOut);
                normalizedCheckIn.setHours(0, 0, 0, 0);
                normalizedCheckOut.setHours(0, 0, 0, 0);
                return normalizedDate >= normalizedCheckIn && normalizedDate <= normalizedCheckOut;
            }
            return false;
        });
    }

    occupancyPercentage(startDate: Date, endDate: Date): number {
        const days = (endDate.getTime() - startDate.getTime()) / 86400000 + 1;
        if (days <= 0) return 0;
        let occupiedDays = 0;
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            if (this.isOccupied(currentDate)) {
                occupiedDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return Math.round((occupiedDays / days) * 100 * 100) / 100;
    }

    static totalOccupancyPercentage(rooms: IRoom[], startDate: Date, endDate: Date): number {
        const totalRooms = rooms.length;
        let occupancyRooms = rooms.reduce((sum, room) => sum + room.occupancyPercentage(startDate, endDate), 0);
        return Math.round((occupancyRooms / totalRooms) * 100) / 100;
    }

    static availableRooms(rooms: IRoom[], startDate: Date, endDate: Date): IRoom[] {
        return rooms.filter(room => room.occupancyPercentage(startDate, endDate) === 0);
    }

    validate(name: string, bookings: IBooking[], rate: number, discount: number): void {
        if (typeof name !== "string") throw new Error("Error Name: Tipo de dato incorrecto");
        if (!Number.isInteger(rate) || rate <= 0) throw new Error("Error Rate: El precio tiene que ser mayor a 0");
        if (!Number.isInteger(discount) || discount < 0 || discount > 100) throw new Error("Error Discount: Fuera de rango se espera valor de 0 a 100");
        if (!Array.isArray(bookings)) throw new Error("Error Bookings: Tipo de dato incorrecto");
    }
}
