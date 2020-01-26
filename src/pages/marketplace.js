import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Marketplace from '../components/Marketplace';

export default class MarketplacePage extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Marketplace />
        <Footer />
      </Layout>
    );
  }
}
