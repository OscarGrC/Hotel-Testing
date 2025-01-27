class Room {
    constructor(name, bookings, rate, discount) {
        this.Name = name;
        this.Bookings = bookings;
        this.Rate = rate;
        this.Discount = discount;
    }


    isOccupied(date) {
        return true;
    }

    occupancyPercentage(startDate, endDate) {
        return true;
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        return true;
    }

    static availableRooms(rooms, startDate, endDate) {
        return true;
    }

    //validadores 
}