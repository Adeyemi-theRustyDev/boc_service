import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    customerID: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    bookID: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    initialDate: {
        type: Date,
        require: false
    },
    deliveryDate: {
        type: Date,
        require: false
    }
})

const Order = mongoose.model('order', orderSchema);

export default Order;