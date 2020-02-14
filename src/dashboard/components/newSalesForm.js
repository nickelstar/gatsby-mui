import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useInput } from '../../hooks/formInput';

import API, { graphqlOperation } from '@aws-amplify/api';
import { createCountryFoodSales } from '../../graphql/mutations';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    // textField: {
    //     marginLeft: theme.spacing(1),
    //     marginRight: theme.spacing(1),
    //     width: 200,
    // },
}));

export default function SalesForm() {
    const classes = useStyles();

    const { value: countryCode, bind: bindCountryCode, reset: resetCountryCode } = useInput('');
    const { value: donutSales, bind: bindDonutSales, reset: resetDonutSales } = useInput('');
    const { value: kebabSales, bind: bindKebabSales, reset: resetKebabSales } = useInput('');
    const { value: sandwichSales, bind: bindSandwichSales, reset: resetSandwichSales } = useInput('');
    const { value: burgerSales, bind: bindBurgerSales, reset: resetBurgerSales } = useInput('');
    // const { value: friesSales, bind: bindFriesSales, reset: resetFriesSales } = useInput('');

    const { value: hotdogSales, bind: bindHotdogSales, reset: resetHotdogSales } = useInput('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(`Submitting: `, {
            countryCode,
            donutSales,
            kebabSales,
            sandwichSales,
            burgerSales,
            hotdogSales
        });

        await API.graphql(graphqlOperation(createCountryFoodSales, {
            input: {
                countryCode,
                donutSales,
                kebabSales,
                sandwichSales,
                burgerSales,
                hotdogSales
            }
        }));

        resetCountryCode()
        resetDonutSales()
        resetKebabSales()
        resetSandwichSales()
        resetBurgerSales()
        resetHotdogSales()
    }

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
                id="filled-basic"
                label="Country Code"
                variant="filled"
                {...bindCountryCode}
            />

            <TextField
                id="filled-basic"
                label="Donut Sales"
                variant="filled"
                {...bindDonutSales}
            />

            <TextField
                id="filled-basic"
                label="Kebab Sales"
                variant="filled"
                {...bindKebabSales}
            />

            <TextField
                id="filled-basic"
                label="Sandwich Sales"
                variant="filled"
                {...bindSandwichSales}
            />

            <TextField
                id="filled-basic"
                label="Burger Sales"
                variant="filled"
                {...bindBurgerSales}
            />

            {/* <TextField
                id="filled-basic"
                label="Fries Sales"
                variant="filled"
                {...bindFriesSales}
            /> */}

            <TextField
                id="filled-basic"
                label="Hotdog Sales"
                variant="filled"
                {...bindHotdogSales}
            />

            <Button variant="contained" onClick={handleSubmit}>Add</Button>

        </form>
    );
}