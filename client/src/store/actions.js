import api from '../api';

export const PAYMENTS_SET = 'PAYMENTS_SET';
const setPayments = (payload) => ({type: PAYMENTS_SET, payload});
export const fetchPayments = () => (dispatch) => {
    api.get('/payment').then(({data}) => dispatch(setPayments(data)));
};

export const CREATE_PAYMENT = 'CREATE_PAYMENT';
const addPayment = (payload) => ({type: CREATE_PAYMENT, payload});
export const createPayment = (payment) => (dispatch) => {
    api.post('/payment', payment).then(({data}) => dispatch(addPayment(data)))
};

/*export const ADD_TEMP_PAYMENT = 'ADD_TEMP_PAYMENT';
export const addTempPayment = (payload) => ({type: ADD_TEMP_PAYMENT, payload});*/

export const DELETE_TEMP_PAYMENT = 'DELETE_TEMP_PAYMENT';
export const deleteTempPayment = (payload) => ({type: DELETE_TEMP_PAYMENT, payload});
