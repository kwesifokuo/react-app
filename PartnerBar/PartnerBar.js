import React from 'react';
import {withRouter} from 'react-router-dom';
//import Auth from '../Auth';
import { connect } from 'react-redux';
//import { store } from '../ghtstore';

//import ReactModal from 'react-modal';
//import SignupForm from '../SignupForm/SignupForm';
//import { withFirebase } from '../components/Firebase';
//import firebase from 'firebase/app';
import 'firebase/auth';

//import SignIn from '../SignIn/SignIn';
//import Partner from '../Partner/Partner';
//import Help from './Help/Help';

//import styles from './NavBar.module.css'; // This uses CSS modules.
import './modal.css';

import logo from '../img/Logo300x300.png';
import logoBlue from '../img/LogoBlue300x300.png';
//import signupcover from '../img/Signup-image.jpg';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userData: [],
          isSignedIn: false,
          showModal: false,
          showLogin: false,
          pageName: props.page,
          collapsed: true,
          useLogo: props.logo === 'Blue' ? logoBlue : logo,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
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

      acceptMethods(childDoSignout) {
        // Parent stores the method that the child passed
        this.childDoSignout = childDoSignout;
      }

      handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }

      handleOpenLogin () {
        this.setState({ showLogin: true });
      }
      
      handleCloseLogin () {
        this.setState({ showLogin: false });
      }

      getData(val){
            // do not forget to bind getData in constructor
            console.log(val);
            //if(val === 'verify-success'){
            if(val){
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
                //this.setState({ showModal: true });
            }
        }

    toggleNavbar() {
            this.setState({
            collapsed: !this.state.collapsed,
            });
    }

    DoSignout(){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('first_name');
      localStorage.removeItem('phone_number');
      this.props.history.push('/partner-login');
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
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        const scrollClass = this.state.scrolling ? 'scrolling' : 'not-scrolling';
        return (
            <>
            <div className={this.state.pageName}>
            <nav className={`${scrollClass} navbar bg-default navbar-expand-md navbar-light fixed-top`}>
              <a className="" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/">
                    <div className="logo">
                    <img src={this.state.useLogo} alt="Logo" />
                    <span className="logo-name">Ghroupdrive</span>
                    </div>
                </a>
                <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${classOne}`} id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    
                    <li className="nav-item">
                        <a className="btn btn-default" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/terms-and-privacy">
                            Terms of Service
                        </a>
                    </li>
                    
                    <li className="nav-item">
                        <button className="btn btn-default" onClick={() => this.DoSignout()}>
                            Logout
                        </button>
                    </li>
                </ul>

                </div>
                
            </nav>
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