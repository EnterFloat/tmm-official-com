import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import About from '../components/About';

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Header/>
        <About/>
        <Footer />
    </Layout>
    );
  }
}
