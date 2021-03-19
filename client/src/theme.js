import {createMuiTheme} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import teal from "@material-ui/core/colors/teal";

export default createMuiTheme({
    palette: {
        primary: {
            main: teal[800],
            light: blue[600]
        },
        secondary: {
            main: green[800]
        }
    }
});
