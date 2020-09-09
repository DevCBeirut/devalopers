import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "./core/redux/store";
import './index.scss';
import Landing from './pages/landing/Landing';
import * as serviceWorker from './serviceWorker';
import Jobs from "./pages/jobs/Jobs";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import PrivacyPolicy from "./pages/static/privacyPolicy";
import Terms from "./pages/static/terms";
import Signupdev from "./pages/signupdev/Signupdev";
import Blog from "./pages/blog/Blog";
import ForgotPassword from "./pages/forgot/ForgotPassword";

import ResetPasssword from "./pages/forgot/ResetPasssword";

import Contact from "./pages/contact/Contact";
import PostAJob from "./pages/postajob/PostAJob";
import Talent from "./pages/talent/Talent";
import Allskills from "./pages/allskills/Allskills";
import Selectanaccount from "./pages/selectanaccount/Selectanaccount";
import Viewapplicantlist from "./pages/companydashboard/Viewapplicantlist";

import ActiveJobs from "./pages/companydashboard/ActiveJobs";
import CompanyProfile from "./pages/companydashboard/CompanyProfile";
import CompanyHome from "./pages/companydashboard/CompanyHome";

import Messages from "./pages/common/Messages";
import ViewJobInfo from "./pages/jobs/ViewJobInfo";
import DevProfile from "./pages/freelancerdashboard/DevProfile";
import DevHome from "./pages/freelancerdashboard/DevHome";
import SavedJob from "./pages/freelancerdashboard/SavedJob";
import Applications from "./pages/freelancerdashboard/Applications";



const history = createBrowserHistory();

const App = () => (
    <Provider store={configureStore}>
        <ReactNotification />
    <Router history={history}>
        <Switch>
            <Route path="/jobs/?:search">
                <Jobs />
            </Route>
            <Route path="/jobs">
                <Jobs />
            </Route>
            <Route path="/talentdirectory/?:search">
                <Talent />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/forgotpassword">
                <ForgotPassword />
            </Route>
            <Route path="/postajob">
                <PostAJob />
            </Route>
            <Route path="/signupcompany">
                <Signup />
            </Route>
            <Route path="/contactus">
                <Contact />
            </Route>
            <Route path="/talentdirectory">
                <Talent />
            </Route>
            <Route path="/selectanaccount">
                <Selectanaccount />
            </Route>
            <Route path="/signupdev">
                <Signupdev />
            </Route>
            <Route path="/allskills">
                <Allskills />
            </Route>

            <Route path="/company/applicantslist">
                <Viewapplicantlist />
            </Route>
            <Route path="/company/filterapplicantslist/:id">
                <Viewapplicantlist />
            </Route>
            <Route path="/company/activejobs">
                <ActiveJobs />
            </Route>
            <Route path="/company/profile/:id">
                <CompanyProfile />
            </Route>
            <Route path="/company/home">
                <CompanyHome />
            </Route>
            <Route path="/company/messages/:id">
                <Messages />
            </Route>
            <Route path="/company/messages">
                <Messages />
            </Route>


            <Route path="/dev/messages">
                <Messages isdev={true}  />
            </Route>
            <Route path="/editjob/:id">
                <PostAJob edit={true} exact />
            </Route>
            <Route path="/viewjobinfo/:id">
                <ViewJobInfo />
            </Route>

            <Route path="/dev/profile/:id">
                <DevProfile />
            </Route>
            <Route path="/resetpassword/:hash">
                <ResetPasssword />
            </Route>

            <Route path="/dev/home">
                <DevHome />
            </Route>
            <Route path="/dev/savedjobs">
                <SavedJob />
            </Route>
            <Route path="/dev/submitapplication">
                <Applications />
            </Route>
            <Route path="/privacypolicy">
                <PrivacyPolicy />
            </Route>
            <Route path="/termsandconditions">
                <Terms />
            </Route>
            <Route path="/blog">
                <Blog />
            </Route>






            <Route path="/">
                <Landing />
            </Route>
        </Switch>
    </Router>
    </Provider>
);
render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
