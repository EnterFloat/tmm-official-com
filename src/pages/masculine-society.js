import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MasculineSociety from '../components/MasculineSociety';

export default class MasculineSocietyPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Header/>
        <MasculineSociety/>
        <Footer />
    </Layout>
    );
  }
}
