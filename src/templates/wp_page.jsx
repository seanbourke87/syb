import React, { Component } from 'react'
import TopNavigation from '../components/Layout/Navigation/Navigation'
import Img from 'gatsby-image'

class wpPage extends Component {

  //event listener for card flip
  componentDidMount() {
    var cards = document.querySelectorAll('.boxContent');
    for(let i=0; i < cards.length; i++) {   
        cards[i].addEventListener( 'click', function(e) {
        if (cards[i].classList.contains('flipped') && !e.target.classList.contains('back')) {
          return;
        }
        cards[i].classList.toggle('flipped');
        cards[i].classList.add('active');
      });
    }
  }

  render() {
    const pageNode = {
      title: this.props.data.wordpressPage.title,
      content: this.props.data.wordpressPage.content,
      id: this.props.data.wordpressPage.id,
      slug: this.props.data.wordpressPage.slug,
      lazyImageUrl: this.props.data.wordpressPage.featured_media != null ? this.props.data.wordpressPage.featured_media.localFile.childImageSharp.sizes : '',
    }

    return (
      <div className="pageContainer">
        <TopNavigation pages={this.props.data.allWordpressPage} />        
        <main>
          <div className="pageContent">
            <h1>{pageNode.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: pageNode.content }} />
          </div>
          {pageNode.title == 'About me' ? (
            <div className="profilePic">
              <Img
                    className="profileImage"
                    sizes={pageNode.lazyImageUrl}
                    alt=""
                  />
              <p>Sean Y Bourke</p>
            </div>
          ) : ''}
        </main>
        <div className="footer">
          <p>sybfrontend.com - a portfolio site made with React / Gatsby </p>
        </div> 
      </div>
    )
  }
}

export default wpPage

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query WordpressPage($id: String!) {
    wordpressPage(id: { eq: $id }) {
      id
      wordpress_id
      slug
      title
      template
      content
      featured_media {
        source_url
        localFile {
          childImageSharp {
            sizes(maxWidth: 1050, quality: 100) {
              ...GatsbyImageSharpSizes_withWebp_noBase64              
            }
          }
        }         
      }
    }
    allWordpressPage {
      edges {
        node {
          slug
          title
          id
        }
      }
    }
  }
`
