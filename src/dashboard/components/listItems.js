import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { navigate } from '@reach/router'
import { Auth } from 'aws-amplify'

import Link from './Link';

import { logout, isLoggedIn } from "../../utils/auth"

export const MainListItems = () => {
    return (
        <div>

            <LoginAndOut />

            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItem>
        </div >
    )
}


export const SecondaryListItems = () => {
    return (

        <div>
            <ListSubheader inset>Saved reports</ListSubheader>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
            </ListItem>
        </div >
    )
}

const LoginAndOut = () => {
    if (isLoggedIn()) {
        return (<ListItem button>
            <ListItemIcon>
                <LockIcon />
            </ListItemIcon>
            <Link to="/app/login" color="inherit" onClick={
                () => Auth.signOut().then(logout(() =>
                    navigate('/app/login')))
                    .catch(err => console.log('error:', err))
            }>
                <ListItemText primary="Sign Out" />
            </Link>
        </ListItem>)
    }

    return (<ListItem button >
        <ListItemIcon>
            <LockOpenIcon />
        </ListItemIcon>

        <Link to="/app/login" color="inherit">
            <ListItemText primary="Log In" />
        </Link>
    </ListItem>)

}