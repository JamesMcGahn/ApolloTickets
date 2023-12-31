import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo';
import './index.css';
import App from './App';
import { TixDashTabsProvider } from './context/TixDashTabsContext';
import { TixHistoryProvider } from './context/TixHistoryContext';
import { AgentDashProvider } from './context/AgentDashContext';
import muiTheme from './utils/muiTheme';
import '@fontsource/average-sans';
import 'react-toastify/dist/ReactToastify.css';

// trunk-ignore(eslint/no-undef)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AgentDashProvider>
        <TixHistoryProvider>
          <TixDashTabsProvider>
            <ThemeProvider theme={muiTheme}>
              <RouterProvider router={App} />
            </ThemeProvider>
          </TixDashTabsProvider>
        </TixHistoryProvider>
      </AgentDashProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
