import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';

import ReactModal from 'react-modal';

import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './partnersup.css';

import logoBlue from '../img/LogoBlue300x300.png';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    left: 0;
    top: 0;
`;

class PartnerSignup extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        key: 'tripstours',
        phoneNumber: '',
        email: '',
        firstname: '',
        lastname: '',
        provider: '',
        position: '',
        password: '',
        location: '',
        agreed: false,
        notAgreed: false,
        validated: false,
        VerificationCode: '',
        isSignedIn: false,
        showModal: false,
        showForm: true,
        verifySuccess: false,
        user: [],
        successMsg: false,
        failureMsg: false,
        msgDetail: '',
        loading: false,
      };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        //this.firebase = firebase;
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


      updatePhone(value) {
        let phone = value;
        if(phone.length === 10)
        { phone = '+233' + phone.substring(1); }
        this.setState({
            phoneNumber: phone,
        });
      }

      updateEmail(value) {
        this.setState({
            email: value,
        });
      }

      updateCompany(value) {
        this.setState({
            provider: value,
        });
      }

      updateLocation(value) {
        this.setState({
            location: value,
        });
      }

      updatePosition(value) {
        this.setState({
            position: value,
        });
      }

      updatePassword(value) {
        this.setState({
            password: value,
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
            //console.log('I am here...');

            await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/signup/', {
                phone_number: this.state.phoneNumber,
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                tour_provider_name: this.state.provider, 
                contact_person_position: this.state.position,
                location: this.state.location,
                user_type: 'TOUR_PROVIDER',
            }, {
            headers: { 'Accept': `application/json` }
            }).then(response => {
                console.log('response data');
                console.log(response);
                //let { data } = response.data;
                    console.log('signed up user');
                    this.setState({ successMsg: true });
                    this.setState({ loading: false });
                    this.setState({ msgDetail: response.data.detail });
                    this.handleOpenModal();
                
        }).catch(error => {
            console.log('error');
            console.log(error.response);
            if(error.response.data){
                this.setState({ failureMsg: true });
                this.setState({ msgDetail: error.response.data.detail });
                this.setState({ disabled: false });
                this.setState({ loading: false });
                this.handleOpenModal();
            } else {
                //do nothing
            }
            
        });

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
    }
  
    render() {
        const {loading} = this.state;
        if (loading) return (
            <div className='sweet-loading'>
                <BounceLoader
                css={override}
                sizeUnit={"px"}
                heightUnit={"%"}
                size={60}
                color={'#FF2E57'}
                height={100}
                //loading={this.state.loading}
                />
            </div> 
        );
        //if(this.state.showForm){
      return (
          <>
          <div className="row signup-box partner-signup">
                    <div className="col-md-6 col-sm-12 bannerbox">
                        {/* <img alt='Sign Up Banner' src={signupcover} /> */}
                        <h2>Trips . Tours . Destinations</h2>
                    </div>
                    <div className="col-md-6 col-sm-12 partner-form signup">
                    <div className="title-box"> 
                    <a className="" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/"> 
                        <img alt='Sign Up logo' src={logoBlue} />
                        <h4 className="signup-title">
                            <span>Ghroupdrive</span>
                        </h4>
                    </a>
                    </div>
                    <h3 className="signup-title-main">Partner Sign Up</h3>
                        <Form 
                        noValidate
                        validated={this.state.validated}
                            >
                        <Form.Label className="already-label">Already have a Ghroupdrive Partner account? &nbsp;
                            <Link className="btn btn-default login" to="/partner-login">
                                Login
                            </Link>
                        </Form.Label>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFirstname">
                                <Form.Label>First name</Form.Label>
                                    <Form.Control required onBlur={(e) => {this.updateFirst(e.target.value)}} name="firstname" type="text" placeholder="First name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastname">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updateLast(e.target.value)}} name="lastname" type="text" placeholder="Last name" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridCompany">
                                <Form.Label>Name of your Tour Company</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updateCompany(e.target.value)}} name="provider" type="text" placeholder="Tour provider name" />
                            </Form.Group>

                            <Form.Group controlId="formGridLocation">
                                <Form.Label>Location of Tour Company</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updateLocation(e.target.value)}} name="location" type="text" placeholder="Location of Tour provider" />
                            </Form.Group>

                            <Form.Group controlId="formGridPosition">
                                <Form.Label>Position in Company</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updatePosition(e.target.value)}} name="position" type="text" placeholder="Your position in company" />
                            </Form.Group>

                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Enter your email</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updateEmail(e.target.value)}} name="email" type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updatePhone(e.target.value)}} name="phone" type="tel" placeholder="Phone number" />
                            </Form.Group>

                            <Form.Group controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updatePassword(e.target.value)}} name="password" type="password" placeholder="Password" />
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
                            By clicking "Sign up", you agree to Ghroupdrive’s <a className="" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/terms-and-privacy">Terms of Use</a> and 
                            acknowledge you have read the <a className="" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/terms-and-privacy">Privacy Policy</a>.
                            </p>
                        </Form>
                        {/* <Button onClick={() => {this.handleOpenModal()}}>Test Modal</Button> */}
            </div>
        </div>
            
                <div className="modal-block">
                    <ReactModal 
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    contentLabel="Sign Up Success">
                    <div className="row signup-feedback">
                        <button className="close" onClick={() => {this.handleCloseModal()}}>X</button>
                            <div className="sign-up-resp">
                                <div className="center-div">
                                    { this.state.successMsg &&
                                        <div className="inner">
                                            <h3 className="success-color">Success!</h3>
                                            <p>
                                            Great! You have signed up successfully!</p>
                                            <p className="alert alert-success">{this.state.msgDetail}</p>
                                            <p>We have sent you a mail to verify your new account.<br/>
                                            Kindly check your email now. Thank you.<br/>
                                            </p>
                                        </div>
                                    }
                                    { this.state.failureMsg &&
                                        <div className="inner">
                                            <h3 className="failure-color">Ooopss!</h3>
                                            <p>
                                            Ooopss... Your sign up failed. </p>
                                            <p className="alert alert-warning">{this.state.msgDetail}</p>
                                            <p>Can you please try again? <br/>
                                            Or send us an email at support@ghroupdrive.com. <br/>
                                            Thank you. 
                                            </p>
                                        </div>
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


  const mapStateToProps = (response) => ({
    response
  });
  
  //const SignupForm = withFirebase(SignupFormBase);
  //export default SignupForm;
  export default connect(mapStateToProps)(PartnerSignup);