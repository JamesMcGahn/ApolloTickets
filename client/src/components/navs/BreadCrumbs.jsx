import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useQuery } from '@apollo/client';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import getUser from '../../graphql/queries/getUser';
import getACompany from '../../graphql/queries/getACompany';
import getAGroup from '../../graphql/queries/getAGroup';
import LinkRouter from '../utils/LinkRouter';

const userBread = ({ match }) => {
  const { userId } = match.params;
  const { data } = useQuery(getUser, { variables: { userId: userId } });
  return data?.user.name;
};
const comanyBread = ({ match }) => {
  const { id } = match.params;
  const { data } = useQuery(getACompany, { variables: { companyId: id } });
  return data?.company.name || 'Not Found';
};
const groupBread = ({ match }) => {
  const { id } = match.params;

  const { data } = useQuery(getAGroup, { variables: { groupId: id } });

  return data?.group.name || 'Not Found';
};

function BreadCrumbs() {
  const routes = [
    { path: '/agent', breadcrumb: 'Agent Home' },
    { path: '/customer', breadcrumb: 'Customer Home' },
    { path: '/agent/dashboard/ticket/', breadcrumb: null },
    { path: '/customer/dashboard/ticket/', breadcrumb: null },
    { path: '/agent/users/:userId', breadcrumb: userBread },
    { path: '/agent/companies/:id', breadcrumb: comanyBread },
    { path: '/agent/companies/:id/:userId', breadcrumb: userBread },
    { path: '/agent/dashboard/groups/:id', breadcrumb: groupBread },
    { path: '/agent/dashboard/groups', breadcrumb: 'Groups' },
    { path: '/agent/dashboard/groups/:groupId/ticket/', breadcrumb: null },
    { path: '/agent/dashboard/:id/ticket/', breadcrumb: null },
    { path: '/agent/knowledge', breadcrumb: 'Knowledge Base' },
    { path: '/customer/knowledge', breadcrumb: 'Knowledge Base' },
    { path: '/agent/knowledge/articles', breadcrumb: 'Edit Articles' },
    {
      path: '/agent/knowledge/create',
      breadcrumb: 'Create Articles',
    },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  const last = breadcrumbs.length - 1;
  return (
    <Container sx={{ padding: '.5rem 0 .5rem .5rem !important' }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs.map(({ match, breadcrumb }, i) => {
          if (i === last) {
            return (
              <Typography color="text.primary" key={match.pathname}>
                {breadcrumb}
              </Typography>
            );
          }
          return (
            <LinkRouter
              underline="hover"
              color="inherit"
              to={match.pathname}
              key={match.pathname}
            >
              {breadcrumb}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
}

export default BreadCrumbs;
