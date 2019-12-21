import React from 'react';
import { Component } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Test from '../components/Test';

export default class TestPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Test />
      </Layout>
    );
  }
}
