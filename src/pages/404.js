// import React from 'react';
// import { Component } from 'react';
// import Layout from '../components/Layout';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import { Container } from 'react-bootstrap';

// export default class ErrorPage extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <Layout BGColor="#760000" paddingTop="100">
//         <Header/>
//         <br></br>
//         <Container>
//             <h1 style={{color: "white", textAlign: "center"}}>Looks like you hit a roadblock...</h1>
//         </Container>
//         <Footer />
//     </Layout>
//     );
//   }
// }

import React from 'react';

import Layout from '../components/Layout';
import Header from '../components/Header';
import { Link } from 'gatsby';

const ErrorPage = () => (
  <Layout>
    <Header />
    <header className="masthead">
      <div className="container d-flex h-100 align-items-center">
        <div className="mx-auto text-center">
          <h1 className="mx-auto my-0 text-uppercase">Page not found</h1>
          <h2 className="text-white-50 mx-auto mt-2 mb-5">Not a valid URL</h2>

          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </header>
  </Layout>
);

export default ErrorPage;
