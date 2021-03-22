import React from "react";
// import {useHistory} from "react-router-dom";
import * as Yup from "yup";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core";
import {createPayment} from "../../store/actions";
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
    paymentStatus: '',
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

function PaymentForm({createPayment}) {

    const classes = useStyles();
    // const history = useHistory();

    const paymentTypeList = ['cc', 'ach', 'token'];

    Yup.addMethod(Yup.mixed, 'length', function(length, msg) {
        return this.test({
            name: 'length',
            message: msg,
            test: value => value && value.toString().length === length
        });
    });
    Yup.addMethod(Yup.mixed, 'maximum', function(max, msg) {
        return this.test({
            name: 'maximum',
            message: msg,
            test: value => value && value.toString().length <= max
        });
    });


    /*const validation = Yup.object({
        cardNumber: Yup.number().length(16, `Field length must equal 16 symbol`)/!*,
        routingNumber: Yup.number('Field must contain only digits').length(9, 'Field length must equal 9 symbol'),
        accountNumber: Yup.number('Field must contain only digits').maximum(17, 'Field length must less or equal 17 symbol')*!/
    });*/

    const validateCardNumber = (value) => {
        let error;
        /*if (typeof value !== "number") {
            error = 'Field must contain only digits';

        }*/
        if(value.toString().length !== 16) {
            error = 'Field length must equal 16 symbol'
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

    const onFormSubmit = (values, submitProps) => {
        if (values.cardNumber) {
            values = {...values, lastFour: last4Create(values.cardNumber)}
        } else if (values.accountNumber) {
            values = {...values, lastFour: last4Create(values.accountNumber)}
        } else if (values.token) {
            values = {...values, lastFour: last4Create(values.token)}
        } else {
            values = {...values, lastFour: ''}
        }
        values = {...values, paymentStatus: selectStatus()};
        createPayment(values);
        submitProps.resetForm();
        // alert(values.paymentType)
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
                    </Grid>) : values.paymentType === 'ach' ? (<Grid item xs={2} className={classes.gridItem}>
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
                    </Grid>) : (<Grid item xs={2} className={classes.gridItem}>
                        <Grid container direction='column' justify='flex-start' spacing={1}>
                            <Paper className={classes.paper}>
                                <Field name='token'>
                                    {AppTextField}
                                </Field>
                            </Paper>
                        </Grid>
                    </Grid>)}
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

const mapDispatchToProps = {
    createPayment
};

export default connect(null, mapDispatchToProps)(PaymentForm);
