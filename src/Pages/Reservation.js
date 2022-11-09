import React from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import ReservationList from '../components/ReservationList';

const Reservation = () => {
  return (
    <div>
      <NavbarComponent />
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h2>List of Reservations</h2>
      </Container>
      <ReservationList />
    </div>
  );
};

export default Reservation;
