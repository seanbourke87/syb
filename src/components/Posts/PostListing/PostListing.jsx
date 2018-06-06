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
    const arrows = this.props.cat !== 'featured' ? 'true' : '';
    return (      
      <div>
        {/* Your post list here. */
        postList.map((post, i) => (
          <div key={i} className="postListing">
            <h3>{post.title}</h3>            
            <div className="postImage">
              {arrows !== '' ? (<span>&#8592;</span>) : ''}
              {arrows !== '' ? (<span>&#8594;</span>) : ''}
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
                <div className="imageHover">
                  <div>View Details</div>
                </div>
              </Link>              
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default PostListing
