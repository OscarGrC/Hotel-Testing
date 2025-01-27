class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.Name = name;
        this.Email = email;
        this.CheckIn = checkIn;
        this.CheckOut = checkOut;
        this.Discount = discount;
        this.Room = room;
    }

    // Methods

    get fee() {
        return true;
    }
}
module.exports = Booking;