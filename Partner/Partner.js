import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

import './partner.css';
import gplay from '../img/google-play-badge.png';
import appstore from '../img/app-store-badge.png';

import parcov from '../img/partners-cover.webp';
//import styles from './Partner.module.css';

class Partner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: null,
    };
  }

    //https://play.google.com/intl/en/badges/images/generic/en_badge_web_generic.png

  render() {
    return (
        <>
        <NavBar page="PartnerPage" logo="Blue" />
      <div className="container-fluid">
        <div className="row">
        <div className='banner-block'>
            <img alt='Become a Partner' src={parcov} />
        </div>
        <div className="container tab-box">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="row store-icons">
                            <div className="playstore col-md-6 col-sm-12">
                                <a href='https://play.google.com/store/apps/details?id=com.ghroupdrive.app&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src={gplay} /></a>
                            </div>
                            <div className="app-store col-md-6 col-sm-12">
                                <a href='https://itunes.apple.com/gh/app/ghroupdrive/id1441445769?mt=8'><img alt='Download on the App Store' src={appstore}/></a>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        <div className="container main-block">
            <h2 className='block-title'>Partnership In Service</h2>
            <div className="details">
                <p>
                Find the people for your numerous buses comes with many unknowns<br/> 
                and that's why we are here, to keep you in business. All you need is a<br/>
                bus or two in great condition and we'll help you meet your targets.<br/>
                Reach out to us and let's partner up.  
                </p>
            </div>
            <h2 className='block-title'>Apply to be a Partner</h2>
            <div className="details">
                <p>
                You can use the form to inform us of your interest or alternatively,<br/>
                you can send your enquiries to:<br/>

                <a href="mailto:support@ghroupdrive.com">support@ghroupdrive.com</a>
                </p>
            </div>
        </div>
         

        </div>
      </div>


      <Footer/>
      </>
    )
  }
}

export default Partner;