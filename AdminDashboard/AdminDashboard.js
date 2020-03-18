import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

import Form from 'react-bootstrap/Form';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ReactModal from 'react-modal';

import PartnerBar from '../PartnerBar/PartnerBar';
import { authHeader } from '../_helpers';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

import { userActions } from '../_actions';
import ImageUploader from 'react-images-upload';
//import { FaTimesCircle } from 'react-icons/fa';

import './adash.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    left: 0;
    top: 0;
`;

const TOURS_URL = 'https://ghroupdrive-live-api.herokuapp.com/api/v1.0';

class AdminDashboard extends Component {

  constructor(props, context) {
    super(props, context);

    //const items = [];
    const { match: { params } } = this.props;
    this.props.dispatch(userActions.getPartner(params.id));

    this.state = {
      trips: null,
      getToken: '',
      userId: '',
      userToken: '',
      response: '',
      disabled: false,
      validated: false,
      key: Math.floor(Math.random() * 1000),
      profileOrError: '',
      msgDetail: '',
      loading: true,
      submitted: false,
      handler: '', 
      tour_provider: '',
      tour_name: '',
      tour_description: '',
      images: [],
      meeting_point: '',
      tour_destination: '',
      other_tour_locations: '',
      from: undefined,
      to: undefined,
      setoff_time: '',
      tour_duration: '',
      tour_frequency: '',
      recurring_days: '',
      full_tour_price: '',
      spots_available: '',
      whats_included: '',
      whats_not_included: '',
      service_fee: 30,
      itinerary: [],
      activity_day: '',
      activity_time: '',
      activity_counter: 0,
      activity_detail: '',
      items: ['Day/Stop 1', 'Day/Stop 2', 'Day/Stop 3', 'Day/Stop 4', 'Day/Stop 5', 'Day/Stop 6', 'Day/Stop 7'],
 
      //partner: null,
      partner_info: '',
      loader: false,
      uploading: false,
    };

    //this.submitForm = this.submitForm.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
    this.handleActivity = this.handleActivity.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.uploadImages = this.uploadImages.bind(this);

    //console.log(this.state);
  }

  onDrop(picture) {
    const images = this.state.images;
    const new_images = images.concat(picture);
    const files = new_images;
    //const files = Array.from(e.target.files)
    
    this.setState({ uploading: true })

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch(`${TOURS_URL}/admin_tours/`, {
      method: 'POST',
      headers: authHeader(),
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      })
    });

    setTimeout(() => {
        this.setState({
            images: new_images,
        });
    });
}

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
  }

  handleOpenModal() {
        this.setState({ showModal: true });
    }
      
    handleCloseModal() {
        this.setState({ showModal: false });
    }

  async componentDidMount() {
    //await this.refreshToken();
    await this.refreshData();
   
  }

  async refreshToken() {
    this.setState({
        loading: true,
      });
    const { match: { params } } = this.props;
    this.setState({
        userId: params.id,
      });

    this.setState({
        loading: false,
      });
  }

  async refreshData() {
    this.setState({ loading: true });
    const { user } = this.props;
    //console.log('user here: '+ user.id);
    //const token = localStorage.getItem('token');
    await axios.get(`https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/${user.id}/`, {
      headers: { 
          'Authorization': `Token ${user.auth_token}`,
          'Accept': `application/json`
        }
    }).then(response => {
                console.log('partner data');
                console.log(response);
                let partner = response.data;

                this.setState({
                    facebook_url: partner.facebook_url, 
                    instagram_url: partner.instagram_url, 
                    website_url: partner.website_url, 
                    about_company: partner.about_company,
                    num_of_successful_trips: partner.num_of_successful_trips,
                    tour_provider_name: partner.tour_provider_name,
                    phone_number: partner.phone_number,
                    first_name: partner.first_name,
                    last_name: partner.last_name,
                    email: partner.email,
                    location: partner.location,
                    bank: partner.bank_name,
                    acctbranch: partner.bank_branch,
                    acctname: partner.bank_account_name,
                    acctno: partner.bank_account_number,
                });

                this.setState({ loading: false });
                
        }).catch(error => {
            console.log('error');
            console.log(error.response);
            this.setState({ loading: false });

        });
    
  }

uploadImages = e => {
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch(`${TOURS_URL}/admin_tours/`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      })
    })
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    })
  }


handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
}

handleCounter(e){
    const counter = e.target.value;

    const items = [];
    //this.setState({ activity_day: counter});
    for (let i=0; i < counter; i++) {
        items.push('Day/Stop '+(i+1));
      }
    this.setState({items: items});

} 

handleActivity(e){
    const { itinerary } = this.state;
    //const old_item = e.target.value;
    const new_activity = this.state.activity_day + ' / ' + this.state.activity_time + ' / ' + this.state.activity_detail + '/ ';
    const new_itinerary = itinerary.concat(new_activity);
    this.setState({itinerary: new_itinerary});

} 

handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ loading: false });
    console.log('heren ow');

    this.setState({ submitted: true });
    this.setState({
        disabled: true,
      });

      this.setState({ validated: true });

        //const { about_company, facebook_url, password } = this.state;
        const formData = {
            trip_name: this.state.tour_name,
            image_url: this.state.images,
            starting_lat_long:"",
            buses_assigned: 1,
            bill_individually:false,
            invite_open: false,
            service_fee: "",
            ending_lat_long: "",
            category_type: "",
            category_name: "",
            destination: this.state.tour_destination,
            starting: this.state.meeting_point,
            description: this.state.tour_description,
            final_installment_date:null,
            start_date: this.state.from,
            total_cost: this.state.full_tour_price,
            end_date:null,
            time: "",
            trip_type: "",
            destinations: this.state.tour_destination,
            second_installment_date:null,
            trip_duration:null,
            tour_duration: this.state.tour_duration,
            meeting_point: this.state.meeting_point,
            spots_remaining:this.state.spots_available,
            full_price: this.state.full_tour_price,
            deposit: "",
            whats_included: this.state.whats_included,
            images: this.state.images,
            itinerary:this.state.itinerary,
            whats_not_included: this.state.whats_not_included,
            tour_package: "",
            is_recurring:false,
            top_destination:true,
            recurring_type:null,
            recurring_day_of_week:null,
            recurring_day_of_month:null,
            has_installment:true,
            final_installment: "",
            second_installment: ""
        };
        
        const { dispatch } = this.props;
        if (formData) {
            dispatch(userActions.adminUpdate(formData));
        }

}

  render() {

      const { updating, alert } = this.props;
      const { from, to } = this.state;
      const modifiers = { start: from, end: to };
      //const { uploading, images } = this.state
      //const partner = partners.items ? partners.items : {};

    if (this.state.loading) return (
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

        <PartnerBar page="PartnerBoard" logo="Blue" />
        <div className="container-fluid">

        <div className="row signup-box partner-data">
                    <div className="col-md-5 col-sm-12 bannerbox">

                        <div className="avatar-box">
                            <h3>{this.state.tour_provider}</h3>
                        </div>
                        <div className="provider-info-box">
                            <h4>Tour Information</h4>
                            <p><strong>Tour Provider: </strong>{this.state.tour_provider}</p>
                            <p><strong>Tour Name: </strong> {this.state.tour_name}</p>
                            <p><strong>Tour Description: </strong><br/> {this.state.tour_description}</p>
                            <p><strong>Meeting Point: </strong> {this.state.meeting_point}</p>
                            <p><strong>Tour Destination: </strong> {this.state.tour_destination}</p>
                            <p><strong>Other tour locations: </strong> {this.state.other_tour_locations}</p>
                            <br/>
                            <p>
                                <strong>SCHEDULE</strong> 
                            </p>
                            <br/>
                            <p><strong>Tour Dates (From-To): </strong> {this.state.from + this.state.to}</p>
                            <p><strong>Set-Off Time: </strong> {this.state.setoff_time}</p>
                            <p><strong>Tour Duration: </strong> {this.state.tour_duration}</p>
                            <p><strong>How often is the tour? </strong> {this.state.tour_frequency}</p>
                            <p><strong>Recurring Days: </strong> {this.state.recurring_days}</p>
                            <br/><br/>

                            <p>
                                <strong>PRICING</strong> 
                            </p>
                            <br/>
                            <p>
                                <strong>Full Tour Price: </strong> {this.state.full_tour_price}
                            </p>
                            <p><strong>Spots Available: </strong> {this.state.spots_available}</p>
                            <p><strong>What's included in the price? </strong><br/> {this.state.whats_included}</p>
                            <p><strong>What's not included in the price? </strong><br/> {this.state.whats_not_included}</p><br/>

                            <p>
                                <strong>ITINERARY</strong> 
                            </p>
                            <br/>
                            <p>
                                <strong>Activity: </strong> {this.state.activity_day}
                            </p>
                            <p><strong>Duration: </strong> {this.state.activity_duration}</p>
                            <p><strong>Activity Details:</strong><br/> {this.state.activity_detail}</p>
                            


                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12 partner-form">
                    
                    <h3 className="signup-title-main">New Tour</h3>
                    
                        <Form 
                        noValidate
                        /* onSubmit={this.handleSubmit} */
                        /* onSubmit={e => { this.handleSubmit(e); }} */
                            >
                            <Form.Group controlId="formGridProvider">
                                <Form.Label>Tour Provider</Form.Label>
                                <Form.Control defaultValue={this.state.tour_provider} required onChange={this.handleChange} name="tour_provider" type="text" placeholder="start entering name" />
                            </Form.Group>

							<Form.Group controlId="formGridName">
                                <Form.Label>Tour Name</Form.Label>
                                <Form.Control defaultValue={this.state.tour_name} required onChange={this.handleChange} name="tour_name" type="text" placeholder="enter name" />
                            </Form.Group>

							<Form.Group controlId="formGridDescription">
                                <Form.Label>Tour Description</Form.Label>
                                <Form.Control defaultValue={this.state.tour_description} required onChange={this.handleChange} name="tour_description" type="textarea" rows="6" placeholder="enter description" />
                            </Form.Group>

                            <Form.Group>
                                <ImageUploader
                                    withIcon={true}
                                    withPreview={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    name="images"
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                            
                                {/* <Button 
                                variant="default" 
                                disabled={alert.type === 'alert-info'}
                                onClick={e => { this.handleUpload(e); }}
                                className="btn btn-default btn-lg btn-outline">
                                    UPLOAD TOUR IMAGES {updating}
                                </Button> <p>Tip: you can select multiple</p> */}
                            </Form.Group>
                            
                            <br/>
                            <hr/>
                            
                            <Form.Group controlId="formGridMeetingPoint">
                                <Form.Label>Meeting Point</Form.Label>
                                <Form.Control defaultValue={this.state.meeting_point} required onChange={this.handleChange} name="meeting_point" type="text" placeholder="start entering the location" />
                            </Form.Group>
                            
                            <Form.Group controlId="formGridDestination">
                                <Form.Label>Tour Destination</Form.Label>
                                <Form.Control defaultValue={this.state.tour_destination} required onChange={this.handleChange} name="tour_destination" type="text" placeholder="start entering the location" />
                            </Form.Group>
                            
                            <Form.Group controlId="formGridOtherLocations">
                                <Form.Label>Other Tour Locations</Form.Label>
                                <Form.Control defaultValue={this.state.other_tour_locations} required onChange={this.handleChange} name="other_tour_locations" type="text" placeholder="start entering the location" />
                            </Form.Group>
                            
                            <Form.Label className="block-title"><strong>SCHEDULE</strong></Form.Label>
                            <Form.Group controlId="formGridTourDates">
                                <Form.Label>Tour Dates(From-To)</Form.Label>
                                <div className="InputFromTo">
                                    <DayPickerInput
                                    value={from}
                                    placeholder="From"
                                    className="form-control"
                                    format="LL"
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    dayPickerProps={{
                                        selectedDays: [from, { from, to }],
                                        disabledDays: { after: to },
                                        toMonth: to,
                                        modifiers,
                                        numberOfMonths: 2,
                                        onDayClick: () => this.to.getInput().focus(),
                                    }}
                                    onDayChange={this.handleFromChange}
                                    />{' '}
                                    —{' '}
                                    <span className="InputFromTo-to">
                                    <DayPickerInput
                                        ref={el => (this.to = el)}
                                        value={to}
                                        placeholder="To"
                                        className="form-control"
                                        format="LL"
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        dayPickerProps={{
                                        selectedDays: [from, { from, to }],
                                        disabledDays: { before: from },
                                        modifiers,
                                        month: from,
                                        fromMonth: from,
                                        numberOfMonths: 2,
                                        }}
                                        onDayChange={this.handleToChange}
                                    />
                                    </span>
                                    </div>
                            </Form.Group>
                            
							<Form.Group controlId="formGridSet-Off">
                                <Form.Label>Set-Off Time</Form.Label>
                                <Form.Control defaultValue={this.state.setoff_time} required onChange={this.handleChange} name="set_off_time" type="text" placeholder="set time" />
                            </Form.Group>
                          
                            <Form.Group controlId="formGridDuration">
                                <Form.Label>Tour Duration</Form.Label>
                                <Form.Control defaultValue={this.state.tour_duration} required onChange={this.handleChange} name="tour_duration" type="text" placeholder="enter duration" />
                            </Form.Group>
                            
							<Form.Group controlId="formGridOften">
                                <Form.Label>How Often Is The Tour?</Form.Label>
                                <Form.Control defaultValue={this.state.tour_frequency} required onChange={this.handleChange} name="how_often" type="text" placeholder="Select monthly, weekly or daily " />
                            </Form.Group>

                            <Form.Group controlId="formGridRecurring">
                                <Form.Label>Select Recurring Days</Form.Label>
                                <Form.Control defaultValue={this.state.recurring_days} required onChange={this.handleChange} name="recurring_days" type="text" placeholder="which days of the month, week? " />
                            </Form.Group>
                            
                            <Form.Label className="block-title"><strong>PRICING</strong></Form.Label>
                            
                            <Form.Group controlId="formGridFullprice">
                                <Form.Label>Full Tour Price</Form.Label>
                                <Form.Control defaultValue={this.state.full_tour_price} required onChange={this.handleChange} name="full_tour_price" type="text" placeholder="enter amount" />
                            </Form.Group>
                        
                            <Form.Group as={Col} controlId="formGridSpots">
                                <Form.Label>Spots Available</Form.Label>
                                <Form.Control defaultValue={this.state.spots_available} required onChange={this.handleChange} name="spots_available" type="text" placeholder="how many spots are available" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSpots">
                                <Form.Label>What's included in the price?</Form.Label>
                                <Form.Control defaultValue={this.state.whats_included} required onChange={this.handleChange} name="whats_included" type="text" placeholder="Add items and separate multiple items with commas" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSpots">
                                <Form.Label>What's not included in the price?</Form.Label>
                                <Form.Control defaultValue={this.state.whats_not_included} required onChange={this.handleChange} name="whats_not_included" type="text" placeholder="Add items and separate multiple items with commas" />
                            </Form.Group>

                            <Form.Label className="block-title"><strong>ITINERARY</strong></Form.Label>
                            
                            <div className="activity-box">
                            <Form.Row>
                            <Col>
                                <Form.Group controlId="formGridCounter">
                                    <Form.Control defaultValue='' name="activity_counter" onChange={this.handleCounter} type="text" placeholder="how many activities" />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="actvitiyForm.ControlSelect1">
                                    <Form.Control as="select" name="activity_day" onChange={this.handleChange}>
                                    <option value="Day 0">---</option>
                                    {this.state.items.map(i => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="formGridActivityDetails">
                                    <Form.Control defaultValue='' onChange={this.handleChange} name="activity_time" type="text" placeholder="Enter time or duration" />
                                </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Group controlId="formGridActivityDetails">
                                <Form.Control defaultValue='' onChange={this.handleChange} name="activity_detail" type="text" placeholder="Enter activity details" />
                            </Form.Group>
                            <Button 
                            variant="default" 
                            onClick={e => { this.handleActivity(e); }}
                            className="btn btn-default btn-lg btn-outline activity-btn">
                                Add Activity
                            </Button>

                            <p className="show-itinerary">{this.state.itinerary}</p>
                            </div>

                            <Button 
                            variant="primary" 
                            disabled={alert.type === 'alert-info'}
                            onClick={e => { this.handleSubmit(e); }}
                            className="btn btn-primary btn-lg btn-block">
                                SUBMIT TOUR {updating}
                            </Button>
                            {updating &&
                                <img alt="login img" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            
                        </Form>
                        
                <div className="partner-footer">
                    <p>Copyright 2019 &copy; Ghroupdrive Limited. All Rights Reserved.</p>
                </div>
            </div>
        </div>
       } 
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
                
            </>
        
    );
  }
}

function mapStateToProps(state) {
    const { partners, authentication, loading, alert } = state;
    const { user } = authentication;
    const { updating } = state.partners;
    return {
        user,
        partners,
        loading,
        alert,
        updating
    };
}
export default connect(mapStateToProps)(AdminDashboard);