import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Faq from '../components/Faq';

export default class FaqPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Header/>
        <Faq/>
        <Footer />
    </Layout>
    );
  }
}
