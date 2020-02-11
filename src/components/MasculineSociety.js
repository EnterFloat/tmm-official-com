import React from 'react';
import ModalVideo from 'react-modal-video';
import { StaticQuery, graphql } from 'gatsby';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import '../assets/sass/_page.scss';
import '../assets/sass/_tms.scss';
import '../../node_modules/react-modal-video/scss/modal-video.scss';
import handleCustomer from './common/handle-customer.js';
import createTmsPurchaseSession from './common/create-tms-purchase-session.js';

import Background from '../assets/images/TMS.jpg';
import PlayIcon from '../assets/images/play-icon.png';
import scrollTo from 'gatsby-plugin-smoothscroll';
import Dialog from './Dialog';

const buttonStylesCheckout = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: '#760000',
  borderRadius: '6px',
  borderColor: '#A40000',
  letterSpacing: '1.5px',
  width: '100%',
};

const MasculineSociety = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonOpacity: 1,
      buttonVisibility: 'visible',
      isOpen: false,
      oldButtonVisibility: 'visible',
      dialogVisibility: 'hidden',
      dialogTitle: '',
      dialogMessage: '',
      stripe: '',
      ownsTMS: '',
      cus_subs: '',
    };
    this.openModal = this.openModal.bind(this);
    this.setDialog = this.setDialog.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.redirectToCheckout = this.redirectToCheckout.bind(this);
  }

  redirectToCheckout(stripe_cus_id, product_sku) {
    var retries = 0;
    console.log("redirectToCheckout ", stripe_cus_id)
    console.log("redirectToCheckout ", product_sku)
    createTmsPurchaseSession(stripe_cus_id, product_sku)
      .then(result => {
        console.log("createTmsPurchaseSession ", result)
        return result;
      })
      .then(result => {
        console.log("redirectToCheckout res1: ", result)     
        console.log("redirectToCheckout state.stripe: ", this.state.stripe)     
        this.state.stripe
          .redirectToCheckout({
            sessionId: result,
          })
          .then(function(result) {    
            console.log("redirectToCheckout res2: ", result) 
            return "Success"       
          }).catch(err => {     
            console.log("redirectToCheckout err: ", err)       
            return "Error during redirectToCheckout"       
          });          
      })
      .catch(err => { 
        console.log("Retries: " + retries);
        console.log("err: " + err)
        if (retries < 2) {
          retries += 1;
          createTmsPurchaseSession(stripe_cus_id, product_sku)
        } else {
          console.log("Max retries exceeded")
        }
              
      });
  }

  setDialog(visibility, title, message) {
    this.setState({
      dialogVisibility: visibility,
      dialogTitle: title,
      dialogMessage: message,
    });
  }

  handlePurchase(product_sku) {
    // Get Stripe customer id
    handleCustomer(true)
      .then(result => {
        var stripe_cus_id = result;
        console.log("MasculineSociety ", stripe_cus_id)
        console.log("MasculineSociety ", product_sku)

        // Redirect to checkout. Should create session first
        this.redirectToCheckout(stripe_cus_id, product_sku);
      })
      .catch(err => {
        if (err === 'signed_out') {
          // window.alert('Sign in to buy a product');
          this.setDialog(
            'visible',
            'Info',
            'You must sign in to buy a product'
          );
        } else if (err === 'error') {
          // window.alert('Sign in to buy a product');
          this.setDialog(
            'visible',
            'Error',
            'An error occured...'
          );
        }
      });
  }

  openModal() {
    this.setState({
      isOpen: true,
      oldButtonVisibility: this.state.buttonVisibility,
      buttonVisibility: 'hidden',
    });
  }
  componentDidMount() {
    this.listenToScroll();
    const ownsTMS = localStorage.getItem('ownsTMS');
    window.addEventListener('scroll', this.listenToScroll);
    window.addEventListener('resize', this.listenToScroll);
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);
    const cus_subs = localStorage.getItem('customer_subscriptions'); // Should not be subs but whether TMS has been purchased
    this.setState({ stripe: stripe, cus_subs: cus_subs, ownsTMS: ownsTMS });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll);
    window.removeEventListener('resize', this.listenToScroll);
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;
    var opacity = 1;
    var visibility = 'visible';

    if (scrolled > 0.3 && scrolled <= 0.6) {
      opacity = -((scrolled - 0.3) / 0.3) + 1;
    }

    if (scrolled > 0.6) {
      opacity = 0;
    }
    if (opacity === 0 || height < 200 || this.state.isOpen) {
      visibility = 'hidden';
    } else {
      visibility = 'visible';
    }

    this.setState({
      buttonVisibility: visibility,
      oldButtonVisibility: visibility,
      buttonOpacity: opacity,
    });
  };

  render() {
    const { data } = this.props;

    var videoID = data.sanitySiteSettings.masculineVideo.slice(-11);
    const ownsTMS = this.state.ownsTMS;
    var purchaseIsDisabled = false;
    if (ownsTMS === 'true') {
      var purchaseIsDisabled = true;
    }
    return (
      <>
        <Dialog
          title={this.state.dialogTitle}
          message={this.state.dialogMessage}
          visibility={this.state.dialogVisibility}
          setState={p => {
            this.setState(p);
          }}
          parentState={this.state}
        />
        <div style={{ zIndex: '10000000' }}>
          <ModalVideo
            style={{ marginTop: '56px' }}
            channel="youtube"
            isOpen={this.state.isOpen}
            videoId={videoID}
            onClose={() =>
              this.setState({
                isOpen: false,
                buttonVisibility: this.state.oldButtonVisibility,
              })
            }
          />
        </div>
        <div className="tms-image-container">
          <img className="tms-image" alt={"Background"} src={Background}></img>
          <div onClick={this.openModal} className="play-button">
            <img src={PlayIcon} className="play-image"></img>
          </div>
        </div>        
        <ActionButton
          className="tms-button"
          buttonOpacity={this.state.buttonOpacity}
          buttonVisibility={this.state.buttonVisibility}
        >
          Read more &darr;
        </ActionButton>
        <Container
          id="aboutTMS"
          className="plan-container"
          style={{ paddingBottom: '60px', paddingTop: '30px' }}
        >
          <Row style={{ textAlign: 'center' }}>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              style={{ marginBottom: '10px', padding: '10px 10px' }}
              className="col-centered"
            >
              <Card>
                <Card.Header>
                  <h4 style={{ textAlign: 'center' }}>The Masculine Society</h4>
                </Card.Header>
                <Card.Body>
                  <h5>
                    {1000} <span style={{ color: 'grey' }}> {'USD'}</span>
                  </h5>
                  <h5>Access to all products</h5>
                  <p></p>
                  <Button
                    style={buttonStylesCheckout}
                    onClick={() => this.handlePurchase('sku_GZj8t0qHsiuqCr')}
                    disabled={purchaseIsDisabled}
                  >
                    {purchaseIsDisabled ? 'You own TMS' : 'Buy TMS'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <br></br>
          </Row>
        </Container>
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
    <div
      className={'action-container'}
      style={{
        opacity: `${props.buttonOpacity * 100}%`,
        visibility: `${props.buttonVisibility}`,
      }}
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
          <Button
            className={'action-button'}
            onClick={() => scrollTo('#aboutTMS')}
          >
            {props.children}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
