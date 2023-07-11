import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import CustomerHome from './pages/CustomerHome';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AgentHome from './pages/AgentHome';
import AgentDashboard from './pages/AgentDashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/utils/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import CustomerDashboard from './pages/CustomerDashboard';
import Companies from './pages/Companies';
import Company from './pages/Company';
import Users from './pages/Users';
import User from './pages/User';
import Unassigned from './pages/Unassigned';
import TicketReview from './pages/TicketReview';
import TicketSearch from './pages/TicketSearch';
import GroupsTicket from './pages/GroupsTicket';
import AgentBlogs from './pages/AgentBlogs';
import AgentBlog from './pages/AgentBlog';
import Blog from './pages/Blog';
import BlogId from './pages/BlogId';
import BlogCategories from './pages/BlogCategories';
import BlogCategory from './pages/BlogCategory';
import AgentBlogImages from './pages/AgentBlogImages';
import AgentBlogCreate from './pages/AgentBlogCreate';
import AgentArticleCreate from './pages/AgentArticleCreate';
import AgentArticle from './pages/AgentArticle';
import AgentArticles from './pages/AgentArticles';
import AgentArticleImages from './pages/AgentArticleImages';
import RootLayout from './components/layout/RootLayout';
import NotFound from './pages/NotFound';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute allowedUser="agent" />}>
        <Route path="/agent" element={<AgentHome />} />
        <Route path="/agent/profile" element={<Profile />} />
        <Route path="/agent/dashboard/" element={<AgentDashboard />} />
        <Route path="/agent/dashboard/unassigned" element={<Unassigned />} />
        <Route path="/agent/dashboard/ticket" element={<TicketSearch />} />
        <Route path="/agent/dashboard/ticket/:id" element={<Ticket />} />
        <Route
          path="/agent/dashboard/groups/:groupId"
          element={<GroupsTicket />}
        />
        <Route path="/agent/dashboard/:group/ticket/:id" element={<Ticket />} />
        <Route
          path="/agent/dashboard/:group/:groupId/ticket/:id"
          element={<Ticket />}
        />
        <Route path="/agent/companies" element={<Companies />} />
        <Route path="/agent/companies/:id" element={<Company />} />
        <Route path="/agent/companies/:id/:userId" element={<User />} />
        <Route path="/agent/users" element={<Users />} />
        <Route path="/agent/users/:userId" element={<User />} />
        <Route path="/agent/blogs" element={<AgentBlogs />} />
        <Route path="/agent/blogs/create" element={<AgentBlogCreate />} />
        <Route path="/agent/blogs/:slug" element={<AgentBlog />} />
        <Route path="/agent/blogs/:slug/images" element={<AgentBlogImages />} />
        <Route path="/agent/articles" element={<AgentArticles />} />
        <Route path="/agent/articles/create" element={<AgentArticleCreate />} />
        <Route path="/agent/articles/:slug" element={<AgentArticle />} />
        <Route
          path="/agent/articles/:slug/images"
          element={<AgentArticleImages />}
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/dashboard/ticket/:id" element={<Ticket />} />
        <Route
          path="/customer/dashboard/ticket/:id/feedback"
          element={<TicketReview />}
        />
      </Route>
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/categories" element={<BlogCategories />} />
      <Route path="/blog/categories/:category" element={<BlogCategory />} />
      <Route path="/blog/categories/:category/:slug" element={<BlogId />} />
      <Route path="/blog/:slug" element={<BlogId />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default appRouter;
