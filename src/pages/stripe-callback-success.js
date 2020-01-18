import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Scroll from '../components/Scroll';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CheckStripeSuccess from '../components/CheckStripeSuccess';

import withLocation from "../components/withLocation";


const StripeSuccess = ({ search }) => {
    const { session_id } = search
    return (
      <Layout>
          <Header/>
          <CheckStripeSuccess sessionId={session_id}/>
          <Footer/>
      </Layout>
    )
  }
  
  export default withLocation(StripeSuccess)
