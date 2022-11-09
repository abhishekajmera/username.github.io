import React from 'react';
import { Container, Table } from 'react-bootstrap';

const Reviews = ({ reviewList = [] }) => {
  return (
    <Container>
      <Table striped hover style={{ backgroundColor: 'white' }}>
        {reviewList.map((rev) => {
          return (
            <>
              <tr>
                <td>
                  <Container
                    style={{
                      border: '0.1rem solid black',
                      backgroundColor: 'white',
                      padding: '15px',
                    }}
                  >
                    <b>{rev.user.name}</b>
                    <div>Rating: {rev.rating}/5</div>
                    <div>{rev.text}</div>
                    <div>{rev.time_created.split(' ')[0]}</div>
                  </Container>
                </td>
              </tr>
            </>
          );
        })}
      </Table>
    </Container>
  );
};

export default Reviews;
