import React, {Component} from 'react';
//import autoBind from 'react-autobind';
//import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
//import Auth from '../Auth';
import axios from 'axios';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
//import { store } from '../ghtstorere';

import firebase from 'firebase/app';
import 'firebase/auth';
//import  { FirebaseContext } from '../components/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import styles from  './SignIn.module.css'; 
import './signmodal.css';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      showModal: true,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.submit = this.submit.bind(this);
    //autoBind(this);
    
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'GH',
            //defaultNationalNumber: '+233545465383',
            recaptchaParameters: {
                size: 'invisible', 
            },
        }
    ],
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            const user = authResult.user;
            //var credential = authResult.credential;
            console.log(authResult);
            //this.submit(user.phoneNumber);
            //this.verifyDone();
            //Auth.signIn(user.phoneNumber, authResult);
            const login = new SignIn();
            login.submit(user.phoneNumber);
            //var isNewUser = authResult.additionalUserInfo.isNewUser;
            //var providerId = authResult.additionalUserInfo.providerId;
            //var operationType = authResult.operationType;
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            
            return false;
            //return 'verify-success';
            },
            signInFailure: function(error) {
            // Some unrecoverable error occurred during sign-in.
            // Return a promise when error handling is completed and FirebaseUI
            // will reset, clearing any UI. This commonly occurs for error code
            // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
            // occurs. Check below for more details on this.
            console.log(error);
            //this.verifyFailed();
            return true;
            //return handleUIError(error);
            },
    },
    };

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  updatePhone(value) {
    console.log(value.replace(/\s+/g, ''));
    this.setState({
        phoneNumber: value.replace(/\s+/g, ''),
    });
  }

   setPhone(num){
    //console.log(e);
    console.log(num);
  }

  async submit(phoneNumber) {
    /* this.setState({
      disabled: true,
    });
    this.setState({ loading: true }); */

    //this.setState({ validated: true });

    await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/login/', {
      phone_number: phoneNumber,
    }, {
    headers: { 'Accept': `application/json` }
    }).then(response => {
            console.log('response data login');
            console.log(response);
            //let { data } = response.data;
                localStorage.setItem("token", response.data.auth_token);
                localStorage.setItem("user_id", response.data.id);
                localStorage.setItem("first_name", response.data.first_name);
                localStorage.setItem("phone_number", response.data.phone_number);
                //window.location.assign(`/user-dashboard/${response.data.id}`);
                const currentpage = window.location.pathname;
                window.location.assign(currentpage);
                //this.props.history.push(`/user-dashboard/${response.data.id}`);
                //this.setState({ failureMsg: true });
                /* this.setState({ disabled: false });
                this.setState({ loading: false }); */
                //this.handleOpenModal();
    }).catch(error => {
        if(error.response){
          console.log('error login');
          console.log(error.response);
          /* this.setState({ failureMsg: true });
          this.setState({ msgDetail: error.response.data.detail });
          this.setState({ disabled: false });
          this.setState({ loading: false }); */
          this.handleOpenModal();
        }
        
    });

    //let { data } = await res.data;
    
    //this.setState({ user: data });
    /* store.dispatch({
        type: 'USER_LIST_SUCCESS',
        users: data
    }); */
    console.log('sign in user');
    //console.log(res);

  }

  async doLogin(phoneNumber) {
    console.log('check phone');
    console.log(phoneNumber);
   let res = await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/login/', {
        phone_number: phoneNumber,
    }, {
      headers: { 'Accept': `application/json` }
    });

    //let { data } = await res.data;
    //this.setState({ user: data });
    /* store.dispatch({
      type: 'GET_USERS_SUCCESS',
      users: res.data ? res.data : data
    }); */
    console.log('signed in user');
    console.log(res);
    this.history.pushState(null, '/');

    /* let resp = await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/login/', {
        phone_number: this.state.phoneNumber,
    }, {
      headers: { 'Accept': `application/json` }
    }); */
    
    //this.onSignupSubmit();
    //this.handleOpenVerify();
    //this.processSignup(this.state.phoneNumber); //, this.state.VerificationCode
    //this.props.history.push('/');
  }

  async login() {
   
   let res = await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/login/', {
        phone_number: this.state.phoneNumber,
    }, {
      headers: { 'Accept': `application/json` }
    });

    //let { data } = await res.data;
    //this.setState({ user: data });
    /* store.dispatch({
      type: 'USER_LIST_SUCCESS',
      users: res.data ? res.data : data
    }); */
    console.log('signed in user');
    console.log(res);

    /* let resp = await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/login/', {
        phone_number: this.state.phoneNumber,
    }, {
      headers: { 'Accept': `application/json` }
    }); */
    
    //this.onSignupSubmit();
    //this.handleOpenVerify();
    //this.processSignup(this.state.phoneNumber); //, this.state.VerificationCode
    //this.props.history.push('/');
  }


  render() {
    let isSuccess, message;

    if (this.props.response.hasOwnProperty('auth_token')) {
      isSuccess = this.props.response.data;
      message = 'has response'; //this.props.response.data;
      
    /*   if (isSuccess) {
        localStorage.removeItem('token');
        localStorage.setItem('token', this.props.response.auth_token);
        localStorage.setItem('userdata', this.props.response);
      } */
    }
    return (
      <>
      <div className="center-div processing">
          <h3>Sign In with Phone Number</h3>
          
          {!isSuccess ? <div>{message}</div> : this.history.push('/')}
          {/* <Form> */}
                
                    {/* <Form.Row id="phone">
                        <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label> 
                            <Form.Control onBlur={(e) => {this.updatePhone(e.target.value)}} type="text" placeholder="enter phone number" /> 
                        </Form.Group>
                    </Form.Row> */}
                    {/* <IntlTelInput
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      preferredCountries={['gh', 'ng', 'za']}
                      //onPhoneNumberChange={this.onChange()}
                      onPhoneNumberBlur = {(status, value, countryData, number, id) => {
                        this.updatePhone(number);
                      //console.log('onPhoneNumberBlur value', value);
                      //console.log('onPhoneNumberBlur number', number);
                    }}
                    format
                    formatOnInit={false}
                    separateDialCode
                    /> */}
                    {/* <Button 
                    variant="primary" 
                    disabled={this.state.disabled}
                    onClick={() => {this.login()}}
                    className="btn btn-primary btn-lg btn-block" type="submit">
                        LOGIN
                    </Button> */}
         {/*  </Form> */}
          <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}/>
      </div>
      {/* <div className="container">
        <div className="row">
          {
            
          }
        </div>
      </div> */}
         {/*  <div className="modal-block">
                <ReactModal 
                isOpen={this.state.showModal}
                contentLabel="Sign Up">
                <div className="row signup-box">
                    <div className="col-md-6 col-sm-12 bannerbox">
                        <img alt='Sign Up Banner' src={signupcover} />
                        <h2>Trips . Tours . Destinations</h2>
                    </div>
                    <div className="col-md-6 col-sm-12">
                    <button className="close" onClick={this.handleCloseModal}>X</button>
                        <div className="row sign-up">
                          <div className="center-div">
                              <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig}
                                      firebaseAuth={firebaseApp.auth()}/>
                          </div>
                        </div>
                    </div>
                </div>
                </ReactModal>
            </div> */}

            </>
    )
  }
}

//export default withRouter(SignIn);
/* const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
} */

const mapStateToProps = (response) => ({response});

//export default SignIn;
export default withRouter(connect(mapStateToProps)(SignIn));