import express from "express";
import axios from "axios";
import '../db/db.js';
import Order from "./Order.js";

const app = express();

app.use(express.json());
app.post('/order', async (req, res) => {
    const { customerID, bookID, initialDate, deliveryDate } = req.body;
    
    try {
        if (!customerID || !bookID || !initialDate || !deliveryDate) {
            return res.status(400).json('Body must contain these parameters: customerID, bookID, initialDate, deliveryDate')
        }
        const newOrder = await Order.create({
            customerID: customerID,
            bookID: bookID,
            initialDate: initialDate,
            deliveryDate: deliveryDate
        });
        await newOrder.save()
        return res.status(201).json('Order placed successfully');


    } catch (err) {
        res.status(500).json(err.message)
    }
})

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json('No orders yet :(');
        }
        return res.status(200).json(orders);
    } catch (_err) {
        res.status(500).json('Internal server error!')
    }
})

app.get('/order/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json(`Order with ID ${id} notfound :(`);
        }
        axios.get(`http://localhost:3001/customer/${order.customerID}`)
            .then(response => {
                let orderObject = {
                    CustomerName: response.data.name,
                    BookTitle: ''
                }
                axios.get(`http://localhost:3000/book/${order.bookID}`)
                    .then(response => {
                        orderObject['BookTitle'] = response.data.title;
                        return res.status(200).json(orderObject);
                    })
            })
    } catch (_err) {
        res.status(500).json('Internal server error!')
    }
})

app.listen(3002, () => console.log('Server is listening on port 3002 --> Order Service'))