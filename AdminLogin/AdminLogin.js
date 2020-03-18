import React from 'react';
import {withRouter} from 'react-router-dom';
//import axios from 'axios';
import { connect } from 'react-redux';

import ReactModal from 'react-modal';
import { userActions } from '../_actions';

import Form from 'react-bootstrap/Form';

import './adminlogin.css';
import logoBlue from '../img/LogoBlue300x300.png';

class AdminLogin extends React.Component {
    constructor(props, context) {
      super(props, context);

      // reset login status
      this.props.dispatch(userActions.logout());

      this.state = {
        key: 'tripstours',
        email: '',
        password: '',
        agreed: false,
        notAgreed: false,
        VerificationCode: '',
        isSignedIn: false,
        showModal: false,
        showVerify: false,
        showForm: true,
        verifySuccess: false,
        user: [],
        successMsg: false,
        failureMsg: false,
        msgDetail: '',
        loading: false,
        submitted: false
      };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleOpenModal() {
        this.setState({ showModal: true });
    }
      
    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('heren ow');

        this.setState({ submitted: true });
        this.setState({
            disabled: true,
          });
          this.setState({ loading: true });
  
          const form = e.currentTarget;
          if (form.checkValidity() === false) {
              e.preventDefault();
              e.stopPropagation();
              this.setState({ disabled: false });
          }
  
          this.setState({ validated: true });

            const { email, password } = this.state;
            const { dispatch } = this.props;
            if (email && password) {
                dispatch(userActions.login(email, password, 'admin'));
            }
          console.log('sign in user');
  
     
    }

      updateEmail(value) {
        this.setState({
            email: value,
        });
      }

      updatePassword(value) {
        this.setState({
            password: value,
        });
      }

      updateCheck(value) {
        this.setState({
            agreed: value,
        });

      }

  
    render() {
        const { loggingIn } = this.props;
        
        //const { email, password, submitted } = this.state;
        const { alert } = this.props;

      return (
          <>
          
          <div className="row signup-box partner-signup login">
                    <div className="col-md-6 col-sm-12 bannerbox">
                       
                        <h2>Trips . Tours . Destinations</h2>
                    </div>
                    <div className="col-md-6 col-sm-12 partner-form">
                    <div className="title-box">
                        <a className="" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/"> 
                            <img alt='Sign Up logo' src={logoBlue} />
                            <h4 className="signup-title">
                                <span>Ghroupdrive</span>
                            </h4>
                        </a>
                    </div>
                    <h3 className="signup-title-main">Admin Login</h3>
                    {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Form
                        noValidate
                        onSubmit={this.handleSubmit}
                        validated={this.state.validated}
                        >

                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Enter your email</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updateEmail(e.target.value)}} name="email" type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required onBlur={(e) => {this.updatePassword(e.target.value)}} name="password" type="password" placeholder="Password" />
                            </Form.Group>

                            <button
                            variant="primary" 
                            disabled={alert.type === 'alert-success'}
                            className={`btn btn-primary btn-lg btn-block`}>
                                LOGIN
                            </button>
                            {loggingIn &&
                                <img alt="login img" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <p className="agree">
                            By clicking "Login", you agree to Ghroupdrive’s <a className="" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/terms-and-privacy">Terms of Use</a> and 
                            acknowledge you have read the <a className="" target="_blank" rel="noopener noreferrer" href="https://www.ghroupdrive.com/terms-and-privacy">Privacy Policy</a>.
                            </p>
                        </Form>
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
                                            Great! You have logged in successfully!<br/>
                                            Thank you.
                                            </p>
                                        </div>
                                    }
                                    { this.state.failureMsg &&
                                        <div className="inner">
                                            <h3 className="failure-color">Ooopss!</h3>
                                            <p>
                                            Ooopss... Your sign in failed. </p>
                                            <p className="alert alert-warning">{this.state.msgDetail}</p>
                                            <p>
                                            Can you please try again? <br/>
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

function mapStateToProps(state) {
    const { alert } = state;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        alert
    };
}

export default withRouter(connect(mapStateToProps)(AdminLogin));