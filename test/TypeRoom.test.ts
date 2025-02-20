import { Booking } from "../models/TypeBooking";
import { Room } from "../models/TypeRoom";


describe("Name property", () => {
    test("Success", () => {
        expect(() => new Room("Room 1", [], 100, 10)).not.toThrow();
    });
});

describe("Rate property", () => {
    test("min 0 ", () => {
        expect(() => new Room("Room 1", [], 0, 10)).toThrow("Error Rate: El precio tiene que ser mayor a 0");
    });
    test("Success", () => {
        expect(() => new Room("Room 1", [], 100, 10)).not.toThrow();
    });
});

describe("Discount property", () => {
    test("Out of range values", () => {
        expect(() => new Room("Room 1", [], 100, -1)).toThrow("Error Discount: Fuera de rango se espera valor de 0 a 100");
        expect(() => new Room("Room 1", [], 100, 101)).toThrow("Error Discount: Fuera de rango se espera valor de 0 a 100");
    });

    test("Success", () => {
        expect(() => new Room("Room 1", [], 100, 0)).not.toThrow();
        expect(() => new Room("Room 1", [], 100, 50)).not.toThrow();
        expect(() => new Room("Room 1", [], 100, 100)).not.toThrow();
    });
});

describe("Bookings property", () => {
    test("Success", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date(), new Date(), 10, validRoom)
        expect(() => new Room("Room 1", [], 10000, 10)).not.toThrow();
        expect(() => new Room("Room 1", [booking], 10000, 10)).not.toThrow();
    });
});

describe("isOccupied method", () => {
    test("Success - Occupied", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const room = new Room("Room 1", [booking], 10000, 10);
        expect(room.isOccupied(new Date("2025-01-28"))).toBe(true);
    });

    test("Success - Not occupied", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const room = new Room("Room 1", [booking], 10000, 10);
        expect(room.isOccupied(new Date("2025-04-10"))).toBeFalsy();
    });
});

describe("occupancyPercentage method", () => {
    test("0% occupancy", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const room = new Room("Room 1", [], 10000, 10);
        const room2 = new Room("Room 1", [booking], 10000, 10);
        expect(room.occupancyPercentage(new Date("2025-01-01"), new Date("2025-01-10"))).toBe(0);
        expect(room2.occupancyPercentage(new Date("2025-01-01"), new Date("2025-01-26"))).toBe(0);
    });
    test("33,33% occupancy", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const room = new Room("Room 1", [booking], 10000, 10);
        expect(room.occupancyPercentage(new Date("2025-01-23"), new Date("2025-01-28"))).toBe(33.33);
    });

    test("50% occupancy", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const room = new Room("Room 1", [booking], 10000, 10);
        expect(room.occupancyPercentage(new Date("2025-01-25"), new Date("2025-01-28"))).toBe(50);
    });

    test("100% occupancy", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const room = new Room("Room 1", [booking], 10000, 10);
        expect(room.occupancyPercentage(new Date("2025-01-27"), new Date("2025-01-30"))).toBe(100);
    });
});

describe("totalOccupancyPercentage static method", () => {
    test("0% total occupancy", () => {
        const rooms = [
            new Room("Room 1", [], 100, 10),
            new Room("Room 2", [], 100, 10),
        ];
        expect(Room.totalOccupancyPercentage(rooms, new Date("2025-01-01"), new Date("2025-01-10"))).toBe(0);
    });
    test("33.33% total occupancy", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const rooms = [
            new Room("Room 1", [booking], 10000, 10),
            new Room("Room 2", [booking], 10000, 10),
        ];
        expect(Room.totalOccupancyPercentage(rooms, new Date("2025-01-23"), new Date("2025-01-28"))).toBe(33.33);
    });
    test("50% total occupancy", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const rooms = [
            new Room("Room 1", [booking], 10000, 10),
            new Room("Room 2", [booking], 10000, 10),
        ];
        expect(Room.totalOccupancyPercentage(rooms, new Date("2025-01-25"), new Date("2025-01-28"))).toBe(50);
    });
    test("100% total occupancy", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const rooms = [
            new Room("Room 1", [booking], 10000, 10),
            new Room("Room 2", [booking], 10000, 10),
        ];
        expect(Room.totalOccupancyPercentage(rooms, new Date("2025-01-27"), new Date("2025-01-30"))).toBe(100);
    });
});

describe("availableRooms static method", () => {
    test("All rooms available", () => {
        const rooms = [
            new Room("Room 1", [], 100, 10),
            new Room("Room 2", [], 100, 10),
        ];
        expect(Room.availableRooms(rooms, new Date("2025-01-01"), new Date("2025-01-10"))).toEqual(rooms);
    });

    test("Some rooms occupied", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const rooms = [
            new Room("Room 1", [booking], 10000, 10),
            new Room("Room 2", [], 10000, 10),
        ];
        expect(Room.availableRooms(rooms, new Date("2025-01-28"), new Date("2025-01-30"))).toEqual([new Room("Room 2", [], 10000, 10)]);
    });
    test("All rooms occupied", () => {
        const validRoom = { Name: "Room 1", Rate: 10000, Discount: 50, Bookings: [] };
        const booking = new Booking("Oscar Master", "email@example.com", new Date("2025-01-27"), new Date("2025-03-05"), 10, validRoom)
        const rooms = [
            new Room("Room 1", [booking], 10000, 10),
            new Room("Room 2", [booking], 10000, 10),
        ];
        expect(Room.availableRooms(rooms, new Date("2025-01-28"), new Date("2025-01-30"))).toEqual([]);
    });
});