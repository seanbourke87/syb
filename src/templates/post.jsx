import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import config from '../../data/SiteConfig'
import TopNavigation from '../components/Layout/Navigation/Navigation'
import PostListing from '../components/Posts/PostListing/PostListing'


export default class PostTemplate extends React.Component {
  constructor() {
    super();
    this.state = {
      dodec: {
        slide: 'active',
        list: '',
      },
      personal: {
        slide: 'active',
        list: '',
      },
    }
    this.toggleSlideStatus = this.toggleSlideStatus.bind(this);
  }

  toggleSlideStatus(cat) {
    const newStatus = {};
    newStatus[cat] = {
      slide: this.state[cat].slide == 'active' ? '' : 'active',
      list: this.state[cat].list == 'active' ? '' : 'active',
    }
    this.setState(newStatus);
  }


  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.wordpressPost
    const postEdges = this.props.data.allWordpressPost.edges
    if (!postNode.id) {
      postNode.id = slug
    }
    if (!postNode.category_id) {
      postNode.category_id = config.postDefaultCategoryID
    }
    return (
      <div>
        <Helmet>
          <title>{`${postNode.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <TopNavigation pages={this.props.data.allWordpressPage} />
        <div className="postContainer">
          <div className="postContent">
            <div className="featuredImage">
               <img
                    className="featured-image"
                    src={postNode.featured_media.source_url}
                    alt=""
                  />
            </div>
            <div className="postInfo">
              <h1>{postNode.title} </h1>
              <div dangerouslySetInnerHTML={{ __html: postNode.content }} />
            </div>
          </div>
            <div className="portfolio-container">

              <div className="additional">  
                <div className="other dodec">
                  <div className="slidesTitle">
                    <h4>FRW.CO.UK</h4>      
                    <div className="showSlide active"><span></span></div>    
                  </div>        
                  <PostListing postEdges={postEdges} cat={`featured`} />
                </div>

                <div className={`other dodec ${this.state.dodec.slide == 'active' ? 'slide' : 'list'}`}>
                  <div className="slidesTitle">
                    <h4>Dodec Web Design Agency</h4>
                    <div className={`showSlide ${this.state.dodec.slide}`} onClick={(e) => this.toggleSlideStatus('dodec', e)}><span></span></div>
                    <div className={`showList ${this.state.dodec.list}`} onClick={(e) => this.toggleSlideStatus('dodec', e)}><span></span><span></span><span></span></div>
                  </div>
                  <PostListing postEdges={postEdges} cat={`dodec`} arrows={true}/>
                </div>

                <div className={`other personal ${this.state.personal.slide == 'active' ? 'slide' : 'list'}`}>
                  <div className="slidesTitle">
                    <h4>Personal Websites</h4>
                    <div className={`showSlide ${this.state.personal.slide}`} onClick={(e) => this.toggleSlideStatus('personal', e)}><span></span></div>
                    <div className={`showList ${this.state.personal.list}`} onClick={(e) => this.toggleSlideStatus('personal', e)}><span></span><span></span><span></span></div>
                  </div>
                  <PostListing postEdges={postEdges} cat={`personal`} arrows={true} />
                </div>
              </div>

          </div>
        </div>  
        <div className="footer">
          <p>sybfrontend.com - a portfolio site made with React / Gatsby </p>
        </div>      
      </div>
    )
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query PostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      featured_media {
        source_url
      }
      date
      slug
      title
      modified
      excerpt
      id
      categories {
        name
      }
      content
    }
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
            extrathumb {
              source_url
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