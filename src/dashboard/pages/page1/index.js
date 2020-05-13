import React, { useEffect, useReducer } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';

import clsx from 'clsx';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './nivoChart/index'
import chartData from './nivoChart/data'
import Deposits from './Deposits';
import Orders from './Orders';
import { ThemeProvider } from "@material-ui/styles";

import Layout from '../../components/Layout'
import SEO from '../../../components/seo'

import { listCountryFoodSaless } from '../../../graphql/queries';
// import { onCreateCountryFoodSales } from '../../../graphql/subscriptions';
import {
    onCreateCountryFoodSales,
    onUpdateCountryFoodSales,
    // onDeleteCountryFoodSales
} from '../../../graphql/subscriptions';
// Action Types
const QUERY = 'QUERY';
// const SUBSCRIPTION = 'SUBSCRIPTION';

const CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION';
const UPDATE_SUBSCRIPTION = 'UPDATE_SUBSCRIPTION';
const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';

const initialState = {
    countryFoodSaless: [],
};

const updateObjectInArray = (array, replacementObject) => {
    return array.map((item, index) => {
        if (item.id !== replacementObject.id) {
            // This isn't the item we care about - keep it as-is
            return item
        }
        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...replacementObject
        }
    })
}

const reducer = (state, action) => {
    switch (action.type) {
        case QUERY:
            return { ...state, countryFoodSaless: action.countryFoodSaless };
        // case SUBSCRIPTION:
        //     return { ...state, countryFoodSaless: [...state.countryFoodSaless, action.countryFoodSales] }
        // case CREATE:
        case CREATE_SUBSCRIPTION:
            return { ...state, countryFoodSaless: [...state.countryFoodSaless, action.countryFoodSales] }
        // case UPDATE:
        case UPDATE_SUBSCRIPTION:
            return {
                ...state, countryFoodSaless: updateObjectInArray(state.countryFoodSaless, action.countryFoodSales)
            }
        default:
            return state;
    }
};

export default function Dashboard() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        async function getData() {
            const salesData = await API.graphql(graphqlOperation(listCountryFoodSaless));
            dispatch({ type: QUERY, countryFoodSaless: salesData.data.listCountryFoodSaless.items });
        }
        getData();

        // const subscription = API.graphql(graphqlOperation(onCreateCountryFoodSales)).subscribe({
        //     next: (eventData) => {
        //         const countryFoodSales = eventData.value.data.onCreateCountryFoodSales;
        //         dispatch({ type: SUBSCRIPTION, talker: countryFoodSales });
        //     }
        // });
        const onCreateSubscription = API.graphql(graphqlOperation(onCreateCountryFoodSales)).subscribe({
            next: (eventData) => {
                const countryFoodSales = eventData.value.data.onCreateCountryFoodSales;
                dispatch({ type: CREATE_SUBSCRIPTION, countryFoodSales });
            }
        });

        const onUpdateSubscription = API.graphql(graphqlOperation(onUpdateCountryFoodSales)).subscribe({
            next: (eventData) => {
                const countryFoodSales = eventData.value.data.onUpdateCountryFoodSales;
                dispatch({ type: UPDATE_SUBSCRIPTION, countryFoodSales });
            }
        });

        return () => {
            onCreateSubscription.unsubscribe();
            onUpdateSubscription.unsubscribe();
            // onDeleteSubscription.unsubscribe();
        }
    }, []);


    const CountryFoodSalesBarChart = ({ countryFoodSaless }) => (
        <Chart data={countryFoodSaless} />
    )

    return (
        <div className={classes.root}>
            <SEO title="Dashboard" />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={classes.paper}>
                                <CountryFoodSalesBarChart countryFoodSaless={state.countryFoodSaless} />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Deposits />
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Orders />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Layout>
            </ThemeProvider>
        </div>
    );
}


const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));
