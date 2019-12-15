import { StaticQuery, graphql } from 'gatsby';
import React from "react"
import { Container, Row, Col } from 'react-bootstrap';

const MasculineSociety = class extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    
    return (
      <Container>
        <br></br>
        <h1>MasculineSociety</h1>
        <p>Masculine Society page</p>
      </Container>
    )
  }
}
export default MasculineSociety;