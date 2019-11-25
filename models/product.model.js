const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 150,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 300,
    },
    price: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        minlength: 5,
        maxlength: 300,
        required: true,
        match: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        default: "https://image.flaticon.com/icons/svg/26/26290.svg",
    },
    imageALT: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        trim: true,
        default: "New guitar. Image coming soon.",
    },
    productType: {
       type: String,
       required: true,
       trim: true,
       minlength: 5,
       maxlength: 50,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product