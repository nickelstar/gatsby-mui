/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import TopLayout from './TopLayout';
import GlobalContextProvider from "../../src/context/GlobalContextProvider"

export const wrapRootElement = ({ element }) => {
    return <TopLayout>
        <GlobalContextProvider>
            {element}
        </GlobalContextProvider>
    </TopLayout>;
};
