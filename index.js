const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const paymentsRouter = require('./routes/payments.routes');

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({extended: true}));
app.use('/api/payment', paymentsRouter);

async function startConnect () {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            autoIndex: false
        });
    } catch(err){
        console.error(err, 'Something went wrong');
    }
}
startConnect().then(() => {
    console.log('MongoDB is connected')
});
app.listen(PORT, () => console.log(`Application is starting on port ${PORT} ...`));
