import React from "react";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import {NavLink} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: 0
    },
    searchBox: {
        margin: 5
    }
}));

function MenuBar({menubarOpened, toggleMenubar}) {
    const classes = useStyles();
    return (
        <Drawer
            variant='permanent'
            classes={{
                paper: `${classes.drawerPaper} ${
                    !menubarOpened ? classes.drawerPaperClose : ''
                }`
            }}
            open={menubarOpened}>
            <div className={classes.toolbarIcon}>
                <IconButton onClick={toggleMenubar}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <div>
                <div>
                    <NavLink to='/'>Create payment</NavLink>
                </div>
                <div>
                    <NavLink to='/payments'>Payments</NavLink>
                </div>
            </div>
        </Drawer>
    );
}

export default MenuBar;
