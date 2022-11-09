import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import BusinessCard from './BusinessCard';
import MapLocations from './MapLocations';
import Reviews from './Reviews';

const BusinessDetails = ({ selectedBusiness, setSelectedBusiness }) => {
  const [displaycard, setDisplaycard] = useState(1);
  const [details, setDetails] = useState({});
  const [reviewList, setReviewList] = useState([]);

  // call an API to get the details of selected business
  useEffect(() => {
    const fetchData = async () => {
      let config = {
        method: 'get',
        url: `http://serving-env.eba-hvsim99d.us-west-2.elasticbeanstalk.com/details/${selectedBusiness}`,
        headers: {},
      };

      // Call the API for the reviews as well
      if (selectedBusiness !== '') {
        try {
          const response = await axios(config);
          console.log(JSON.stringify(response.data));
          setDetails(response.data);
        } catch (error) {
          console.log(error);
        }

        let conf = {
          method: 'get',
          url: `http://serving-env.eba-hvsim99d.us-west-2.elasticbeanstalk.com/reviews/${selectedBusiness}`,
          headers: {},
        };

        try {
          const res = await axios(conf);
          console.log(JSON.stringify(res.data));
          setReviewList(res.data.reviews);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check if the business is selected
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const handleBack = () => {
    setSelectedBusiness({});
  };
  return (
    <div style={{ margin: '2rem' }}>
      <Container>
        <Row>
          <Col style={{ backgroundColor: 'white' }}>
            <Button className='btn btn-light' onClick={() => handleBack()}>
              ←
            </Button>
          </Col>
        </Row>
        <Row>
          <Container
            style={{
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <h2>{details ? details.name : 'loading'}</h2>
          </Container>
        </Row>
        <Row
          style={{ backgroundColor: 'rgba(244,179,113,255)', height: '30px' }}
        >
          <Col>
            <div
              onClick={() => setDisplaycard(1)}
              style={{
                textAlign: 'center',
                margin: '5px',
                textDecoration: displaycard === 1 ? 'underline' : '',
              }}
            >
              <b>Business Details</b>
            </div>
          </Col>
          <Col>
            <div
              onClick={() => setDisplaycard(2)}
              style={{
                textAlign: 'center',
                margin: '5px',
                textDecoration: displaycard === 2 ? 'underline' : '',
              }}
            >
              <b>Map Location</b>
            </div>
          </Col>
          <Col>
            <div
              onClick={() => setDisplaycard(3)}
              style={{
                textAlign: 'center',
                margin: '5px',
                textDecoration: displaycard === 3 ? 'underline' : '',
              }}
            >
              <b>Reviews</b>
            </div>
          </Col>
        </Row>
        <Row>
          {!details && isEmpty(details) ? (
            <>loading</>
          ) : displaycard === 1 ? (
            <BusinessCard
              selectedBusiness={selectedBusiness}
              details={details}
            />
          ) : displaycard === 2 ? (
            <MapLocations details={details} />
          ) : (
            <Reviews reviewList={reviewList} />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default BusinessDetails;
