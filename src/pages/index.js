import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'


import SEO from '../components/seo'

const IndexPage = () => (
    <Layout>
        <SEO title="Home Page" />

        <h1>Site Home.</h1>
        <p>Welcome to your new Gatsby site with multi-user authentication powered by <a href="https://amplify.aws">AWS Amplify</a></p>
        <p>Create a new account: <Link to="/app/signup">Sign Up</Link></p>
        <Link to="/">Home</Link><br />
        <Link to="/app/home">Dashboard</Link><br />
        <Link to="/app/profile">Your profile</Link><br />
        <Link to="/app/dialog">Dialog</Link><br />
        <Link to="/app/talkers">Talkers</Link><br />
    </Layout>
)

export default IndexPage
