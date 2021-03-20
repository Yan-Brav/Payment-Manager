import api from '../api';

export const PAYMENTS_SET = 'PAYMENTS_SET';
export const setPayments = (payload) => ({type: PAYMENTS_SET, payload});
export const fetchPayments = () => (dispatch) => {
    api.get('/payment').then(({data}) => dispatch(setPayments(data)));
};

export const CREATE_PAYMENT = 'CREATE_PAYMENT';
export const createPlayer = (player,dispatch) => {
    api.post('/payment', player).then(({data}) => dispatch({
        type: CREATE_PAYMENT,
        payload: data
    }))
};
