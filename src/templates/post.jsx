import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Link from 'gatsby-link'
import UserInfo from '../components/Accessories/UserInfo/UserInfo'
import Disqus from '../components/Accessories/Disqus/Disqus'
import PostTags from '../components/Posts/PostTags/PostTags'
import SocialLinks from '../components/Accessories/SocialLinks/SocialLinks'
import SEO from '../components/Accessories/SEO/SEO'
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
        <SEO postPath={slug} postNode={postNode} postSEO />
        <TopNavigation pages={this.props.data.allWordpressPage} />
        <PostContainer>
          <h1>{postNode.title} </h1>
          <img
                  className="featured-image"
                  src={postNode.featured_media.source_url}
                  alt=""
                />
          <MetaSection>
            <div className="info">
              <h5>
                ...
              </h5>
            </div>
          </MetaSection>

          <div dangerouslySetInnerHTML={{ __html: postNode.content }} />
        </PostContainer>
      </div>
    )
  }
}

const PostContainer = styled.div`
  max-width: 900px;
  margin: 100px auto;

  .tags {
    display: flex;
    flex-flow: row;
    margin-top: 50px;
    h4 {
      width: 200px;
    }
  }
`

const MetaSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  img {
    width: 96px;
    height: 96px;
  }
  .cat-link {
    font-size: 2rem;
    margin-left: 2px;
  }
`

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