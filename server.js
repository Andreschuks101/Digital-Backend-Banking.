const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
})
.catch(err => console.log(err));

