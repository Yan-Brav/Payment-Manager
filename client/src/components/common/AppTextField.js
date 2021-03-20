import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        textTransform: 'capitalize',
        margin: '5px'
    }
});

function AppTextField({field, meta}) {
    const classes = useStyles();
    return (
        <TextField {...field}
                   label={field.name + ':'}
                   variant='outlined'
                   color='primary'
                   helperText={meta.error}
                   size='small'
                   className={classes.root}>
            <div className='form-field'>
                <input name={field.name}
                       value={meta.value}
                       onChange={field.onChange}/>
            </div>
            {(meta.error && meta.touched) && <div className='error'>{meta.error}</div>}
        </TextField>
    );
}

export default AppTextField;
