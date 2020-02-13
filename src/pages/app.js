import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import DashboardPage1 from '../dashboard/pages/page1/index'
import Login from "../dashboard/pages/login/index"

import Details from "../components/Details"
import SignUp from "../components/SignUp"
import Talkers from "../components/Talkers"

import Dialog from "../components/Dialog"

const App = () => (
    <Router>
        <PrivateRoute path="/app/home" component={DashboardPage1} />
        <PrivateRoute path="/app/profile" component={Details} />
        <PrivateRoute path="/app/dialog" component={Dialog} />
        <PrivateRoute path="/app/talkers" component={Talkers} />
        <Login path="/app/login" />
        <SignUp path="/app/signup" />
    </Router>
)

export default App