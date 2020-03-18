import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
//import SubmitAnswer from './SubmitAnswer';
//import auth0Client from '../Auth';

import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';
//import Button from 'react-bootstrap/Button';

//import Container from 'react-bootstrap/Container';
import Footer from '../Footer/Footer';
import './verify.css';
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

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getToken: '',
      response: null,
      msgDetail: null,
      loading: true,
    };

    this.refreshCode= this.refreshCode.bind(this);

  }

  async componentDidMount() {
    await this.refreshCode();
  }

  async refreshCode() {
    const { match: { params } } = this.props;
    await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/users/verify_email/', {
            verification_code: params.verifyCode,
            }, {
            headers: { 'Accept': `application/json` }
            }).then(response => {
                console.log('response data');
                console.log(response);
                console.log('signed up user');  
                localStorage.setItem('user', JSON.stringify(response.data.results));
                localStorage.setItem("token", response.data.results.auth_token);
                this.props.history.push(`/partner-dashboard/${response.data.results.id}`);
                //this.setState({ successMsg: true });
                //this.setState({ msgDetail: response.data.results.detail });
                //this.handleOpenModal();
                
        }).catch(error => {
            console.log('error');
            console.log(error.response);
            //this.setState({ failureMsg: true });
            this.setState({ msgDetail: error.response.data.detail });
            //this.setState({ disabled: false });
            //this.handleOpenModal();
        });
    
  }



  render() {
    const {msgDetail} = this.state;
    if (msgDetail === null) return (
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
        
            <div className="container-fluid">
                <div className="container msg-details">    
                    <p className="alert alert-warning">{this.state.msgDetail}</p>
                </div>
                {/* <Button 
                    variant="primary" 
                    onClick={() => {this.resend()}} 
                    className="btn btn-primary btn-lg btn-block" type="button">
                    RESEND VERIFICATION CODE
                </Button> */}
            </div>
          

          <Footer/>
        </>
    )
  }
}

export default withRouter(Verify);