import React from 'react';
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography";
import theme from "../../theme";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
    toolbar: {
        paddingRight: 24,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        palette: theme.palette.primary
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    menuButton: {
        marginRight: 10
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    }
}));

function Header({menubarOpened, toggleMenubar}) {

    const classes = useStyles();

    return (
        <AppBar
            position='absolute'
            classes={{
                root: clsx(
                    classes.appBar,
                    menubarOpened && classes.appBarShift
                )
            }}
            color='primary'>
        <Toolbar className={classes.toolbar}>
            <IconButton
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={toggleMenubar}
                className={clsx(
                    classes.menuButton,
                    menubarOpened && classes.menuButtonHidden
                )}>
                    <MenuIcon />
            </IconButton>
            <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
                className={classes.title}
            >
                Payment Manager
            </Typography>
        </Toolbar>
        </AppBar>
    );
}

export default Header;
