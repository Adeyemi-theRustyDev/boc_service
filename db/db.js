import mongoose from "mongoose";

mongoose.connect(process.env.DB_URI)
.then(() => console.log('Connection successful'))
    .catch((_err) => console.error('Connection failed!'));

