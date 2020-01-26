import React, { Component } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

export default class ThankYouPage extends Component {
  constructor(props) {
    super(props);
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('popupStatus', 'closed');
    }
  }

  render() {
    return (
      <>
        <Layout>
          <Header />
          <Container>
            <h1>Subscription</h1>
            <p>Thank you for your submission!</p>
            <p>You will now receive emails from us.</p>
          </Container>
          <Footer />
        </Layout>
      </>
    );
  }
}
