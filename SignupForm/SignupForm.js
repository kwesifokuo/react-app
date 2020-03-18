import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';
//import { store } from '../ghtstore';
//import Firebase from '../components/Firebase';
//import ReactModal from 'react-modal';
//import { withFirebase } from '../components/Firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
//import FormCheck from 'react-bootstrap/FormCheck';
import { registerUserAction } from '../actions/authenticationActions';

import SignIn from '../SignIn/SignIn';
//import TermsPrivacy from '../TermsPrivacy/TermsPrivacy';

import './signup.css';
import signupcover from '../img/Signup-image.jpg';
import styles from '../App.css'; // This uses CSS modules.

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('../firebase-config.json').result;

// Instantiate a Firebase app.
//const firebaseApp = 
firebase.initializeApp(firebaseConfig);

// Instantiate a Firebase app.
const uiConfig = {
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
            //const user = authResult.user;
            //var credential = authResult.credential;
            console.log(authResult);
            //this.verifyDone();
            //Auth.signIn(user.phoneNumber, authResult);
            //var isNewUser = authResult.additionalUserInfo.isNewUser;
            //var providerId = authResult.additionalUserInfo.providerId;
            //var operationType = authResult.operationType;
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            
            return true;
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

class SignupForm extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        key: 'tripstours',
        phoneNumber: '',
        email: '',
        firstname: '',
        lastname: '',
        VerificationCode: '',
        isSignedIn: false,
        showModal: true,
        showLogin: false,
        showVerify: false,
        showForm: true,
        verifySuccess: false,
        user: [],
        agreed: false,
        notAgreed: false,
        disabled: false,
        loading: false,
      };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
        this.handleOpenVerify = this.handleOpenVerify.bind(this);
        this.handleCloseVerify = this.handleCloseVerify.bind(this);
        this.verifyDone = this.verifyDone.bind(this);
        //this.firebase = firebase;
    }

    verifyDone(){
        //this.setState({ verifySuccess: true });
        //this.props.sendVerify('verify-success');
    }

    onSignupSubmit(){
        //do signup
        this.setState({ showForm: false });
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }
      
    handleCloseModal() {
        this.setState({ showModal: false });
        this.props.history.push('/');
    }

    handleOpenLogin () {
        this.setState({ showModal: false });
        this.setState({ showLogin: true });
    }
      
    handleCloseLogin () {
        this.setState({ showLogin: false });
        this.setState({ showModal: true });
        //this.props.history.push('/');
        //window.location.reload();
        //this.componentDidMount();
    }

    handleOpenVerify() {
        this.setState({ showModal: false });
        this.setState({ showVerify: true });
    }
      
    handleCloseVerify() {
        this.setState({ showVerify: false });
    }

    //var phoneNumber = "+16505554567";
    //var testVerificationCode = "123456";

    // This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
    // This will resolve after rendering without app verification.
    processSignup(phoneNumber){
        this.appVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              this.onSignInSubmit();
            }
          });
        // signInWithPhoneNumber will call appVerifier.verify() which will resolve with a fake
        // reCAPTCHA response.
        firebase.auth().signInWithPhoneNumber(phoneNumber, this.appVerifier)
            .then(function (confirmationResult) {
            // confirmationResult can resolve with the whitelisted testVerificationCode above.
            //return confirmationResult.confirm(VerificationCode)

            console.log(confirmationResult);


                //var code = getCodeFromUserInput();
                //confirmationResult.confirm(VerificationCode).then(function (result) {
                // User signed in successfully.
                //var user = result.user;
                //return user;
                // ...
                /* }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                console.log(error);
                return error;
                // ...
                }); */
            }).catch(function (error) {
            // Error; SMS not sent
            console.log(error);
            return error;
            // ...
            });
    }

    /* uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                defaultCountry: 'GH',
                defaultNationalNumber: this.props.phoneNumber,
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
                //Auth.signIn(user.phoneNumber, authResult);
                //var isNewUser = authResult.additionalUserInfo.isNewUser;
                //var providerId = authResult.additionalUserInfo.providerId;
                //var operationType = authResult.operationType;
                // Do something with the returned AuthResult.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
              },
              signInFailure: function(error) {
                // Some unrecoverable error occurred during sign-in.
                // Return a promise when error handling is completed and FirebaseUI
                // will reset, clearing any UI. This commonly occurs for error code
                // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                // occurs. Check below for more details on this.
                console.log(error);
                return true;
                //return handleUIError(error);
              },
        },
      }; */

      updatePhone(value) {
        this.setState({
            phoneNumber: value,
        });
      }

      updateEmail(value) {
        this.setState({
            email: value,
        });
      }

      updateFirst(value) {
        this.setState({
            firstname: value,
        });
      }

      updateLast(value) {
        this.setState({
            lastname: value,
        });
      }

      updateCheck(value) {
        this.setState({
            agreed: value,
        });

        console.log(value);
        //console.log(this.state.agreed);
      }

      doSignout(){
        console.log('do logout now');
        firebase.auth().signOut();
      }

      onHandleRegistration = (event) => {
        event.preventDefault();
    
        let phoneNumber = event.target.phone.value;
        let email = event.target.email.value;
        let lastname = event.target.lastname.value;
        let firstname = event.target.firstname.value;
    
        const data = {
          phoneNumber, email, lastname, firstname
        };
      
          this.props.dispatch(registerUserAction(data));
      }
    
      async submit(event) {
        this.setState({
          disabled: true,
        });

        this.setState({ loading: true });

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ disabled: false });
        }

        this.setState({ validated: true });
    
        if(this.state.agreed){
        await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/signup/', {
                phone_number: this.state.phoneNumber,
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                email: this.state.email,
                user_type: 'R',
            }, {
            headers: { 'Accept': `application/json` }
            }).then(response => {
                console.log('response user signup data');
                console.log(response);
                //let { data } = response.data;
                    console.log('signed up user');
                    this.setState({ successMsg: true });
                    this.setState({ loading: false });
                    this.setState({ msgDetail: response.data.detail });
                    //this.handleOpenModal();
                    this.onSignupSubmit();
                
        }).catch(error => {
            console.log('error user signup');
            console.log(error.response);
            this.setState({ failureMsg: true });
            this.setState({ msgDetail: error.response.data.detail });
            this.setState({ disabled: false });
            this.setState({ loading: false });
            this.handleOpenModal();
        });

        //let { data } = await res.data;
        //this.setState({ user: data });
        /* store.dispatch({
            type: 'USER_LIST_SUCCESS',
            users: data
        }); */
        console.log('signed up user');
        //console.log(res);

        /* let resp = await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/login/', {
            phone_number: this.state.phoneNumber,
        }, {
          headers: { 'Accept': `application/json` }
        }); */
        
        //this.handleOpenVerify();
        //this.processSignup(this.state.phoneNumber); //, this.state.VerificationCode
        //this.props.history.push('/');
        } else {
            this.setState({ notAgreed: true });
            this.setState({ disabled: false });
            this.setState({ loading: false });
        }
      }

      /**
     * @inheritDoc
     */
    async componentDidMount() {
        //this.props.onRef(this);
       /*  this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
        this.setState({
            isSignedIn: !!user
        });

        //this.props.shareMethods(this.handleCloseModal.bind(this));
        //this.props.shareMethods(this.doSignout.bind(this));
        //this.props.sendVerify('verify-success');
        //this.props.sendVerify(this.state.user);
        
        //Auth.isAuthenticated();
        }); */
    }
    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        //this.props.sendClose(this.state.showModal);
        //this.props.onRef(undefined);
        //this.unregisterAuthObserver();
    }
  
    render() {
        /* let message, isSuccess; 
         {!isSuccess ? <div>{message}</div> : this.history.pushState('/')}
        */

        /* if (this.props.response.register.hasOwnProperty('response')) {
        isSuccess = this.props.response.register.response.success;
        message = this.props.response.register.response.message;
        } */
    
        if(this.state.showForm){
      return (
          <>
          <div className="row signup-box">
            <div className="col-md-6 col-sm-12 bannerbox">
                <img alt='Sign Up Banner' src={signupcover} />
                <h2>Trips . Tours . Destinations</h2>
            </div>
            <div className="col-md-6 col-sm-12 area">
                <div className="row sign-up user">
            {this.state.showModal && 

                <Form
                noValidate
                validated={this.state.validated}
                >
                <Form.Label>
                    Already have a Ghroupdrive account? &nbsp;
                    <button className="btn btn-default login" type="button" onClick={this.handleOpenLogin}>
                        Login
                    </button>
                </Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstname">
                        <Form.Label>First name</Form.Label>
                            <Form.Control onBlur={(e) => {this.updateFirst(e.target.value)}} name="firstname" type="text" placeholder="First name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control onBlur={(e) => {this.updateLast(e.target.value)}} name="lastname" type="text" placeholder="Last name" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Enter your email</Form.Label>
                        <Form.Control onBlur={(e) => {this.updateEmail(e.target.value)}} name="email" type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control onBlur={(e) => {this.updatePhone(e.target.value)}} name="phone" type="tel" placeholder="Phone number" />
                    </Form.Group>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check required onClick={(e) => {this.updateCheck(e.target.checked)}} type="checkbox" label="I am legally authorized to make dealings on behalf of my company." />
                            {this.state.notAgreed &&
                                <p className="failure-color">Please agree to our terms.</p>
                            }
                    </Form.Group>
                    <Button 
                    variant="primary" 
                    disabled={this.state.disabled}
                    onClick={(e) => {this.submit(e)}} 
                    className="btn btn-primary btn-lg btn-block" type="button">
                        SIGN UP
                    </Button>
                    <p className="agree">
                    By clicking "Sign up", you agree to Ghroupdrive’s <Link className="" to="/terms-and-privacy">Terms of Use</Link> and 
                    acknowledge you have read the <Link className="" to="/terms-and-privacy">Privacy Policy</Link>.
                    </p>
                </Form>
            
                }
                {!this.state.showModal && 
                    <div>
                        <Form.Label>
                            Don't already have a Ghroupdrive account? &nbsp;
                            <button className="btn btn-default login" type="button" onClick={this.handleCloseLogin}>
                                Sign Up
                            </button>
                        </Form.Label>
                        <SignIn/>
                    </div>
                }
                
                </div>
                    </div>
                </div>
        </>
      );
    } else {

        /* if(this.state.isSignedIn){
            return (

                <div className="center-div success-block">
                    <h3>Verify Phone Number</h3>
                    <p>Phone number verified successfully!</p>
                </div>
                );
        } else { */
            return (
                <>
                <div className="row signup-box">
                    <div className="col-md-6 col-sm-12 bannerbox">
                        <img alt='Sign Up Banner' src={signupcover} />
                        <h2>Trips . Tours . Destinations</h2>
                    </div>
                    <div className="col-md-6 col-sm-12 area">
                        <div className="row sign-up user"></div>
                        <div className="center-div processing">
                            <h3>Verify Phone Number</h3>
                            <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}/>
                        </div>

                    </div>
                
                </div>

                </>

                );
        //}
    
        } 
    } //render
  }

/*   const mapStateToProps = function(store) {
    return {
      users: store.userState.users
    };
  } */
  const mapStateToProps = (response) => ({
    response
  });
  
  //const SignupForm = withFirebase(SignupFormBase);
  //export default SignupForm;
  export default withRouter(connect(mapStateToProps)(SignupForm));