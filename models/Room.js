class Room {
    constructor(name, rate, discount) {
        this.Name = name;
        this.Bookings = [];
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
}