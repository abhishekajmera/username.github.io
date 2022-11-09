import React from 'react';
import { Container, Table } from 'react-bootstrap';

const BusinessTable = ({ businessResult, setSelectedBusiness }) => {
  // eslint-disable-next-line no-unused-vars
  let counter = 0;
  const handleClick = (business) => {
    console.log(business);
    setSelectedBusiness(business.id);
  };
  return (
    <div>
      <Container style={{ marginTop: '5rem' }}>
        {businessResult && businessResult.length !== 0 ? (
          <div>
            <Table striped bordered style={{ backgroundColor: "white", "text-align": "center" }}>
              <thead>
                <tr style={{ "height": "10px" }}>
                  <th>#</th>
                  <th>Image</th>
                  <th>Business Name</th>
                  <th>rating</th>
                  <th>Distance (Miles)</th>
                </tr>
              </thead>
              <tbody>
                {businessResult.map((business, counter) => {
                  return (
                    <tr
                      style={{ curson: 'pointer', "height": "40px" }}
                      onClick={() => handleClick(business)}
                      key={business.id}
                    >
                      <td>{++counter}</td>
                      <td style={{ display: 'flex', justifyContent: 'center', "display": "flex", "margin": "auto", "align-items": "center" }}>
                        <img
                          src={business.image_url}
                          alt='business_url'
                          width={150}
                          height={150}
                        ></img>
                      </td>
                      <td>{business.name}</td>
                      <td>{business.rating}</td>

                      <td>{Math.round(business.distance / 1620, 3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <div>No result</div>
        )
        }
      </Container >
    </div >
  );
};

export default BusinessTable;
