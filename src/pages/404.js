import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import About from '../components/About';

export default class ErrorSite extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout BGColor="white" paddingTop="100">
        <Header/>
        <p>Error</p>
        <Footer />
    </Layout>
    );
  }
}
