import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//         background: "#f9f9f9"
//     },
//     header: {
//         fontSize: "3rem"
//     }
// }));
// const classes = useStyles();

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: "#f9f9f9"
    },
    header: {
        fontSize: "3rem"
    }
});


class HomeGrid extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
    }

    performPrediction = () => {
        alert("Boom!")
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} style={{fontSize: "2rem"}}>Object Detector</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <img
                                src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
                                alt=""
                                style={{width: "100%"}}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <div>
                                <img
                                    src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
                                    alt=""
                                    style={{width: "100%"}}
                                />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} style={{fontSize: "2rem"}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.performPrediction}
                            >
                                Click Me!
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HomeGrid);