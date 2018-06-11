import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

class PostListing extends React.Component {
  constructor() {
    super();
    this.state = {
      dodecIndex: 1,
      personalIndex: 1,
      currentIndex: 1,
      direction: '',
    }
    this.nextButton = this.nextButton.bind(this);
    this.prevButton = this.prevButton.bind(this);
  }

  getPostList() {
    const postList = []    

    //sort posts according to custom sorting array
    const postEdges = this.props.postEdges;
    const postEdgesSorted = [];
    const postSorting = ['FINE + RARE WINES','Jamie Oliver by Tefal',"Natural Enhancement",'Doso','SB Apple','Bourke Hypnotherapy','Jacinta Hairstylist'];

    postSorting.forEach(key => {
       postEdges.filter(item => {        
        if (item.node.title == key) {
          postEdgesSorted.push(item);
        }
      })
    });
    
    //create the post list
    postEdgesSorted.forEach(postEdge => {
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

  //onclick handlers for slider arrows
  nextButton(cat) {
    if (this.props.cat == 'dodec') {
      this.setState((prevState) => {
        return {
          dodecIndex: prevState.dodecIndex == 3 ?  this.state.dodecIndex = 1 : this.state.dodecIndex + 1,
          direction: 'right',
        }
      }, () => this.setState({currentIndex: this.state.dodecIndex}));      
    }
    else {
      this.setState((prevState) => {
        return {
          personalIndex: prevState.personalIndex == 3 ?  this.state.personalIndex = 1 : this.state.personalIndex + 1,
          direction: 'right',
        }
      }, () => this.setState({currentIndex: this.state.personalIndex}));       
    }
  }
  
  prevButton(cat) {
    if (this.props.cat == 'dodec') {
      this.setState((prevState) => {
        return {
          dodecIndex: prevState.dodecIndex == 1 ?  this.state.dodecIndex = 3 : this.state.dodecIndex - 1,
          direction: 'left',

        }
      }, () => this.setState({currentIndex: this.state.dodecIndex}));     
    }
    else {
      this.setState((prevState) => {
        return {
          personalIndex: prevState.personalIndex == 1 ?  this.state.personalIndex = 3 : this.state.personalIndex - 1,
          direction: 'left',
        }
      }, () => this.setState({currentIndex: this.state.personalIndex}));   
    }
  }


  render() {    
    const postList = this.getPostList()
    const isHome = this.props.home ? 'true' : '';
    const arrows = this.props.arrows ? 'true' : '';
    return (      
      <div className={`slide-${this.state.currentIndex} direction-${this.state.direction}`}>
        {/* Your post list here. */
        postList.map((post, i) => (
          <div key={i} className="postListing">
            <h3>{post.title}</h3>                    
            <div className="postImage">
              {!isHome && arrows ? (<span onClick={(e) => this.prevButton(this.props.cat, e)}>&#8592;</span>) : ''}
              {!isHome && arrows ? (<span onClick={(e) => this.nextButton(this.props.cat, e)}>&#8594;</span>) : ''}
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
