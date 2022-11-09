import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';

const ReviewModal = ({ show, setShow, name = '', setIsReserved }) => {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationObj = {
      email,
      date,
      time,
      name,
    };
    if (!localStorage.getItem('reservationList')) {
      localStorage.setItem('reservationList', JSON.stringify([reservationObj]));
    } else {
      let reservationList = JSON.parse(localStorage.getItem('reservationList'));
      reservationList.push(reservationObj);
      localStorage.setItem('reservationList', JSON.stringify(reservationList));
    }
    window.alert('Reservation Created');
    setIsReserved(true);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Form</Modal.Title>
        </Modal.Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0.5rem',
          }}
        >
          <h5>{name}</h5>
        </div>
        <Modal.Body>
          <Form action='#' onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                inputProps={{ required: true }}
                placeholder='name@example.com'
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='date'
                inputProps={{ required: true }}
                name='reservation-date'
                row={3}
                required={true}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTime'>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type='time'
                name='reservation-time'
                row={4}
                inputProps={{ required: true }}
                required={true}
                onChange={(e) => setTime(e.target.value)}
                min="10:00:00" max="17:00:00"
              />
            </Form.Group>
            <Container style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type='submit'
                variant='danger'
                onSubmit={(e) => handleSubmit(e)}
              >
                Save Changes
              </Button>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviewModal;
