import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/layout"
import Details from "../components/Details"
import Home from "../components/Home"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import Talkers from "../components/Talkers"

import Dialog from "../components/Dialog"

const App = () => (
    <Layout>
        <Router>
            <PrivateRoute path="/app/home" component={Home} />
            <PrivateRoute path="/app/profile" component={Details} />
            <PrivateRoute path="/app/dialog" component={Dialog} />
            <PrivateRoute path="/app/talkers" component={Talkers} />
            <Login path="/app/login" />
            <SignUp path="/app/signup" />
        </Router>
    </Layout>
)

export default App