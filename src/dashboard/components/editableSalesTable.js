import React, { useEffect, useReducer } from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import API, { graphqlOperation } from '@aws-amplify/api';

import { listCountryFoodSaless } from '../../graphql/queries';
import {
    onCreateCountryFoodSales,
    onUpdateCountryFoodSales,
    onDeleteCountryFoodSales
} from '../../graphql/subscriptions';
import {
    createCountryFoodSales,
    updateCountryFoodSales,
    deleteCountryFoodSales
} from '../../graphql/mutations';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
// import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    // DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

// Action Types
const QUERY = 'QUERY';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

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

const deleteObjectInArray = (array, replacementObject) => {
    return array.filter((item) => {
        if (item.id !== replacementObject.id) {
            // This isn't the item we care about - keep it as-is
            return item
        }
    })
}

const reducer = (state, action) => {
    switch (action.type) {
        case QUERY:
            return { ...state, countryFoodSaless: action.countryFoodSaless };
        case CREATE:
        case CREATE_SUBSCRIPTION:
            return { ...state, countryFoodSaless: [...state.countryFoodSaless, action.countryFoodSales] }
        case UPDATE:
        case UPDATE_SUBSCRIPTION:
            return {
                ...state, countryFoodSaless: updateObjectInArray(state.countryFoodSaless, action.countryFoodSales)
            }
        case DELETE:
        case DELETE_SUBSCRIPTION:
            return {
                ...state, countryFoodSaless: deleteObjectInArray(state.countryFoodSaless, action.countryFoodSales)
            }
        default:
            return state;
    }
};

export default function EditableSalesTable() {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getData() {
            const salesData = await API.graphql(graphqlOperation(listCountryFoodSaless));
            dispatch({ type: QUERY, countryFoodSaless: salesData.data.listCountryFoodSaless.items });
        }
        getData();

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

        const onDeleteSubscription = API.graphql(graphqlOperation(onDeleteCountryFoodSales)).subscribe({
            next: (eventData) => {
                const countryFoodSales = eventData.value.data.onDeleteCountryFoodSales;
                dispatch({ type: DELETE_SUBSCRIPTION, countryFoodSales });
            }
        });

        return () => {
            onCreateSubscription.unsubscribe();
            onUpdateSubscription.unsubscribe();
            onDeleteSubscription.unsubscribe();
        }
    }, []);

    const tableColumns = [
        { title: 'Country Code', field: 'countryCode' },
        { title: 'Donut Sales', field: 'donutSales', type: 'numeric' },
        { title: 'Kebab Sales', field: 'kebabSales', type: 'numeric' },
        { title: 'Sandwich Sales', field: 'sandwichSales', type: 'numeric' },
        { title: 'Burger Sales', field: 'burgerSales', type: 'numeric' },
        { title: 'Hotdog Sales', field: 'hotdogSales', type: 'numeric' },
    ]

    return (
        <MaterialTable
            title="Editable Example"
            icons={tableIcons}
            columns={tableColumns}
            data={state.countryFoodSaless}
            editable={{
                onRowAdd: (newData) => {
                    return new Promise(async (resolve) => {
                        resolve();

                        setTimeout(() => {
                            dispatch({ type: CREATE, countryFoodSales: newData });
                        }, 0);

                        await API.graphql(graphqlOperation(createCountryFoodSales, {
                            input: {
                                ...newData
                            }
                        }))
                    })
                },
                onRowUpdate: (newData, oldData) => {
                    return new Promise(async (resolve) => {
                        resolve();

                        setTimeout(() => {
                            dispatch({ type: UPDATE, countryFoodSales: newData });
                        }, 0);


                        await API.graphql(graphqlOperation(updateCountryFoodSales, {
                            input: {
                                ...newData
                            }
                        }))
                    })
                },

                onRowDelete: oldData =>
                    new Promise(async (resolve) => {
                        resolve();

                        setTimeout(() => {
                            dispatch({ type: DELETE, countryFoodSales: oldData });
                        }, 0);

                        await API.graphql(graphqlOperation(deleteCountryFoodSales, {
                            input: {
                                id: oldData.id
                            }
                        }))
                    }),
            }}
        />
    );
}
