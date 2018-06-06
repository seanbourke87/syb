import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import config from '../../data/SiteConfig'
import TopNavigation from '../components/Layout/Navigation/Navigation'

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.wordpressPost
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