import React from 'react';


import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
import Layout from '../../components/Layout'
import SEO from '../../../components/seo'
import NewSalesForm from '../../components/newSalesForm'

import EditableSalesTable from '../../components/editableSalesTable'

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

export default function OrderEntry() {
    return (
        <div>
            <SEO title="Dialog Demo" />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <EditableSalesTable />
                    <NewSalesForm />
                </Layout>
            </ThemeProvider>
        </div>
    );
}