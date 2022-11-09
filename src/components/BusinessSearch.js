import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// importing the necessary files for the auto-complete component
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

const BusinessSearch = ({
  businessresult,
  setBusinessResult,
  setSelectedBusiness,
}) => {
  // variable for the keyword
  const [keywords, setkeywords] = useState('');
  // variable for the state
  const [radius, setRadius] = useState(10);
  // variable to store entered loaction
  const [location, setLocation] = useState('');
  // variable for category
  const [category, setCategory] = useState('Default');
  // show loading when autocomplete API is called
  const [isLoading, setIsLoading] = useState(false);
  // store result of autocomplete
  const [options, setOptions] = useState([]);
  // whether or not the location field should be disabled
  const [isDisabled, setIsDisabled] = useState(false);
  // set lat, lon -> default to LA
  const [latlon, setLatlon] = useState([34.0736, 118.4004]);
  // Reference to the react-bootstrap-typehead
  const typeaheadRef = useRef(null);

  // Auto-complete API to handle suggestions
  const handleSearch = (query) => {
    setkeywords(query);
    setIsLoading(true);

    let config = {
      method: 'get',
      url: `http://serving-env.eba-hvsim99d.us-west-2.elasticbeanstalk.com/auto-complete/${query}`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        setOptions(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Clear selection
  const clearSelection = (e) => {
    e.preventDefault();
    setkeywords('');
    setBusinessResult([]);
    setRadius(10);
    setLatlon([34.0736, 118.4004]);
    setIsDisabled(false);
    setOptions([]);
    setCategory('Default');
    setLocation('');
    setSelectedBusiness('');
    typeaheadRef.current.clear();
  };

  // Call function if checkbox is checked
  const autoDetectLocation = (e) => {
    setIsDisabled(e.target.checked);
    setLocation('');

    if (e.target.checked) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
        // ----- UNCOMMMENT THIS LINE ------------
        setLatlon([position.coords.latitude, position.coords.longitude]);
      });
    }
  };

  // Function to handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    if (!isDisabled) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location},+CA&key=AIzaSyDotiMJsHkIxEKGb2It95eY666clgy91dI`
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          setLatlon([
            jsonData.results[0].geometry.location.lat,
            jsonData.results[0].geometry.location.lng,
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    let config = {
      method: 'get',
      url: `http://serving-env.eba-hvsim99d.us-west-2.elasticbeanstalk.com/search/${latlon[0]}/${latlon[1]}/${radius}/${keywords}/${category}`,
      headers: {},
    };
    try {
      const response = await axios(config);
      setBusinessResult(response.data.businesses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container
        fluid='sm'
        className='col-xs-12 col-lg-4'
        style={{
          BackgroundColor: 'white',
          // width: '40%',
          // padding: '20px',
          background: 'white',
        }}
      >
        <Form action='#' onSubmit={(e) => submitForm(e)}>
          <h2>Business Search</h2>

          <Row>
            <Form.Label>keywords<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Group className='mb-3 ' controlId='formkeywords'>
              <AsyncTypeahead
                // required
                inputProps={{ required: true }}
                id='async-example'
                isLoading={isLoading}
                labelKey='Keyword'
                minLength={3}
                onSearch={handleSearch}
                options={options}
                placeholder='Keyword'
                value={keywords}
                onChange={(query) => setkeywords(query[0])}
                ref={typeaheadRef}
              />
            </Form.Group>
          </Row>
          <Row className='col-xs-12'>
            <Col sm={12} lg={6}>
              <Form.Group controlId='formDistance'>
                <Form.Label>Distance</Form.Label>
                <Form.Control
                  required
                  type='number'
                  placeholder='Enter distance'
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12} lg={6}>
              <Form.Group controlId='formCategory'>
                <Form.Label>Category<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option>Default</option>
                  <option value='Arts & Entertainment'>
                    Arts & Entertainment
                  </option>
                  <option value='Health & Medical'>Health & Medical</option>
                  <option value='Hotels & Travel'>Hotels & Travel</option>
                  <option value='Food'>Food</option>
                  <option value='Professional Services'>
                    Professional Services
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className='mb-3' controlId='formLocation'>
            <Form.Label>Location<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Los Angeles'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isDisabled}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formCheckbox'>
            <Form.Check
              type='checkbox'
              label='Auto-detect Location'
              onChange={(e) => autoDetectLocation(e)}
            />
          </Form.Group>
          <Container
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px',
            }}
            className='text-center'
          >
            <Button
              style={{ padding: '5px', marginRight: '5px' }}
              variant='primary'
              className='text-center'
              type='submit'
              onSubmit={(e) => submitForm(e)}
            >
              Submit
            </Button>

            <Button
              className='text-center'
              variant='danger'
              type='submit'
              // style={{ marginRight: '5px' }}/
              onClick={(e) => clearSelection(e)}
            >
              Clear
            </Button>
          </Container>
        </Form>
      </Container>
    </div>
  );
};

export default BusinessSearch;
