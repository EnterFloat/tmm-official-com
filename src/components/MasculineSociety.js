import React from 'react';
import ModalVideo from 'react-modal-video'
import { StaticQuery, graphql, Link } from 'gatsby';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../assets/sass/_page.scss';
import '../assets/sass/_tms.scss';
import '../../node_modules/react-modal-video/scss/modal-video.scss';
import handleCustomer from './common/handle-customer.js';
import createTmsPurchaseSession from './common/create-tms-purchase-session.js';

import Background from '../assets/images/TMS.jpg';
import PlayIcon from '../assets/images/play-icon.png';
import scrollTo from 'gatsby-plugin-smoothscroll';



const MasculineSociety = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonOpacity: 1,
      buttonVisibility: "visible",
      isOpen: false,
      oldButtonVisibility: "visible",
    }
    this.openModal = this.openModal.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this);
    this.redirectToCheckout = this.redirectToCheckout.bind(this);
  }



  redirectToCheckout(stripe_cus_id, product_sku) {
    console.log('redirectToCheckout with stripe_cus_id: ' + stripe_cus_id);
    createTmsPurchaseSession(stripe_cus_id, product_sku)
      .then(result => {
        return result;
      })
      .then(result => {
        this.state.stripe
          .redirectToCheckout({
            sessionId: result,
          })
          .then(function(result) {
            window.alert("Error: " + result.error.message)
            console.log("redirectToCheckout then: " + result.error.message);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePurchase(product_id) {
    // Get Stripe customer id
    handleCustomer(true)
      .then(result => {
        var stripe_cus_id = result;
        console.log(stripe_cus_id);
        // Redirect to checkout. Should create session first
        this.redirectToCheckout(stripe_cus_id, product_id);
      })
      .catch(err => {
        if (err == 'signed_out') {
          console.log('Sign in to continue');
          window.alert('Sign in to buy a product');
        } else {
          console.log('Could not create user: ' + err);
        }
      });
  }


  openModal () {
    this.setState({isOpen: true, oldButtonVisibility: this.state.buttonVisibility, buttonVisibility: "hidden"})
  }
  componentDidMount() {
    this.listenToScroll()
    window.addEventListener('scroll', this.listenToScroll)
    window.addEventListener("resize", this.listenToScroll);
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);
    const cus_subs = localStorage.getItem('customer_subscriptions'); // Should not be subs but whether TMS has been purchased
    this.setState({ stripe, cus_subs });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
    window.removeEventListener("resize", this.listenToScroll);

  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
    var opacity = 1
    var visibility = "visible";
    // console.log("scrollHeight: " + document.documentElement.scrollHeight)
    // console.log("clientHeight: " + document.documentElement.clientHeight)
    // console.log("height: " + height)


    if (scrolled > 0.3 && scrolled <= 0.6) {
      opacity = -((scrolled - 0.3) / 0.3) + 1
    }

    if (scrolled > 0.6) {
      opacity = 0
    }
    if (opacity == 0 || height < 200 || this.state.isOpen) {
      visibility = "hidden";
    } else {
      visibility = "visible";
    }
  
    this.setState({
      buttonVisibility: visibility,
      oldButtonVisibility: visibility,
      buttonOpacity: opacity,
    })
  }


  render() {
    const { data } = this.props;

    var videoID = data.sanitySiteSettings.masculineVideo.slice(-11)
    
    const ownsTMS = localStorage.getItem('ownsTMS');
    console.log(ownsTMS)
    var purchaseIsDisabled = false
    if (ownsTMS == "true") {
      var purchaseIsDisabled = true
    }
    return (
      <>
      <div style={{zIndex: "10000000"}}>
        <ModalVideo style={{marginTop: "56px"}} channel='youtube' isOpen={this.state.isOpen} videoId={videoID} onClose={() => this.setState({isOpen: false, buttonVisibility: this.state.oldButtonVisibility})} />
      </div>
      <div className="tms-image-container">
        <img className="tms-image" src={Background}></img>
        <div onClick={this.openModal} className="play-button"><img src={PlayIcon} className="play-image"></img></div>
      </div>
      <div style={{paddingBottom: '60px'}}>
        <Container style={{paddingTop: "50px", paddingBottom: "50px"}}>
          <br id="aboutTMS"></br>
          <h1>The Masculine Society</h1>
          <Button onClick={() => this.handlePurchase("sku_GSP3Jj23rZ7F5A")} disabled={purchaseIsDisabled}>{purchaseIsDisabled ? 'You are subscribed' : 'Buy TMS'}</Button>
        </Container>
      </div>
      <ActionButton className="tms-button" buttonOpacity={this.state.buttonOpacity} buttonVisibility={this.state.buttonVisibility}>Read more &darr;</ActionButton>
      </>
    );
  }
};
export default props => (
  <StaticQuery
    query={graphql`
      query TMSQuery {
        sanitySiteSettings {
          masculineVideo
        }
      }
    `}
    render={data => <MasculineSociety data={data} {...props} />}
  />
);


function ActionButton(props) {
  return (
    <div className={'action-container'} style={ { opacity: `${ props.buttonOpacity * 100 }%`, visibility: `${ props.buttonVisibility }` } }
>
      <Row>
        <Col
          id={'Col1'}
          xs={{ span: 4, offset: 1 }}
          sm={{ span: 4, offset: 1 }}
          md={{ span: 4, offset: 1 }}
          lg={{ span: 3, offset: 1 }}
          xl={{ span: 3, offset: 1 }}
        >
          <Button className={'action-button'}
          onClick={() => scrollTo('#aboutTMS')}>
            {props.children}
          </Button>
        </Col>
      </Row>
    </div>
  );
}