/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import TopLayout from './TopLayout';

import Auth from '@aws-amplify/auth'
import { setUser } from '../../src/utils/auth'
import GlobalContextProvider from "../../src/context/GlobalContextProvider"

// import Amplify from 'aws-amplify'
// import config from '../../src/aws-exports'
// Amplify.configure(config)

export const wrapRootElement = ({ element }) => {
    return <TopLayout>
        <GlobalContextProvider>
            {element}
        </GlobalContextProvider>
    </TopLayout>;
};

export const onRouteUpdate = (state, page, pages) => {
    Auth.currentAuthenticatedUser()
        .then(user => {
            const userInfo = {
                ...user.attributes,
                username: user.username
            }
            setUser(userInfo)
        })
        .catch(err => {
            window.localStorage.setItem('gatsbyUser', null)
        })
}
