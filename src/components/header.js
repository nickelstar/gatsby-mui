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

                {
                    isLoggedIn() && (
                        <p
                            onClick={
                                () => Auth.signOut().then(logout(() => navigate('/app/login'))).catch(err => console.log('eror:', err))
                            }
                            style={styles.link}
                        >Sign Out</p>
                    )
                }
            </div>
        </div>
    )
}

const styles = {
    headerTitle: {
        color: 'white',
        textDecoration: 'none',
    },
    link: {
        cursor: 'pointer',
        color: 'white',
        textDecoration: 'underline'
    }
}

export default Header
