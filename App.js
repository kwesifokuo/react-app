import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import Home from './Home/Home';
import Trip from './Trip/Trip';
import SearchTrip from './SearchTrip/SearchTrip';
import FindTrip from './FindTrip/FindTrip';
import Search from './Search/Search';
import Book from './Book/Book';
import Booking from './Booking/Booking';
import Partner from './Partner/Partner';
import PartnerSignup from './PartnerSignup/PartnerSignup';
import PartnerLogin from './PartnerLogin/PartnerLogin';
import AdminLogin from './AdminLogin/AdminLogin';
import Help from './Help/Help';
import How from './How/How';
import TermsPrivacy from './TermsPrivacy/TermsPrivacy';
import Verify from './Verify/Verify';
import ThankYou from './ThankYou/ThankYou';
import PartnerDashboard from './PartnerDashboard/PartnerDashboard';
import UserDashboard from './UserDashboard/UserDashboard';
import AdminDashboard from './AdminDashboard/AdminDashboard';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="page">
                <div className="wrapper">
                    <div className="alert-wrap">
                        {alert.message &&
                            <div className={`alert no-show ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/user-dashboard/:id" component={UserDashboard} />
                                <Route exact path='/partner-dashboard/:id' component={PartnerDashboard}/>
                                <Route exact path='/admin-dashboard/:id' component={AdminDashboard}/>
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/home" component={HomePage} />
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/trip/:tripId' component={Trip}/>
                                <Route exact path='/book/:tripId' component={Book}/>
                                <Route exact path='/booking/:tripId' component={Booking}/>
                                <Route exact path='/search-trip/:st/:std/:edd/:key' component={SearchTrip}/>
                                <Route exact path='/search/:st/:std/:edd/:key' component={Search}/>
                                <Route exact path='/search-trips/' component={FindTrip}/>
                                <Route exact path='/Partner' component={Partner}/>
                                <Route exact path='/partner-signup' component={PartnerSignup}/>
                                <Route exact path='/partner-login' component={PartnerLogin}/>
                                <Route exact path='/admin-login' component={AdminLogin}/>
                                <Route exact path='/verify/:verifyCode' component={Verify}/>
                                <Route exact path='/thankyou/:transId/:typeId' component={ThankYou}/>
                                <Route exact path='/Help' component={Help}/>
                                <Route exact path='/how-it-works' component={How}/>
                                <Route exact path='/terms-and-privacy' component={TermsPrivacy}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
