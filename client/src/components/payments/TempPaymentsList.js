import React, {useEffect} from 'react';
import {withStyles, makeStyles} from "@material-ui/core";
import theme from "../../theme";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {connect} from "react-redux";
import {setPayments} from "../../store/actions";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

export const StyledTableCell = withStyles(() => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width: 150
    },
    body: {
        fontSize: 14,
        width: 200
    },
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700
    },
    add: {
        margin: '10px'
    }
});

function PaymentsList({payments, setPayments}) {

    const classes = useStyles();

    useEffect(() => {
        setPayments();
    }, [setPayments]);
    console.log(payments);
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">uuid</StyledTableCell>
                        <StyledTableCell align="left">Payment Type</StyledTableCell>
                        <StyledTableCell align="left">Payment Status</StyledTableCell>
                        <StyledTableCell align="left">Last 4 Symbol</StyledTableCell>
                        <StyledTableCell align="left">Amount</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*{payments.map((item) => (
                        <StyledTableRow key={item._id}>
                            <StyledTableCell align="left">{item._id}</StyledTableCell>
                            <StyledTableCell align="left">{item.paymentType}</StyledTableCell>
                            <StyledTableCell align="left">{item.paymentStatus}</StyledTableCell>
                            <StyledTableCell align="left">{item.lastFour}</StyledTableCell>
                            <StyledTableCell align="left">{item.amount}</StyledTableCell>
                        </StyledTableRow>
                    ))}*/}
                    {payments}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = ({payments}) => ({payments});

const mapDispatchToProps = {
    setPayments
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsList);
