import React from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        // textTransform: 'capitalize',
        margin: theme.spacing(1),
        minWidth: 120
    },
    select: {
        minWidth: 120,
        width: '200px'
    }
}));

function AppSelectElement({field, meta, types}) {
    const classes = useStyles();


    return (
        <FormControl {...field}
            variant='outlined'
            className={classes.root}>
            <InputLabel
                id='demo-simple-select-outlined-label'>{field.name + ':'}</InputLabel>
                <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    name={field.name}
                    value={meta.value}
                    onChange={field.onChange}
                    label={field.name + ':'}
                    className={classes.select}
                >
                    {types.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            {(meta.error && meta.touched) && <div className='error'>{meta.error}</div>}
        </FormControl>
    );
}

export default AppSelectElement;
