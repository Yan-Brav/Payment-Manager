const {Schema, model} = require('mongoose');

const paymentSchema = new Schema({
    routingNumber: Number,
    paymentType: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'processing'
    },
    lastFour: String,
    amount: {
        type: Number,
        set: v => {
            if (typeof v === 'string') {
                return Number(v.replace(',', '.')).toFixed(2);
            }
            return v.toFixed(2);
        }
    }
});

module.exports = model('Payment', paymentSchema);
