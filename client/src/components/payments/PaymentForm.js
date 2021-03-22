import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
// import * as Yup from "yup";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core";
import {
    createPayment,
    deleteTempPayment,
    fetchPayments} from "../../store/actions";
import {Field, Form, Formik} from "formik";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppTextField from "../common/AppTextField";
import AppSelectElement from "../common/AppSelectElement";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const EMPTY_PAYMENT = {
    routingNumber: '',
    accountNumber: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    token: '',
    paymentType: 'cc',
    paymentStatus: 'processing',
    lastFour: '',
    amount: ''
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '10px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    gridItem: {
        margin: '10px'
    }
}));

function PaymentForm({createPayment,deleteTempPayment, fetchPayments}) {

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const paymentTypeList = ['cc', 'ach', 'token'];

    const validateCardNumber = (value) => {
        let error;
        if(value) {
            if(value.toString().length !== 16) {
                error = 'Field length must equal 16 symbol'
            }
        }
        return error;
    };

    const last4Create = (credentialNumber) => {
        return credentialNumber.toString().slice(-4);
    };

    const selectStatus = () => {
        const statusList = ['approved', 'declined', 'error'];
        return statusList[Math.floor(Math.random()*statusList.length)];
    };

    const onFormSubmit = async (values, submitProps) => {
        if (values.cardNumber) {
            values = {...values, lastFour: last4Create(values.cardNumber)}
        } else if (values.accountNumber) {
            values = {...values, lastFour: last4Create(values.accountNumber)}
        } else if (values.token) {
            values = {...values, lastFour: last4Create(values.token)}
        } else {
            values = {...values, lastFour: ''}
        }
        history.push('/payments');
        alert('Payment is being processed');
        await setTimeout(() => {
            values = {...values, paymentStatus: selectStatus()};
            deleteTempPayment(values);
            createPayment(values);
            alert(`Payment is ${values.paymentStatus}`);
        }, 40000 );
        submitProps.resetForm();
    };

    const renderForm = ({values, dirty, isValid}) => {
        return (
            <Form id='payments-form' className={classes.root}>
                <Grid container direction='row' spacing={1} >
                    <Grid item xs={2} className={classes.gridItem}>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='paymentType'>
                                    {
                                        (props) => {
                                            return <AppSelectElement field={props.field}
                                                                     meta={props.meta}
                                                                     types={paymentTypeList}
                                                                     />
                                        }
                                    }
                                </Field>
                            </Paper>
                        </Grid>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='amount'>
                                    {AppTextField}
                                </Field>
                            </Paper>
                        </Grid>
                    </Grid>
                    {values.paymentType === 'cc' ? (<Grid item xs={2} className={classes.gridItem}>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='cardNumber' validate={validateCardNumber}>
                                    {AppTextField}
                                </Field>
                            </Paper>
                        </Grid>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='expDate'>
                                    {AppTextField}
                                </Field>
                            </Paper>
                        </Grid>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='cvv'>
                                    {AppTextField}
                                </Field>
                            </Paper>
                        </Grid>
                    </Grid>) : ''}
                    {values.paymentType === 'ach' ? (<Grid item xs={2} className={classes.gridItem}>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='accountNumber'>
                                    {AppTextField}
                                </Field>
                            </Paper>
                        </Grid>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='routingNumber'>
                                    {AppTextField}
                                </Field>
                            </Paper>
                        </Grid>
                    </Grid>) : ''}
                    {values.paymentType === 'token' ?(<Grid item xs={2} className={classes.gridItem}>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='token'>
                                    {AppTextField}
                                </Field>
                            </Paper>
                        </Grid>
                    </Grid>): ''}
                </Grid>
                <div >
                    <Button type='submit'
                            variant='contained'
                            color='primary'
                            size='small'
                            startIcon={<SaveIcon />}
                            disabled={!dirty || !isValid}
                            className={classes.root}>Pay</Button>
                </div>
            </Form>
        )
    };

    return (
        <Formik
            initialValues={EMPTY_PAYMENT}
            onSubmit={onFormSubmit}
            enableReinitialize={true}
            /*validationSchema={validation}*/>
            {renderForm}
        </Formik>
    );
}

const mapStateToProps = ({payments}) => ({payments});

const mapDispatchToProps = {
    createPayment,
    fetchPayments,
    deleteTempPayment
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
