const {Router} = require('express');
const Payment = require('../models/Payment');

const router = Router();

router.get('/', async (req, res) => {
    try {
        await Payment.find({}, {...req.body}, {sort: {'_id': -1}}, (err, payments) => {
            if(err) {
                res.status(500).send('Something wrong, try again')
            } else {
                res.json(payments);
            }
        });
    } catch(err){
        res.status(500).json({message: 'Something wrong, try again'})
    }
});

router.post('/', async (req, res) => {
    try {
        const payment = new Payment({...req.body});
        const doc = await payment.save();
        await res.status(200).json(doc)
    } catch(err){
        console.error(err.message);
    }
});

module.exports = router;
