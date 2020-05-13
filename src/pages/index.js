import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'


import SEO from '../components/seo'

const IndexPage = () => (
    <Layout>
        <SEO title="Home Page" />

        <h1>Kebabs Worldwide</h1>

        <p>Bacon ipsum dolor amet shankle pig landjaeger buffalo burgdoggen, bresaola pork shank porchetta. Rump meatball swine, bacon frankfurter shank burgdoggen pig fatback turducken buffalo pork chop turkey. Ham hock spare ribs ball tip beef ribs pork loin t-bone. Ham cow short ribs landjaeger chuck meatloaf. Tri-tip fatback pork, alcatra drumstick pork loin doner chicken tenderloin corned beef kevin prosciutto cow. Burgdoggen shank andouille doner. Andouille alcatra picanha swine, tenderloin venison pork turkey bresaola tri-tip jerky frankfurter short loin biltong.</p>
    <Link to="/">Home</Link><br />
    <Link to="/app/home">Dashboard</Link><br />
    <Link to="/app/profile">Your Profile</Link><br />
    <Link to="/app/dialog">Dialog</Link><br />
    <Link to="/app/talkers">Talkers</Link><br />
    </Layout >
)

export default IndexPage
