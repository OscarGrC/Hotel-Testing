class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.validate(name, email, checkIn, checkOut, discount, room)
        this.Name = name;
        this.Email = email;
        this.CheckIn = checkIn;
        this.CheckOut = checkOut;
        this.Discount = discount;
        this.Room = room;
    }

    // Methods

    get fee() {
        let discountedRate = this.Room.Rate * (1 - this.Room.Discount / 100);
        let finalPrice = discountedRate * (1 - this.Discount / 100);
        finalPrice = Math.floor(finalPrice) / 100;
        return finalPrice * 100;
    }

    validate(name, email, checkIn, checkOut, discount, room) {
        //name 
        if (typeof name !== "string") {
            throw new Error("Error Name: Tipo de dato incorrecto");
        }
        if (name.length > 256) {
            throw new Error("Error Name: Longitud maxima superada");
        }
        if (name.length < 3) {
            throw new Error("Error Name: Longitud minima requerida 3");
        }
        //email
        if (typeof email !== "string") {
            throw new Error("Error Email: Tipo de dato incorrecto");
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Error Email: No cumple patron email@example.com");
        }
        //checkIn checkOut 
        if (!(checkIn instanceof Date)) {
            throw new Error("Error CheckIn: Tipo de dato incorrecto");
        }
        if (!(checkOut instanceof Date)) {
            throw new Error("Error CheckOut: Tipo de dato incorrecto");
        }
        //discount
        if (!Number.isInteger(discount)) {
            throw new Error("Error Discount: Tipo de dato incorrecto");
        }
        if (discount < 0 || discount > 100) {
            throw new Error("Error Discount: Fuera de rango se espera valor de 0 a 100");
        }
        //room 
        if (typeof room !== 'object' || room === null || Array.isArray(room)) {
            throw new Error("Error Room: Tipo de dato incorrecto");
        }
        const requiredProperties = ['Name', 'Rate', 'Discount', 'Bookings'];
        for (let prop of requiredProperties) {
            if (!(prop in room)) {
                throw new Error("Error Room: Faltan valores en objeto");
            }
        }
    }
}
module.exports = Booking;