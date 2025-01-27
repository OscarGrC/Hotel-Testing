const Booking = require("./models/Booking");


describe("Booking validation tests", () => {
    describe("Name property", () => {
        test("Other date type", () => {
            expect(() => new Booking(123, "email@example.com", new Date(), new Date(), 10, {})).toThrow("Error Name: Tipo de dato incorrecto");
            expect(() => new Booking(null, "email@example.com", new Date(), new Date(), 10, {})).toThrow("Error Name: Tipo de dato incorrecto");
            expect(() => new Booking(undefined, "email@example.com", new Date(), new Date(), 10, {})).toThrow("Error Name: Tipo de dato incorrecto");
            expect(() => new Booking([], "email@example.com", new Date(), new Date(), 10, {})).toThrow("Error Name: Tipo de dato incorrecto");
        });

        test("Logitud maxima superada", () => {
            const longName = "a".repeat(257);
            expect(() => new Booking(longName, "email@example.com", new Date(), new Date(), 10, {})).toThrow("Error Name: Longitud maxima superada");
        });
        test("Logitud minima no alcanzada", () => {
            const longName = "aa";
            expect(() => new Booking(longName, "email@example.com", new Date(), new Date(), 10, {})).toThrow("Error Name: Longitud minima requerida 3");
        });

        test("Success", () => {
            expect(() => new Booking("Oscar Master", "email@example.com", new Date(), new Date(), 10, {})).not.toThrow();
        });
    });

    describe("Email property", () => {
        test("Other date type", () => {
            expect(() => new Booking("Name", 123, new Date(), new Date(), 10, {})).toThrow("Error Email: Tipo de dato incorrecto");
            expect(() => new Booking("Name", null, new Date(), new Date(), 10, {})).toThrow("Error Email: Tipo de dato incorrecto");
            expect(() => new Booking("Name", undefined, new Date(), new Date(), 10, {})).toThrow("Error Email: Tipo de dato incorrecto");
            expect(() => new Booking("Name", [], new Date(), new Date(), 10, {})).toThrow("Error Email: Tipo de dato incorrecto");
        });

        test("String but not regex ", () => {
            expect(() => new Booking("Name", "invalid-email", new Date(), new Date(), 10, {})).toThrow("Error Email: No cumple patron patron email@example.com");
        });

        test("Success", () => {
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 10, {})).not.toThrow();
        });
    });

    describe("CheckIn and CheckOut properties", () => {
        test("Other date type", () => {
            expect(() => new Booking("Name", "email@example.com", "2023-01-01", new Date(), 10, {})).toThrow("Error CheckIn: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", null, new Date(), 10, {})).toThrow("Error CheckIn: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", undefined, new Date(), 10, {})).toThrow("Error CheckIn: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", new Date(), "2023-01-02", 10, {})).toThrow("Error CheckOut: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", new Date(), null, 10, {})).toThrow("Error CheckOut: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", new Date(), undefined, 10, {})).toThrow("Error CheckOut: Tipo de dato incorrecto");
        });

        test("Success", () => {
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 10, {})).not.toThrow();
        });
    });

    describe("Discount property", () => {
        test("Other date type", () => {
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), null, {})).toThrow("Error Discount: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), undefined, {})).toThrow("Error Discount: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), "12", {})).toThrow("Error Discount: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), true, {})).toThrow("Error Discount: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 12.232, {})).toThrow("Error Discount: Tipo de dato incorrecto");

        });
        test("Fuera de rango limite", () => {
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), -1, {})).toThrow("Error Discount: Fuera de rango se espera valor de 0 a 100");
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 101, {})).toThrow("Error Discount: Fuera de rango se espera valor de 0 a 100");
        });

        test("Success", () => {
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 0, {})).not.toThrow();
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 50, {})).not.toThrow();
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 100, {})).not.toThrow();
        });
    });

    describe("Room property", () => {
        test("Other date type", () => {
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 10, null)).toThrow("Error Room: Tipo de dato incorrecto");
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 10, "invalid")).toThrow("Error Room: Tipo de dato incorrecto");
        });

        test("Missing required fields", () => {
            const invalidRoom = { Name: "Room 1" };
            expect(() => new Booking("Name", "email@example.com", new Date(), new Date(), 10, invalidRoom)).toThrow("Error Room: Faltan valores en objeto");
        });

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
            expect(booking.fee).toBe(4500);

        });

        test("Success Limits discount", () => {
            const validRoom = { Name: "Room 1", Rate: 10000, Discount: 0, Bookings: [] };
            const booking = new Booking("Name", "email@example.com", new Date(), new Date(), 0, validRoom);
            expect(booking.fee).toBe(10000);

            const highDiscountRoom = { Name: "Room 1", Rate: 10000, Discount: 100, Bookings: [] };
            const bookingHigh = new Booking("Name", "email@example.com", new Date(), new Date(), 100, highDiscountRoom);
            expect(bookingHigh.fee).toBe(0);
        });
    });
});

