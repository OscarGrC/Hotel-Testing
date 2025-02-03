import Booking from "../models/Booking";
import { IBooking } from "./IBooking";
export interface IRoom {
    Name: string;
    Bookings: IBooking[];
    Rate: number;
    Discount: number;
    validate(name: string, bookings: Booking[], rate: number, discount: number): void;
    isOccupied(date: Date): boolean;
    occupancyPercentage(startDate: Date, endDate: Date): number;
}