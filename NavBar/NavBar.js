import React from 'react';
import {Link, withRouter} from 'react-router-dom';
//import Auth from '../Auth';
import { connect } from 'react-redux';
//import { store } from '../ghtstore';

import ReactModal from 'react-modal';
import SignUp from '../SignUp/SignUp';
import Form from 'react-bootstrap/Form';
//import { withFirebase } from '../components/Firebase';
//import firebase from 'firebase/app';
import 'firebase/auth';

import SignIn from '../SignIn/SignIn';
//import Partner from '../Partner/Partner';
//import Help from './Help/Help';

import styles from './NavBar.module.css'; // This uses CSS modules.
import './modal.css';

import logo from '../img/Logo300x300.png';
import logoBlue from '../img/LogoBlue300x300.png';
import signupcover from '../img/Signup-image.jpg';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userData: [],
          isSignedIn: false,
          showModal: false,
          showLogin: false,
          showNow: false,
          pageName: props.page,
          collapsed: true,
          useLogo: props.logo === 'Blue' ? logoBlue : logo,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.getData = this.getData.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);

        //console.log(store.getState());
      }

      /* signOut() {
        this.signupform.doSignout(); // do stuff
      } */

      isLoggedIn() {
        if (localStorage.getItem('token')) {
          return true;
        }
      
        return false;
      }

      DoSignout(){
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('first_name');
          localStorage.removeItem('phone_number');
          this.props.history.push('/');
      }

      acceptMethods(handleCloseModal) {
        // Parent stores the method that the child passed
        //this.handleCloseModal = handleCloseModal;
      }

      handleOpenModal () {
        this.setState({ showNow: true });
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
        this.setState({ showNow: false });
      }

      handleOpenLogin () {
        this.setState({ showNow: true });
        this.setState({ showLogin: true });

      }
      
      handleCloseLogin () {
        this.setState({ showLogin: false });
        this.setState({ showNow: false });
      }

      toggleLogin () {
        this.setState({ showModal: false });
        this.setState({ showLogin: true });
      }
    
      toggleSignup () {
        this.setState({ showLogin: false });
        this.setState({ showModal: true });
      }

      getData(val){
            // do not forget to bind getData in constructor
            console.log(val);
            //if(val === 'verify-success'){
            if(val){
              //  this.setState({ showModal: false });
                /* store.dispatch({
                    type: 'USER_LIST_SUCCESS',
                    users: val
                  }); */
                /* this.setState({ 
                    //userData: val
                    //showModal: false,
                    //isSignedIn: true,
                }); */
            } else {
               // this.setState({ showModal: true });
            }
        }

    toggleNavbar() {
            this.setState({
            collapsed: !this.state.collapsed,
            });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        if (window.scrollY === 0 && this.state.scrolling === true) {
            this.setState({scrolling: false});
        }
        else if (window.scrollY !== 0 && this.state.scrolling !== true) {
            this.setState({scrolling: true});
        }
    }

    render(){
        //const compName = (this.props.compName).substring(1)+'pg'; className={styles['main-nav']}
        //const { users } = this.props
        const profile_url = "/user-dashboard/"+localStorage.getItem('user_id');
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        const scrollClass = this.state.scrolling ? 'scrolling' : 'not-scrolling';
        return (
            <>
            <div className={this.state.pageName}>
            <nav className={`${scrollClass} navbar bg-default navbar-expand-md navbar-dark fixed-top`}>
                <Link className={`${styles['navbar-brand']}`} to="/">
                    <div className="logo">
                    <img src={this.state.useLogo} alt="Logo" />
                    </div>
                </Link>
                <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${classOne}`} id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="btn btn-default" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-default" to="/search-trips">
                            Search Trips
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-default" to="/how-it-works">
                            How it works
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`${styles.btn} ${styles.highlight} newhighlight`} to="/Partner">
                                Become a Tour Partner
                            </Link>
                    </li>
                    
                    {
                        !this.isLoggedIn() && 
                                <>
                            <li className="nav-item">
                                <button className="btn btn-default" onClick={this.handleOpenModal}>
                                    Sign up
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-default" onClick={this.handleOpenLogin}>
                                    Login
                                </button>
                            </li>
                                </>
                    }
                    <li className="nav-item">
                        <Link className="btn btn-default" to="/Help">
                                Help
                            </Link>
                    </li>
                    {
                        this.isLoggedIn() && 
                                <>
                                <li className="nav-item">
                                    <Link className="btn btn-default" to={profile_url}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <div className={styles['signedIn']}> 
                                        {/* <label className="mr-2 text-white">
                                            Hello {this.state.userData.first_name + ' ' + this.state.userData.last_name}
                                        </label> */}
                                        <button className="btn btn-default" onClick={() => this.DoSignout()}>
                                            Logout
                                        </button>
                                    </div>
                                </li>
                                </>
                    }
                    
    
                </ul>

                </div>
                
            </nav>
            </div>

            <div className="modal-block">
                <ReactModal 
                isOpen={this.state.showNow}
                ariaHideApp={false}
                contentLabel="Sign Up">
                    
                    <div className="row signup-box">
                        <div className="col-md-6 col-sm-12 bannerbox">
                            <img alt='Sign Up Banner' src={signupcover} />
                            <h2>Trips . Tours . Destinations</h2>
                        </div>
                        <div className="col-md-6 col-sm-12 area">
                            <div className="row sign-up user">
                {this.state.showLogin && 
                    <>
                    <button className="close" onClick={this.handleCloseLogin}>X</button>
                    <Form.Label>
                        Don't already have a Ghroupdrive account? &nbsp;
                        <button className="btn btn-default login" type="button" onClick={this.toggleSignup}>
                            Sign Up
                        </button>
                    </Form.Label>
                        <SignIn/>

                    </>

                }
                {this.state.showModal && 
                    <>
                    <Form.Label>
                    Already have a Ghroupdrive account? &nbsp;
                    <button className="btn btn-default login" type="button" onClick={this.toggleLogin}>
                        Login
                    </button>
                    </Form.Label>
                    <button className="close see" onClick={this.handleCloseModal}>X</button>
                    <SignUp />
                    </>
                }
                
                </div>
                    </div>
                </div>
                </ReactModal>
            </div>
            

            </>
          );
    }
  
}

const mapStateToProps = function(store) {
    return {
      //users: store.userState.users
    };
  }

//const unsubscribe = store.subscribe(handleChange)
//unsubscribe()

//export default NavBar;
export default withRouter(connect(mapStateToProps)(NavBar));