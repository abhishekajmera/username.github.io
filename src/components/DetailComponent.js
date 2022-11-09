import { Col, Row } from 'react-bootstrap';

const DetailComponent = ({ header, value, isLink = false }) => {
  return (
    <div>
      <Row style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Col sm={12} lg={6}>
          <Row
            style={{
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {header[0]}
          </Row>
          <Row>
            <div
              style={{
                color:
                  value[0] === 'Closed'
                    ? 'red'
                    : value[0] === 'Open'
                      ? 'green'
                      : '',
              }}
            >
              {value[0]}
            </div>
          </Row>
        </Col>

        <Col sm={12} lg={6}>
          <Row
            style={{
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {header[1]}
          </Row>
          <Row>
            <div>
              {isLink ? (
                <a href={value[1]} target='_blank' rel='noreferrer'>
                  Business Link
                </a>
              ) : (
                value[1]
              )}
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DetailComponent;
