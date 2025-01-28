class Room {
    constructor(name, bookings, rate, discount) {
        this.Validate(name, bookings, rate, discount)
        this.Name = name;
        this.Bookings = bookings;
        this.Rate = rate;
        this.Discount = discount;
    }


    isOccupied(date) {
        if (!(date instanceof Date)) {
            throw new Error("Error isOccupied: Valor pasado a funcion incorrecto");
        }
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);
        for (let booking of this.Bookings) {
            if (booking.CheckIn instanceof Date && booking.CheckOut instanceof Date) {
                const normalizedCheckIn = new Date(booking.CheckIn);
                const normalizedCheckOut = new Date(booking.CheckOut);
                normalizedCheckIn.setHours(0, 0, 0, 0);
                normalizedCheckOut.setHours(0, 0, 0, 0);

                if (normalizedDate.getTime() >= normalizedCheckIn.getTime() && normalizedDate.getTime() <= normalizedCheckOut.getTime()) {
                    return true;
                }
            }
        }
        return false;
    }

    occupancyPercentage(startDate, endDate) {
        // Primero calculamos número de días totales entre el intervalo
        const days = (endDate.getTime() - startDate.getTime()) / 86400000 + 1;
        if (days <= 0) return 0;
        let occupiedDays = 0;
        // Ahora recorremos todos los días y llamamos a isOccupied para verificar cada día
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (this.isOccupied(currentDate)) {
                occupiedDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return Math.round((occupiedDays / days) * 100 * 100) / 100;
    }



    static totalOccupancyPercentage(rooms, startDate, endDate) {
        const totalRooms = rooms.length;
        let occupancyRooms = 0;

        for (let room of rooms) {
            occupancyRooms += room.occupancyPercentage(startDate, endDate);
        }
        const globalOccupancy = occupancyRooms / totalRooms;
        return Math.round(globalOccupancy * 100) / 100;
    }


    static availableRooms(rooms, startDate, endDate) {
        let freeRooms = [];

        for (let room of rooms) {
            if (room.occupancyPercentage(startDate, endDate) === 0) {
                freeRooms.push(room);
            }
        }

        return freeRooms;
    }


    Validate(name, bookings, rate, discount) {
        if (typeof name !== "string") {
            throw new Error("Error Name: Tipo de dato incorrecto");
        }
        if (!Number.isInteger(rate)) {
            throw new Error("Error Rate: Tipo de dato incorrecto");
        }
        if (rate <= 0) {
            throw new Error("Error Rate: El precio tiene que ser mayor a 0");
        }
        if (!Number.isInteger(discount)) {
            throw new Error("Error Discount: Tipo de dato incorrecto");
        }
        if (discount < 0 || discount > 100) {
            throw new Error("Error Discount: Fuera de rango se espera valor de 0 a 100");
        }
        if (!Array.isArray(bookings)) {
            throw new Error("Error Bookings: Tipo de dato incorrecto");
        }

    }
}
module.exports = Room;