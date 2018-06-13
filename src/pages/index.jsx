import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PostListing from '../components/Posts/PostListing/PostListing'
import SEO from '../components/Accessories/SEO/SEO'
import config from '../../data/SiteConfig'
import TopNavigation from '../components/Layout/Navigation/Navigation'
import Intro from '../components/Accessories/Intro/Intro'

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allWordpressPost.edges
    return (
      <HomeContainer>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
        <TopNavigation pages={this.props.data.allWordpressPage} />
        <MainContentContainer className="mainContent">
          <Intro />


          <div className="featured">
            <PostListing postEdges={postEdges} cat={`featured`} home={true} />
          </div>

          <div className="additional">            
              <PostListing postEdges={postEdges} cat={`dodec`} arrows={true} />
              <PostListing postEdges={postEdges} cat={`personal`} arrows={true} />
          </div>          
          
        </MainContentContainer>

        <div className="footer">
          <p>sybfrontend.com - a portfolio site made with React / Gatsby </p>
        </div>

      </HomeContainer>
    )
  }
}

export default Index

const HomeContainer = styled.div``
const MainContentContainer = styled.main``

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexQuery {
    allWordpressPost {
      edges {
        node {
          featured_media {
            source_url            
          }
          date
          slug
          title
          modified
          excerpt
          id
          acf {
            regularthumb {
              source_url
              localFile {
                childImageSharp {
                  sizes(maxWidth: 1050, quality: 100) {
                    ...GatsbyImageSharpSizes_withWebp_noBase64
                  }
                }
              }
            }    
            featuredthumb {
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
          categories {
            name
          }
          tags {
            name
          }
          content
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
