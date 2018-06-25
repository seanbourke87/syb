import React, { Component } from "react";
import Link from "gatsby-link";

class Footer extends Component {

  componentDidMount() {
    var footerLink = document.querySelector('.footerLink');
    footerLink.addEventListener( 'click', function(e) {
      if ('/' == window.location.pathname) {
        e.preventDefault();
        window.scroll({
          top: 0, 
          left: 0,
        });
      }
    });
  }

  render() {   
    return (
      <div className="footer">
          <p>
            <Link className="footerLink" to="/">
              sybfrontend.com
            </Link>      
             &nbsp;- a portfolio site made with React / Gatsby
          </p>
        </div>
    );
  }
}

export default Footer;
