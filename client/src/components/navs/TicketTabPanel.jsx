import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import TicketTable from '../TicketTable';
import getMyTickets from '../../graphql/queries/getMyTickets';
import { TixDashTabContext } from '../../context/TixDashTabsContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TicketTabPanel() {
  const { tabStatuses, currentTab, setCurrentTab } =
    useContext(TixDashTabContext);

  const theme = useTheme();

  const { data: currU } = useQuery(loggedInUserQ);

  const { loading, error, data } = useQuery(getMyTickets, {
    variables: {
      userId: currU?.currentUser.id,
    },
  });
  const [getMyStatusTix, { loading: lzLoading, error: lzError, data: lzData }] =
    useLazyQuery(getMyTickets);

  const handleQuery = (status) => {
    getMyStatusTix({
      variables: {
        userId: currU?.currentUser.id,
        status: [status],
      },
    });
  };

  useEffect(() => {
    if (currentTab === 0) {
      return;
    }
    handleQuery(tabStatuses[currentTab]);
  }, [currentTab, tabStatuses]);

  const handleChange = (event, newValue) => {
    if (event.target.name !== 'All') {
      handleQuery(event.target.name);
    }
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setCurrentTab(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', minWidth: '60vw' }}>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabStatuses.map((tab, i) => (
            <Tab label={tab} {...a11yProps(i)} name={tab} key={`${tab}-tab`} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={currentTab}
        onChangeIndex={handleChangeIndex}
      >
        {tabStatuses.map((tabP, i) => (
          <TabPanel
            key={`${tabP}-tab-pabel`}
            value={currentTab}
            index={i}
            dir={theme.direction}
          >
            {console.log(data, lzData)}
            {i === 0 &&
              (loading ? 'loading' : <TicketTable data={data?.myTickets} />)}

            {i !== 0 &&
              (lzLoading ? (
                'loading'
              ) : (
                <TicketTable data={lzData?.myTickets} />
              ))}
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
}

export default TicketTabPanel;