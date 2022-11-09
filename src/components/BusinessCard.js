/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import DetailComponent from './DetailComponent';
import ImageCarousel from './ImageCarousel';
import ReviewModal from './ReservationModal';

const BusinessCard = ({ selectedBusiness, details }) => {
  const [show, setShow] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const checkIsReserved = () => {
    const reservations = JSON.parse(localStorage.getItem('reservationList'));
    const exists = reservations.some((res) => res.name === details.name);
    return exists;
  };

  // handle the deletion of a reservation
  const deleteRes = () => {
    const reservations = JSON.parse(localStorage.getItem('reservationList'));
    const newRes = reservations.filter((res) => {
      return res.name !== details.name;
    });
    setIsReserved(false);
    localStorage.setItem('reservationList', JSON.stringify(newRes));
    window.alert('Reservation cancelled');
  };

  // check if a reservation already exists
  useEffect(() => {
    setIsReserved(checkIsReserved());
    debugger;
  }, []);

  var categoriesList = '';
  try {
    for (var i = 0; i < details.categories.length - 1; i++) {
      categoriesList = categoriesList + details.categories[i]['title'] + ' | ';
    }
    categoriesList = categoriesList + details.categories[i]['title'];
  } catch (e) {}
  return (
    <>
      <br></br>
      {details && !isEmpty(details) ? (
        <Container
          style={{ backgroundColor: 'white', 'text-align': 'center' }}
          className='col-xs-12 lg-6'
        >
          <br></br>
          <Row className='col-xs-12 lg-6'>
            <DetailComponent
              style={{ fontWeight: 'bold' }}
              header={['Address', 'Category']}
              value={[
                details.location.display_address.join(', '),
                categoriesList,
              ]}
            />
          </Row>
          <br></br>
          <Row className='col-xs-12 lg-6'>
            <DetailComponent
              header={['Phone', 'Price Range']}
              value={[details.phone, details.price]}
            />
          </Row>

          <br></br>
          <DetailComponent
            header={['Status', 'Visit yelp for more']}
            value={[details.is_closed ? 'Open' : 'Closed', details.url]}
            isLink={true}
          />
          <br></br>
          <Row>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {isReserved ? (
                <Button className='btn btn-primary' onClick={() => deleteRes()}>
                  Cancel Reservation
                </Button>
              ) : (
                <Button
                  className='btn btn-danger'
                  onClick={() => setShow(true)}
                >
                  Reserve now
                </Button>
              )}
              {/* <Button className='btn btn-danger' onClick={() => setShow(true)}>
                Reserve now
              </Button> */}
            </div>
            <br></br>
          </Row>
          <ReviewModal
            setShow={setShow}
            show={show}
            name={details.name}
            setIsReserved={setIsReserved}
          />
          <br></br>
          <Row className='col-xs-12 lg-6'>
            <br></br>
            <br></br>
            <div style={{ justifyContent: 'center' }}>
              Share on <span> </span>
              {/* <a href={`https://twitter.com/${details.name}`} target="_blank"><img src={'/img/Twitter-logo-png.png'} height="20px"></img></a> */}
              <a
                href={`https://twitter.com/intent/tweet?text=Check%20${details.name}%20on%20Yelp&url=${details.url}`}
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src={'/img/Twitter-logo-png.png'}
                  height='20px'
                  alt='world'
                ></img>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${details.url}`}
                target='_blank'
              >
                <img
                  src={'/img/facebook-logo.png'}
                  height='30px'
                  alt='hello'
                ></img>
              </a>
            </div>
          </Row>

          <ImageCarousel photos={details.photos} />
        </Container>
      ) : (
        <>loading</>
      )}
    </>
  );
};

export default BusinessCard;
