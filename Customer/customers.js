import express from 'express';
import Customer from './Customer.js';
import '../db/db.js'; // Connect to the db

const app = express();

app.use(express.json());
app.post('/customer', async (req, res) => {
    try {
        const newCustomer = await Customer.create({ ...req.body });
        await newCustomer.save()
        return res.status(200).json('Customer created successfully!');
    } catch (_err) {
        res.status(500).json('Internal server error');
    }
})

app.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        if (!customers) {
            return res.status(404).json('No customers yet!');
        }
        return res.status(200).json(customers);
    } catch (_err) {
        res.status(500).json('Internal server error');
    }
})

app.get('/customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json(`Customer  with ID ${req.params.id} not found`);
        }
        return res.status(200).json(customer);
    } catch (_err) {
        res.status(500).json('Internal server error');
    }
})

app.delete('/customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json(`Customer  with ID ${req.params.id} not found`);
        }
        return res.status(200).json('Customer deleted successfully!');
    } catch (_err) {
        res.status(500).json('Internal server error');
    }
})

app.listen(3001,() => console.log('Server is listening on port 3001 --> This is the Customer service'));