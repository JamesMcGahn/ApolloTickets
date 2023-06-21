import { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardLayout from './DashboardLayout';
import { TixDashTabContext } from '../../context/TixDashTabsContext';
import TicketHistoryNav from '../navs/TicketHistoryNav';
import BreadCrumbs from '../navs/BreadCrumbs';

function Layout({ children }) {
  const location = useLocation();

  const noBreads = ['/agent/dashboard', '/agent/dashboard/mytickets/'];
  const noBreadCrumbs = noBreads.includes(location.pathname);

  const { tabStatuses, setCurrentTab } = useContext(TixDashTabContext);
  const handleOnClick = (i) => {
    setCurrentTab(i);
  };

  return (
    <DashboardLayout
      dwrDefOpen
      list={
        <>
          <List>
            <Link to="/agent/dashboard">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Tickets" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="My Tickets" />
            </ListItem>
            {tabStatuses.map((status, i) => (
              <Link
                to="/agent/dashboard/mytickets/"
                key={`${status}-nav-item`}
                onClick={() => handleOnClick(i)}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={status} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      }
    >
      <TicketHistoryNav />
      {!noBreadCrumbs && <BreadCrumbs />}
      {children}
    </DashboardLayout>
  );
}
export default Layout;
