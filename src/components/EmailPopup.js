import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import '../assets/sass/_email_sub.scss';

export default function EmailPopup() {
  return (
    <div className={'popup-container'}>
      <Row>
        <Col
          id={'Col1'}
          xs={{ span: 8, offset: 4 }}
          sm={{ span: 7, offset: 5 }}
          md={{ span: 6, offset: 6 }}
          lg={{ span: 4, offset: 8 }}
          xl={{ span: 4, offset: 8 }}
          className="popup-col"
        >
        <p className="close-popup">&#10005;</p>
          <Form className="form-container" name="Email subscription" method="POST" data-netlify="true" action="/thank-you">
            <Form.Group controlId="formBasicEmail">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              {/* <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Button className="subscribe-button" variant="primary" type="submit">
              Subscribe to newsletter
            </Button>
            </Form>
        </Col>
      </Row>
    </div>
  );
}
