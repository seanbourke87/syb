import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

class PostListing extends React.Component {
  getPostList() {
    const postList = []
    console.log(this.props.cat)  
    this.props.postEdges.forEach(postEdge => {
      if (postEdge.node.categories[0].name.toLowerCase() == this.props.cat) {
        postList.push({
          path: postEdge.node.slug,
          cover: postEdge.node.cover,
          title: postEdge.node.title,
          excerpt: postEdge.node.excerpt,
          mainCategory: postEdge.node.categories[0].name,
          project: postEdge.node.project,
          featuredImageUrl:
            postEdge.node.acf.extrathumb !== null
              ? postEdge.node.acf.extrathumb.source_url
              : '',
        })
      }
        
    })
    return postList
  }

  render() {    
    const postList = this.getPostList()
    return (      
      <div>
        {/* Your post list here. */
        postList.map((post, i) => (
          <PostListContainer key={i}>
            <h3>{post.title}</h3>
            <Link className="post-link" to={post.path} key={post.title}>
              {post.featuredImageUrl !== '' ? (
                <img
                  className="featured-image"
                  src={post.featuredImageUrl}
                  alt=""
                />
              ) : (
                <div />
              )}
            </Link>
            <p>{post.cat} a</p>
          </PostListContainer>
        ))}
      </div>
    )
  }
}

const PostListContainer = styled.div`
  margin: 50px 0;
  h3 {
    position: relative;
  }

  .featured-image {
    width: 600px;
    height: 200px;
    object-fit: cover;
  }
`

export default PostListing
