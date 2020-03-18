import React, {Component} from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';
//import SubmitAnswer from './SubmitAnswer';
//import auth0Client from '../Auth';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';
//import Col from 'react-bootstrap/Col';
import ReactModal from 'react-modal';

import NavBar from '../NavBar/NavBar';
//import Footer from '../Footer/Footer';
import './udash.css';
//import signupcover from '../img/Signup-image.jpg';
//import logoBlue from '../img/LogoBlue300x300.png';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    left: 0;
    top: 0;
`;

//const user_token = '';
//const { match: { params } } = this.props;

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: null,
      getToken: '',
      userId: '',
      userToken: '',
      response: null,
      disabled: false,
      validated: false,
      key: Math.floor(Math.random() * 1000),
      profileOrError: null,
      msgDetail: '',
      loading: true,
      handler: null,
      facebook_url: '', 
      instagram_url: '', 
      profile_image_url: '',
      phone_number: null,
      first_name: null,
      last_name: null,
      email: null,
      location: null,
      user: null,
      num_of_trips_created: null,
      num_of_trips_joined: null,
    };

    this.submitForm = this.submitForm.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
        this.setState({ showModal: true });
    }
      
    handleCloseModal() {
        this.setState({ showModal: false });
    }

  updateLocation(value) {
    console.log(value);
    this.setState({
        location: value,
    });
  }

  updateFirstName(value) {
    console.log(value);
    this.setState({
        first_name: value,
    });
  }


  updateLastName(value) {
    console.log(value);
    this.setState({
        last_name: value,
    });
  }

  updateFacebook(value) {
    console.log(value);
    this.setState({
        facebook_url: value,
    });
  }
  
  updateInstagram(value) {
    console.log(value);
    this.setState({
        instagram_url: value,
    });
  }


  async componentDidMount() {
    //const { match: { params: { id: key } = {} } } = this.props;
    //if(this.state.key !== key) {
        await this.refreshToken();
        await this.refreshData();
    //}
  }

  async refreshToken() {
    this.setState({
        loading: true,
      });
    const { match: { params } } = this.props;
    this.setState({
        userId: params.id,
        //userToken: params.token //localStorage.getItem("token")
      });

    /* const res = await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/search_trip/', {
        search_text: `${params.st ? params.st : ''}`,
        start_date: `${params.std ? params.std : ''}`,
        end_date: `${params.edd ? params.edd : ''}`,
    }, {
      headers: { 
          'Accept': `application/json`,
          'Authorization': `${this.state.getToken}`,
         }
    });
    let trips = res.data.results;
    console.log(trips); */
    //(await axios.get(`https://ghroupdrive-live-api.herokuapp.com/api/v1.0/search_trip/${params.st}`)).data;
    /* this.setState({
      trips,
    }); */
    this.setState({
        loading: false,
      });
  }

  async refreshData() {
    //const { match: { params } } = this.props;
    const token = localStorage.getItem('token');
    await axios.get(`https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/${this.state.userId}/`, {
      headers: { 
          'Authorization': `Token ${token}`,
          'Accept': `application/json` 
        }
    }).then(response => {
                console.log('user data');
                console.log(response);
                localStorage.setItem("user_id", response.data.id);
                let user = response.data;
                /* const { 
                    facebook_url, 
                    instagram_url, 
                    website_url, 
                    about_company, 
                    num_of_successful_trips,
                    tour_provider_name
                } = this.state; */
                this.setState({
                    facebook_url: user.facebook_url, 
                    instagram_url: user.instagram_url, 
                    phone_number: user.phone_number,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    num_of_trips_created: user.num_of_trips_created,
                    num_of_trips_joined: user.num_of_trips_joined,
                });

                this.setState({ loading: false });
                
        }).catch(error => {
            console.log('error');
            console.log(error.response);
            this.setState({ loading: false });
            //this.setState({ failureMsg: true });
            //this.setState({ msgDetail: error.response.data.detail });
            //this.setState({ disabled: false });
            //this.handleOpenModal();
        });
    
  }

  async submitForm(event) {
    this.setState({
            disabled: true,
    });
    const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ disabled: false });
        }
    
    const token = localStorage.getItem('token');
        this.setState({ validated: true });
    await axios.put(`https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/${this.state.userId}`, {
        facebook_url: this.state.facebook_url, 
        instagram_url: this.state.instagram_url, 
        first_name: this.state.first_name,
        last_name: this.state.last_name,
    }, {
      headers: { 
          'Authorization': `Token ${token}`,
          'Accept': `application/json` 
        }
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
            this.setState({ failureMsg: true });
            this.setState({ msgDetail: error.response.data.detail });
            this.setState({ disabled: false });
            this.setState({ loading: false });
            this.handleOpenModal();
        });
    //await this.refreshQuestion();
  }

  render() {
      //const {partner} = this.state;
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
    return (
        <>
        <NavBar page="UserBoard" logo="Blue" />
        <div className="container-fluid">
        <div className="row signup-box partner-data">
                    <div className="col-md-5 col-sm-12 bannerbox">
                        {/* <img alt='Sign Up Banner' src={signupcover} /> */}
                        {/* <h2>Trips . Tours . Destinations</h2> */}
                        <div className="avatar-box">
                            <h3>{this.state.first_name + ' ' + this.state.last_name}</h3>
                        </div>
                        <div className="provider-info-box">
                            <h4>Profile Details</h4>
                            <p>
                                <strong>Name: </strong> 
                                {this.state.first_name + ' ' + this.state.last_name}
                            </p>
                            <p><strong>Bus Trips: </strong> {this.state.num_of_trips_created}</p>
                            <p><strong>Bus Requests: </strong> {this.state.num_of_trips_joined}</p>
                            <p><strong>Phone number: </strong> {this.state.phone_number}</p>
                            <p><strong>Email:</strong> {this.state.email}</p>
                            <p><strong>Location:</strong> {this.state.location}</p>
                            
                            <p><strong>Facebook: </strong> {this.state.facebook_url}</p>
                            <p><strong>Instagram: </strong> {this.state.instagram_url}</p>
                            <br/><br/>
                            

                            <p>
                                <strong>Contact Support</strong><br/>
                                (Contact support@ghroupdrive.com to make changes)
                            </p>
                            <br/>
                            

                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12 partner-form">
                    
                    <h3 className="signup-title-main">User Dashboard</h3>
                        <Form 
                        noValidate
                        validated={this.state.validated}
                            >
                        <Form.Label className="already-label">
                            You can update your profile details here
                        </Form.Label>
                            
                            <Form.Group controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control defaultValue={this.state.first_name} required onBlur={(e) => {this.updateFirstName(e.target.value)}} name="firstname" type="text" placeholder="enter first name" />
                            </Form.Group>

                            <Form.Group controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control defaultValue={this.state.last_name} required onBlur={(e) => {this.updateLastName(e.target.value)}} name="lastname" type="text" placeholder="enter last name" />
                            </Form.Group>


                            <Form.Group controlId="formGridLocation">
                                <Form.Label>Where you are located</Form.Label>
                                <Form.Control defaultValue={this.state.location} required onBlur={(e) => {this.updateLocation(e.target.value)}} name="location" type="text" placeholder="your current location" />
                            </Form.Group>

                            <Form.Group controlId="formGridFacebook">
                                <Form.Label>Add Facebook</Form.Label>
                                <Form.Control defaultValue={this.state.facebook_url} required onBlur={(e) => {this.updateFacebook(e.target.value)}} name="facebook" type="text" placeholder="facebook page address" />
                            </Form.Group>

                            <Form.Group controlId="formGridInstagram">
                                <Form.Label>Add Instagram</Form.Label>
                                <Form.Control defaultValue={this.state.instagram_url} required onBlur={(e) => {this.updateInstagram(e.target.value)}} name="instagram" type="text" placeholder="instagram account handle" />
                            </Form.Group>
                            <br/>

                            <Button 
                            variant="primary" 
                            disabled={this.state.disabled}
                            onClick={(e) => {this.submitForm(e)}} 
                            className="btn btn-primary btn-lg btn-block" type="button">
                                UPDATE INFO
                            </Button>
                            
                        </Form>
                        {/* <Button onClick={() => {this.handleOpenModal()}}>Test Modal</Button> */}
                <div className="partner-footer">
                    <p>Copyright 2019 &copy; Ghroupdrive Limited. All Rights Reserved.</p>
                </div>
            </div>
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
                                            Great! You have updated successfully!</p>
                                            <p className="alert alert-success">{this.state.msgDetail}</p>
                                            
                                        </div>
                                    }
                                    { this.state.failureMsg &&
                                        <div className="inner">
                                            <h3 className="failure-color">Ooopss!</h3>
                                            <p>
                                            Ooopss... information update failed. </p>
                                            <p className="alert alert-warning">{this.state.msgDetail}</p>
                                            <p>Please try again. <br/>
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
        {/* <Footer/> */}
            </>
    );
  }
}

export default UserDashboard;