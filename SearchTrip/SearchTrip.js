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

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './search.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    left: 0;
    top: 0;
`;

const user_token = '';
//const { match: { params } } = this.props;

class SearchTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: null,
      getToken: user_token, // ? user_token : 'Token 1f40f42b53d89a7da116afe5494d634481d5798a',
      response: null,
      search_text: '',
      start_date: '',
      end_date: '',
      key: Math.floor(Math.random() * 1000),
      profileOrError: null,
      loading: false,
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

 /*  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevUserId in state so we can compare when props change.
    // Clear out any previously-loaded user data (so we don't render stale stuff).
    if (nextProps.key !== prevState.key) {
        console.log('new stuff', prevState.key);
        //this._loadUserData();
      return {
        key: nextProps.key,
        profileOrError: null,
      }; 
    }

    // No state update necessary
    return null;
  } */

  /* componentDidUpdate(prevProps, prevState) {
    if (this.state.profileOrError === null) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
      //this._loadUserData();
    }
  } */

  /* async componentDidUpdate(prevProps, prevState) {
    const { match: { params: { id: key } = {} } } = this.props;
    if(this.state.key !== key) {
      // fetch content
      await this.refreshTrips();
   }
} */

async _loadUserData() {
    // Cancel any in-progress requests
    // Load new data and update profileOrError
    await this.refreshTrips();
  }

  async refreshTrips() {
    this.setState({
        loading: true,
      });
    const { match: { params } } = this.props;
    const res = await axios.post('https://ghroupdrive-live-api.herokuapp.com/api/v1.0/search_trip/', {
        search_text: `${params.st ? params.st : ''}`,
        start_date: `${params.std ? params.std : ''}`,
        end_date: `${params.edd ? params.edd : ''}`,
    }, {
      headers: { 
          'Accept': `application/json`,
          //'Authorization': `${this.state.getToken}`,
         }
    });
    let trips = res.data.results;
    console.log(trips);
    //(await axios.get(`https://ghroupdrive-live-api.herokuapp.com/api/v1.0/search_trip/${params.st}`)).data;
    this.setState({
      trips,
    });
    this.setState({
        loading: false,
      });
  }

/*   async submitAnswer(answer) {
    await axios.post(`http://localhost:8081/answer/${this.state.question.id}`, {
      answer,
    }, {
      headers: { 'Authorization': `Token ${this.state.getToken}` }
    });
    await this.refreshQuestion();
  } */

  render() {
    const {trips} = this.state;
    if (trips === null) return (
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
            trips && trips.map(trip => (
            <div key={trip.id} className="container">
                <hr/>
                <div className="container trips-details">
                    <div className="row">
                    <div className="col-5">
                        <div className='banner-block'>
                            <img className='card-img-top' src={trip.image_url} alt="Trip Banner"/>
                            
                        </div>
                    </div>
                    <div className="col-7">
                        <h3 className="trip-title">{trip.trip_name}</h3>
                        <p className="dest">Destinations: {trip.destinations}</p>

                        <p className="lead">{trip.description ? (trip.description).substring(0, 250) + '...' : ""}</p>
                        
                        <Link to={`/trip/${trip.id}`}>
                            <Button variant="primary" className="btn btn-primary btn-lg btn-block" type="button">
                            View Full Trip Details
                            </Button>
                        </Link> 

                    </div>
                    
                    </div>
                    
                </div>
             
            </div>
            ))
        }


        </div>
        <Footer/>
            </>
    );
  }
}

export default SearchTrip;