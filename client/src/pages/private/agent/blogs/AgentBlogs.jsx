import Box from '@mui/material/Box';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import getAllBlogs from '../../../../graphql/queries/getAllBlogs';
import AgentBlogRoll from '../../../../components/sections/AgentBlogRoll';

function AgentBlogs() {
  const [qvars, setqVars] = useState(undefined);
  const [page, setPage] = useState(1);
  const { loading, data, fetchMore } = useQuery(getAllBlogs, {
    variables: { page: 1 },
  });
  // trunk-ignore(eslint/no-unsafe-optional-chaining)
  const pageCount = data?.blogs.totalDocs / data?.blogs.limit || 1;

  const handleOnClick = (e, num) => {
    setPage(num);
    fetchMore({ variables: { status: qvars, page: num } });
  };

  const handleButton = (status) => {
    setqVars(status);
    setPage(1);
    fetchMore({ variables: { status: status, page: 1 } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '80vw' }}>
        <AgentBlogRoll
          title="Blogs"
          data={data?.blogs}
          handleButton={handleButton}
          handlePageClick={handleOnClick}
          loading={loading}
          page={page}
          pageCount={pageCount}
          createLink="/agent/blogs/create"
          blogorArticle="blogs"
        />
      </Box>
    </Box>
  );
}
export default AgentBlogs;
