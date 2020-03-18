import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
//import SubmitAnswer from './SubmitAnswer';
//import auth0Client from '../Auth';

import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';
//import Button from 'react-bootstrap/Button';

//import Container from 'react-bootstrap/Container';
import Footer from '../Footer/Footer';
import './thanks.css';
import logoBlue from '../img/LogoBlue300x300.png';
//import durIcon from '../img/duration-icon.png';
//import meetIcon from '../img/meeting-point-icon.png';
//import spotIcon from '../img/spots-icon.png';
//import payIcon from '../img/payment-icons.png';
//import fullpayIcon from '../img/full-price-icon.png';
//import depIcon from '../img/new-deposit-icon.png';
//import { Verify } from 'crypto';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    left: 0;
    top: 0;
`;

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getToken: '',
      response: null,
      continue_url: null,
      msgDetail: null,
      loading: true,
      success: false,
      pending: false,
      amount: null,
      visit: 1,
    };

    this.refreshId= this.refreshId.bind(this);

  }

  async componentDidMount() {
    await this.refreshId();
  }

  async refreshId() {
    const { match: { params } } = this.props;
    
    const url = window.location.href;
    const captured = /trip_id=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
    const result = captured ? captured : '';
    this.setState({ continue_url: '/book/'+result });

    console.log('params');
    console.log(result);

    this.setState({ visit: params.typeId });
    await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/check_transaction_status/', {
            transaction_id: params.transId,
            }, {
            headers: { 'Accept': `application/json` }
            }).then(response => {
                console.log('response data');
                console.log(response);
                this.setState({ success: true });
                this.setState({ loading: false });
                this.setState({ amount: response.data.amount });
                
                //this.props.history.push(`/partner-dashboard/${response.data.results.auth_token}/${response.data.results.id}`);
                //this.setState({ successMsg: true });
                //this.setState({ msgDetail: response.data.results.detail });
                //this.handleOpenModal();
                
        }).catch(error => {
            console.log('error');
            if(error.response){
                console.log(error.response);
                //this.setState({ failureMsg: true });
                if(error.response.data.status){
                    if(error.response.data.status === 'pending'){
                        this.setState({ pending: true });
                        this.setState({ loading: false });
                    } else if(error.response.data.status === 'failed'){
                        this.setState({ failure: true });
                        this.setState({ loading: false });
                    } else {
                        this.setState({ failure: true });
                        this.setState({ loading: false });
                    }
                } else {
                    this.setState({ failure: true });
                    this.setState({ loading: false });
                }
                this.setState({ msgDetail: error.response.data.detail });
                this.setState({ amount: error.response.data.amount });
                
                //this.setState({ disabled: false });
                //this.handleOpenModal();
            }
            
        });
    
  }



  render() {
    const {loading} = this.state;
    if (loading) return (
        <div className="loading-block">
        <div className="title-box"> 
            <a className="" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/"> 
                <img alt='Sign Up logo' src={logoBlue} />
                <h4 className="signup-title">
                    <span>Ghroupdrive</span>
                </h4>
            </a>
        </div>
        <div className="payment-loading">
            <h4>Please wait, payment is in progress</h4>
            <p>We're processing your payments now, <br/>please give us a moment to confirm.</p>
        </div>
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
        </div>
    );
    return (
        <>
        
            <div className="container-fluid">
                <div className="container msg-details"> 
                    <div className="thanks-feedback">
                    <div className="title-box"> 
                        <a className="" rel="noopener noreferrer" target="_blank" href="https://www.ghroupdrive.com/"> 
                            <img alt='Sign Up logo' src={logoBlue} />
                            <h4 className="signup-title">
                                <span>Ghroupdrive</span>
                            </h4>
                        </a>
                    </div>
                                <div className="center-div">
                                    { this.state.success &&
                                        <div className="inner success">
                                            <h3 className="success-color title">Thank you!</h3>
                                            <p className="success-color">Your payment was successful.</p>
                                            <br/><br/>

                                            <p className="amount-blue">
                                                <span className="amt">Amount</span><br/>
                                                <span className="price"> GHS {this.state.amount ? this.state.amount : "0.00"}</span>
                                            </p>
                                            
                                        </div>
                                    }
                                    { this.state.failure &&
                                        <div className="inner failure">
                                            <h3 className="failure-color title">Ooopss!</h3>
                                            <p className="failure-color">Your payment failed to process. </p>
                                            <p className="alert alert-warning">{this.state.msgDetail}</p>
                                            <p>Please try again. <br/>
                                            Or send us an email at support@ghroupdrive.com. <br/>
                                            Thank you. 
                                            </p>
                                        </div>
                                    }
                                    { this.state.pending &&
                                        <div className="inner failure">
                                            <h3 className="amount-blue title">Pending...</h3>
                                            <p className="amount-blue">Your payment is pending. </p>
                                            <p className="alert alert-info">{this.state.msgDetail}</p>
                                            <p className="amount-blue">
                                                <span className="amt">Amount</span><br/>
                                                <span className="price"> GHS {this.state.amount ? this.state.amount : "0.00"}</span>
                                            </p>
                                        </div>
                                    }
                                    { this.state.visit === "1" &&
                                        <div className="text-center continue">
                                            <Link className="btn btn-primary btn-block" to={this.state.continue_url}>
                                            CONTINUE
                                            </Link>
                                        </div>
                                    }
                                    { this.state.visit === "2" &&
                                        <div className="text-center continue">
                                            <p>Please close this window to continue.</p>
                                        </div>
                                    }
                                </div>
                    </div>  
                    
                </div>
            </div>
          

          <Footer/>
        </>
    )
  }
}

export default withRouter(ThankYou);