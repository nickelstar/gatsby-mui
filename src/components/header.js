import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { navigate } from '@reach/router'

import { logout, isLoggedIn } from "../utils/auth"
import { Auth } from 'aws-amplify'

import {
    GlobalDispatchContext,
    GlobalStateContext,
} from "../context/GlobalContextProvider"

const Header = ({ siteTitle }) => {
    const dispatch = useContext(GlobalDispatchContext)
    const state = useContext(GlobalStateContext)
    console.log(state)
    console.log(dispatch)

    return (
        <div
            style={{
                background: 'rebeccapurple',
                marginBottom: '1.45rem',
            }}
        >
            <div
                style={{
                    margin: '0 auto',
                    maxWidth: 960,
                    padding: '1.45rem 1.0875rem',
                }}
            >
                <h1 style={{ margin: 0 }}>
                    <Link
                        to="/"
                        style={styles.headerTitle}
                    >
                        {siteTitle}
                    </Link>
                </h1>

                {state.theme}
                <button
                    type="button"
                    onClick={() => {
                        dispatch({ type: "TOGGLE_THEME" })
                    }}
                >
                    Toggle Theme
                </button>

                <LoginAndOut />
            </div>
        </div>
    )
}

const LoginAndOut = () => {
    if (isLoggedIn()) {
        return <p
            onClick={
                () => Auth.signOut().then(logout(() =>
                    navigate('/app/login')))
                    .catch(err => console.log('error:', err))
            }
            style={styles.link}
        >Sign Out</p>
    }

    return <Link to="/app/login" style={styles.link}>Sign In</Link>;

}

const styles = {
    headerTitle: {
        color: 'white',
        textDecoration: 'none',
    },
    link: {
        cursor: 'pointer',
        color: 'white',
        textDecoration: 'underline',
        padding: '5px'
    }
}

export default Header
