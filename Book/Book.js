import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }
})

const Book = mongoose.model('book', BookSchema);
export default Book;