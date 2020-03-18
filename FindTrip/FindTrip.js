import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import SubmitAnswer from './SubmitAnswer';
//import auth0Client from '../Auth';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

//import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import Carousel from '@brainhubeu/react-carousel'; //, { Dots }
import '@brainhubeu/react-carousel/lib/style.css';

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './find.css';
import styles from './find.module.css'; // Tell Webpack that Button.js uses these styles
import '../Home/slide.css';

const user_token = '';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    left: 0;
    top: 0;
`;
//const { match: { params } } = this.props;

class FindTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: null,
      getToken: user_token ? user_token : 'Token 1f40f42b53d89a7da116afe5494d634481d5798a',
      response: null,
      search_text: '',
      start_date: '',
      end_date: '',
      key: Math.floor(Math.random() * 1000),
      profileOrError: null,
      loading: false,
      value: 2,
      handler: null,
    };

    //this.submitAnswer = this.submitAnswer.bind(this);
    this.refreshTrips = this.refreshTrips.bind(this);
  }

  updateSearch(value) {
    console.log(value);
    this.setState({
      search_text: value,
    });
  }

  updateStart(value) {
    console.log(value);
    this.setState({
      start_date: value,
    });
  }
  
  updateEnd(value) {
    console.log(value);
    this.setState({
      end_date: value,
    });
  }


  async componentDidMount() {
    //const { match: { params: { id: key } = {} } } = this.props;
    //if(this.state.key !== key) {
        await this.refreshTrips();
    //}
  }

async _loadUserData() {
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    await this.refreshTrips();
  }

  async refreshTrips() {
    const trips = (await axios.get('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/popular_trips/')).data.results;
    this.setState({
      trips,
    });
    console.log(trips);
    //(await axios.get(`https://ghroupdrive-live-api.herokuapp.com/api/v1.0/search_trip/${params.st}`)).data;
  }

  /* async submitAnswer(answer) {
    await axios.post(`http://localhost:8081/answer/${this.state.question.id}`, {
      answer,
    }, {
      headers: { 'Authorization': `Token ${this.state.getToken}` }
    });
    await this.refreshQuestion();
  } */

  onChange = e => this.setState({ value: e.target ? e.target.value : e });

  render() {
    //const {trips} = this.state;
 /*    if (trips === null) return (
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
  ); */
    
    return (
        <>
        <NavBar page="TripsPage" logo="Blue" />
        <div className="container-fluid">
        <div className="search-form">
            <Form>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Where would you like to go?</Form.Label>
                                <Form.Control type="text" onBlur={(e) => {this.updateSearch(e.target.value)}} placeholder="Kumasi, Garden City, Ghana" />
                            </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="formGroupPassword">
                              <Form.Label>Between</Form.Label>
                              <Form.Control type="date" onBlur={(e) => {this.updateStart(e.target.value)}} placeholder="dd/mm/yy" />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="formGroupPassword">
                              <Form.Label>And</Form.Label>
                              <Form.Control type="date" onBlur={(e) => {this.updateEnd(e.target.value)}} placeholder="dd/mm/yy" />
                          </Form.Group>
                        </Col>
                        <Col>
                            <Link to={`/search/${this.state.search_text}/${this.state.start_date}/${this.state.end_date}/${this.state.key}`}>
                            <Button variant="primary" className="btn btn-primary btn-lg btn-block" type="button">
                                SEARCH
                            </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
                </Form>
        </div>
        {
              this.state.trips === null && 
              <div className='sweet-loading'>
                    <BounceLoader
                    css={override}
                    sizeUnit={"px"}
                    heightUnit={"%"}
                    size={60}
                    color={'#FF2E57'}
                    height={100}
                    //loading={this.state.loading} <p>Loading trips...</p>
                    />
                </div> 
        }
        <div className={styles['slider-block']}>
                <h2 className={styles['block-title']}>Recommended for you</h2>
                <Carousel
                    centered
                    arrows={true}
                    slidesPerPage={3}
                    slidesPerScroll={3}
                    itemWidth={420}
                    value={this.state.value}
                    onChange={this.onChange}
                    >
                    { 
                    this.state.trips && this.state.trips.map(trip => (
                        <div key={trip.id} className="">
                            <Link to={`/trip/${trip.id}`}>
                            <div className={styles['card']}>
                                <img className={styles['card-img-top']} src={trip.image_url} alt="Trip Banner"/>
                                <div className="card-body">
                                <h4 className="card-title"><span className="name">{trip.trip_name}</span> <span className="pull-right">GHS {trip.full_price}</span></h4>
                                <p className="card-text">
                                  {trip.description ? (trip.description).substring(0, 150) + '...' : "Discover this growing African city in a whole new way. The Accra City Tour is a new premium city tour service from Kotoka.city"}
                                  </p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    ))
                }
                </Carousel>

            </div>  
            
             
            </div>
            <Footer/>
            </>
    );
  }
}

export default FindTrip;