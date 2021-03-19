import './App.css';
import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Header from "./components/header/Header";
import MenuBar from "./components/menubar/MenuBar";
import PaymentsList from "./components/payments/PaymentsList";
import PaymentForm from "./components/payments/PaymentForm";
import theme from "./theme";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }
}));

function App() {

  const classes = useStyles();

  const [menubarOpened, setMenubarOpened] = useState(false);
  const toggleMenubar = () => setMenubarOpened(!menubarOpened);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Router>
            <Header
                menubarOpened={menubarOpened}
                toggleMenubar={toggleMenubar}
            />
            <MenuBar
                menubarOpened={menubarOpened}
                toggleMenubar={toggleMenubar}
            />
            <main className={classes.content}>
              <div className={classes.appBarSpacer}/>
              <Switch>
                <Route exact path='/' component={PaymentForm}/>
                <Route path='/payments' component={PaymentsList}/>
                <Route path='*'>
                  <Redirect to='/'/>
                </Route>
              </Switch>
            </main>
          </Router>

        </div>
      </ThemeProvider>

  );
}

export default App;
