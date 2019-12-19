import React from 'react'
import { Link } from 'gatsby'

const Home = () => <div>
    <h1>Home</h1>
    <p>You are now logged in!</p>
    <Link to="/app/profile">View profile</Link><br />
    <Link to="/app/dialog">View dialog</Link><br />
    <p>Now go build something great and deploy it using the <a href="https://console.amplify.aws">AWS Amplify Console</a></p>
</div>

export default Home