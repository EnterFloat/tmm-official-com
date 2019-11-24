import React from 'react';
import { Component } from 'react';


import Layout from '../components/Layout';
import Scroll from '../components/Scroll';

import config from '../../config';
import Footer from '../components/Footer';
import SocialLinks from '../components/SocialLinks';
import Subscribe from '../components/Subscribe';
import Header from '../components/Header';

import ipad from '../assets/images/ipad.png';
import demoImage1 from '../assets/images/demo-image-01.jpg';
import demoImage2 from '../assets/images/demo-image-02.jpg';
import bgMaster from '../assets/images/bg-masthead.jpg';

import axios from 'axios'

import { Link } from 'gatsby';
// import { isAuthenticated } from '../utils/auth';
import { isAuthenticated, getProfile } from "../utils/auth"

function createUser(auth0_id) {
  console.log("Creating new user")

  axios.post("/.netlify/functions/create-user", {auth0_id: `${auth0_id}`})
      .then(res => {
        console.log(res);
        console.log(res.data);
        getUser(auth0_id)
      })
      .catch(error => {
        console.log(error);
      });
}

function getUser() {

  var auth0_id = getUserSub()
  if (auth0_id == false) {
    return
  }
  console.log("Get user with id " + auth0_id)

  axios.post("/.netlify/functions/get-user", {auth0_id: `${auth0_id}`})
      .then(res => {
        console.log("User exists with data:")
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.response.status)
        if (error.response.data.requestResult.statusCode == "404")
          console.log("No existing user was found")
          createUser(auth0_id)
      });
}

function getUserSub() {
  console.log("Get user sub")
  if (isAuthenticated()) {
    const user = getProfile()
    console.log(user.name + ": " + user.sub)
    return(user.sub)
  } else {
    console.log("Not authenticated")
    return(false)
  }
}

// const IndexPage = () => (
//   <Layout>
//     <Header />

//     <header className="masthead">

//       <div className="container d-flex h-100 align-items-center">
//         <div className="mx-auto text-center">
//           <h1 className="mx-auto my-0 text-uppercase">{config.heading}</h1>
//           <h2 className="text-white-50 mx-auto mt-2 mb-5">
//             {config.subHeading}
//           </h2>
//           <Scroll type="id" element="about">
//             <a href="#about" className="btn btn-primary">
//               About
//               <button onClick={console.log("hdfsjk")}>Click here</button>
//             </a>
//           </Scroll>
//         </div>
//       </div>
//     </header>

// {/* 
//     <section id="about" className="about-section text-center">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-8 mx-auto">
//             <h2 className="text-white mb-4">Built with Bootstrap 4</h2>
//             <p className="text-white-50">
//               Grayscale is a free Bootstrap theme created by Start Bootstrap. It
//               can be yours right now, simply download the starter on
//               <a href="https://github.com/anubhavsrivastava/gatsby-starter-grayscale">
//                 the github repo
//               </a>
//               .
//             </p>
//           </div>
//         </div>
//         <img src={ipad} className="img-fluid" alt="" />
//       </div>
//     </section>

//     <section id="projects" className="projects-section bg-light">
//       <div className="container">
//         <div className="row align-items-center no-gutters mb-4 mb-lg-5">
//           <div className="col-xl-8 col-lg-7">
//             <img className="img-fluid mb-3 mb-lg-0" src={bgMaster} alt="" />
//           </div>
//           <div className="col-xl-4 col-lg-5">
//             <div className="featured-text text-center text-lg-left">
//               <h4>Shoreline</h4>
//               <p className="text-black-50 mb-0">
//                 Grayscale is open source and MIT licensed. This means you can
//                 use it for any project - even commercial projects! Download it,
//                 customize it, and publish your website!
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
//           <div className="col-lg-6">
//             <img className="img-fluid" src={demoImage1} alt="" />
//           </div>
//           <div className="col-lg-6">
//             <div className="bg-black text-center h-100 project">
//               <div className="d-flex h-100">
//                 <div className="project-text w-100 my-auto text-center text-lg-left">
//                   <h4 className="text-white">Misty</h4>
//                   <p className="mb-0 text-white-50">
//                     An example of where you can put an image of a project, or
//                     anything else, along with a description.
//                   </p>
//                   <hr className="d-none d-lg-block mb-0 ml-0" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row justify-content-center no-gutters">
//           <div className="col-lg-6">
//             <img className="img-fluid" src={demoImage2} alt="" />
//           </div>
//           <div className="col-lg-6 order-lg-first">
//             <div className="bg-black text-center h-100 project">
//               <div className="d-flex h-100">
//                 <div className="project-text w-100 my-auto text-center text-lg-right">
//                   <h4 className="text-white">Mountains</h4>
//                   <p className="mb-0 text-white-50">
//                     Another example of a project with its respective
//                     description. These sections work well responsively as well,
//                     try this theme on a small screen!
//                   </p>
//                   <hr className="d-none d-lg-block mb-0 mr-0" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section> */}
// {/* 
//     <Subscribe />

//     <SocialLinks /> */}

//     <Footer />
//   </Layout>
// );

// export default IndexPage;





export default class IndexPage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Layout>
        <Header />
        <header className="masthead">
        {/* <button onClick={getUser}>Hej</button> */}
        {getUser()}

          <div className="container d-flex h-100 align-items-center">
            <div className="mx-auto text-center">
              <h1 className="mx-auto my-0 text-uppercase">{config.heading}</h1>
              <h2 className="text-white-50 mx-auto mt-2 mb-5">
                {config.subHeading}
              </h2>
              <Scroll type="id" element="about">
                <a href="#about" className="btn btn-primary">
                  About
                </a>
              </Scroll>
            </div>
          </div>
        </header>
        <Footer />
    </Layout>
    );
  }
}
