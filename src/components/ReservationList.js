import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

const ReservationList = () => {
  const [resList, setResList] = useState([]);

  let counter = 0;
  useEffect(() => {
    if (localStorage.getItem('reservationList')) {
      setResList(JSON.parse(localStorage.getItem('reservationList')));
    }
  }, []);

  const deleteReservation = (e, res) => {
    e.preventDefault();
    const newList = resList.filter(
      (reservation) => JSON.stringify(reservation) !== JSON.stringify(res)
    );

    setResList(newList);
    localStorage.setItem('reservationList', JSON.stringify(newList));
    window.alert('Reservation cancelled');
  };

  return (
    <Container
      style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}
    >
      <Table bordered hover>
        {resList.length > 0 ? (
          <>
            <thead>
              <tr>
                <th>#</th>
                <th>Business Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>E-mail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {resList.map((res, counter) => {
                return (
                  <tr>
                    <td>{++counter}</td>
                    <td>{res.name}</td>
                    <td>{res.date}</td>
                    <td>{res.time}</td>
                    <td>{res.email}</td>
                    <td>
                      <Button
                        type='submit'
                        variant='danger'
                        onClick={(e) => deleteReservation(e, res)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <>
            <Container
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'red',
              }}
            >
              No reservations to show
            </Container>
          </>
        )}
      </Table>
    </Container>
  );
};

export default ReservationList;
