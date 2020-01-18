import React from 'react';
import { Container } from 'react-bootstrap';
import isSuccessfulPurchase from './common/is-successful-purchase.js';


const CheckStripeSuccess = class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    var sessionId = this.props.sessionId
      if (sessionId == "") {
          return (
              <>
                <Container>
                    <h1>Missing session id</h1>
                </Container>
              </>
          )
      }
      isSuccessfulPurchase(sessionId)
        .then(status => {
            console.log(status);
            if (status != "succeeded") {
                return(
                    <>
                    <Container>
                        <h1>An error occured processing your purchase</h1>
                    </Container>
                    </>
                )
            }
        })
        .catch(error => {
            console.log('getStripeSession error. Netlify function error: ' + error);
            return(
                <>
                <Container>
                    <h1>An error occured processing your purchase</h1>
                </Container>
                </>
            )
        });


    return (
      <>
        <Container>
          <h1>Your purchase was successful!</h1>
        </Container>
      </>
    );
  }
};
CheckStripeSuccess.defaultProps = {
    sessionId: '',
  };
export default CheckStripeSuccess;