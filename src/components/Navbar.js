import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavbarComponent = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      <Navbar bg='light' expand='lg' className='rounded'>
        <Container
          style={{ display: 'flex' }}
          className='justify-content-end rounded-1'
        >
          {/* <Navbar.Collapse className='justify-content-end rounded-1'> */}
          <Navbar.Text
            style={{
              marginRight: '0.5rem',
              borderRadius: '25%',
              padding: '0.5rem',
              border: location.pathname === '/search' ? '1px black solid' : '',
            }}
            // className='justify-content-end rounded-1'
          >
            <Link
              to='/search'
              className='rounded'
              style={{ textDecoration: 'none' }}
            >
              Search
            </Link>
          </Navbar.Text>
          <Navbar.Text
            style={{
              borderRadius: '25%',
              padding: '0.5rem',
              border:
                location.pathname === '/reservations' ? '1px black solid' : '',
            }}
          >
            <Link to='/reservations' style={{ textDecoration: 'none' }}>
              Reservation
            </Link>
          </Navbar.Text>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
