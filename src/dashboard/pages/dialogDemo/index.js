import React from 'react';

import Dialog from '../../components/Dialog'

import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
import Layout from '../../components/Layout'
import SEO from '../../../components/seo'

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

export default function DialogDemo() {
    return (
        <div>
            <SEO title="Dialog Demo" />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <Dialog />
                </Layout>
            </ThemeProvider>
        </div>
    );
}