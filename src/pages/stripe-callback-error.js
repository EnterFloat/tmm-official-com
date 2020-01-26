import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Scroll from '../components/Scroll';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';


const StripeError = () => {
    return (
      <Layout>
          <Header/>
          <Container>
            <h1>Something did not go as planned...</h1>
            <p>Your purchase was not successful.</p>
            <p>Chat with us using the button in the bottom right corner, if you are having trouble.</p>
          </Container>
          <Footer/>
      </Layout>
    )
  }
  
  export default StripeError;
