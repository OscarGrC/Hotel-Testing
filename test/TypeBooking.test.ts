import { Booking } from "../models/TypeBooking"

describe("Name property", () => {
    test("Logitud maxima superada", () => {
        const longName = "a".repeat(257);
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50 };
        expect(() => new Booking(longName, "email@example.com", new Date(), new Date(), 10, validRoom)).toThrow("Error Name: Longitud maxima superada");
    });
    test("Logitud minima no alcanzada", () => {
        const longName = "aa";
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50 };
        expect(() => new Booking(longName, "email@example.com", new Date(), new Date(), 10, validRoom)).toThrow("Error Name: Longitud minima requerida 3");
    });

    test("Success", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50 };
        expect(() => new Booking("Oscar Master", "email@example.com", new Date(), new Date(), 10, validRoom)).not.toThrow();
    });
});

describe("Email property", () => {

    test("String but not regex ", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50 };
        expect(() => new Booking("Name", "invalid-email", new Date(), new Date(), 10, validRoom)).toThrow("Error Email: No cumple patron email@example.com");
    });

    test("Success", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50 };
        expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 10, validRoom)).not.toThrow();
    });
});

describe("CheckIn and CheckOut properties", () => {
    test("checkOut > checkIn", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50 };
        expect(() => new Booking("Name", "email@example.com", new Date("2025-01-03"), new Date("2025-01-02"), 10, validRoom)).toThrow("Error CheckOut menor a CheckIn");
    });

    test("Success", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50 };
        expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 10, validRoom)).not.toThrow();
    });
});

describe("Discount property", () => {
    test("Fuera de rango limite", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), -1, validRoom)).toThrow("Error Discount: Fuera de rango se espera valor de 0 a 100");
        expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 101, validRoom)).toThrow("Error Discount: Fuera de rango se espera valor de 0 a 100");
    });

    test("Success", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 0, validRoom)).not.toThrow();
        expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 50, validRoom)).not.toThrow();
        expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 100, validRoom)).not.toThrow();
    });
});

describe("Room property", () => {
    test("Success", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 10, validRoom)).not.toThrow();
    });
});

describe("Fee method", () => {
    test("Success", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Name", "email@example.com", new Date(), new Date(), 10, validRoom);
        expect(booking.fee).toBe(4500);

    });
    test("Success but decimal result", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 33, Bookings: [] };
        const booking = new Booking("Name", "email@example.com", new Date(), new Date(), 33, validRoom);
        expect(booking.fee).toBe(4488);

    });

    test("Success Limits discount down", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 0, Bookings: [] };
        const booking = new Booking("Name", "email@example.com", new Date(), new Date(), 0, validRoom);
        expect(booking.fee).toBe(10000);
    });

    test("Success Limits discount up ", () => {
        const highDiscountRoom = { Name: "Room 1", Rate: 10000, Discount: 100, Bookings: [] };
        const bookingHigh = new Booking("Name", "email@example.com", new Date(), new Date(), 100, highDiscountRoom);
        expect(bookingHigh.fee).toBe(0);
    });
});


