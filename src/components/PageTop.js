import React from 'react';
import LogoText from '../assets/images/the-masculine-mentality.png';
import HeaderLogo from '../assets/images/index-header-logo.png';

const PageTop = class extends React.Component {
  render() {
    return (
      <>
        <div className="background-div">
          <div className="centered-div">
            <img className="logo" alt={"TMM logo"} src={HeaderLogo}></img>
            <br></br>
            <img className="logo-text" alt={"TMM logo text"} src={LogoText}></img>
          </div>
        </div>
      </>
    );
  }
};
export default PageTop;
