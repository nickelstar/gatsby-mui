import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import DashboardPage1 from '../dashboard/pages/page1/index'
import Login from "../dashboard/pages/login/index"
import DialogDemo from "../dashboard/pages/dialogDemo/index"

import Details from "../components/Details"
import SignUp from "../components/SignUp"
import Talkers from "../components/Talkers"


const App = () => (
    <Router>
        <PrivateRoute path="/app/home" component={DashboardPage1} />
        <PrivateRoute path="/app/dialogDemo" component={DialogDemo} />
        <PrivateRoute path="/app/profile" component={Details} />
        <PrivateRoute path="/app/talkers" component={Talkers} />
        <Login path="/app/login" />
        <SignUp path="/app/signup" />
    </Router>
)

export default App