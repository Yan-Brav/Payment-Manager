import {
    DELETE_TEMP_PAYMENT,
    CREATE_PAYMENT,
    PAYMENTS_SET,
} from "./actions";

const initialState = {
    payments: []
};

export default function paymentsReducer(state = initialState, {type, payload}) {
    switch (type) {
        case PAYMENTS_SET: return {...state, payments: payload};
        case CREATE_PAYMENT: return {...state, payments: [...state.payments, payload]};
        // case ADD_TEMP_PAYMENT: return {...state, payments: [...state.payments, payload]};
        case DELETE_TEMP_PAYMENT: return {...state, payments: state.payments.filter(({_id}) => _id !== payload._id)};
        default: return state;
    }
}
