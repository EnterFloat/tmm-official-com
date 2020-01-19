import React from "react"
import Layout from "../components/layout"
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';


const ThankYouPage = () => (
  <Layout>
      <Header/>
        <Container>
            <h1>Subscription</h1>
            <p>Thank you for your submission!</p>
            <p>You will now receive emails from us.</p>
        </Container>
    <Footer/>
  </Layout>
)

export default ThankYouPage