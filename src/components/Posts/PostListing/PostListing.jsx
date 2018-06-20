import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

class PostListing extends React.Component {
  constructor() {
    super();
    this.state = {
      dodecIndex: 1,
      personalIndex: 1,
      currentIndex: 1,
      direction: '',
      featured: {
        slide: 'active',
        list: '',
      },
      dodec: {
        slide: 'active',
        list: '',
      },
      personal: {
        slide: 'active',
        list: '',
      },
    }
    this.nextButton = this.nextButton.bind(this);
    this.prevButton = this.prevButton.bind(this);
    this.toggleSlideStatus = this.toggleSlideStatus.bind(this);
  }

  //get posts
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
          lazyImageUrl: postEdge.node.acf.regularthumb != null ? postEdge.node.acf.regularthumb.localFile.childImageSharp.sizes : '',
          lazyImageUrlFeatured: postEdge.node.acf.featuredthumb != null ? postEdge.node.acf.featuredthumb.localFile.childImageSharp.sizes : '',
        })
      }
        
    })
    return postList
  }

  //toggle slide views
  toggleSlideStatus(cat, type) {
    if (this.state[cat][type] == 'active') return;

    const newStatus = {};    
    newStatus[cat] = {
      slide: this.state[cat].slide == 'active' ? '' : 'active',
      list: this.state[cat].list == 'active' ? '' : 'active',
    }
    this.setState(newStatus);

    //scroll portfolio item list into view
    document.querySelector('.portfolio-container').scrollIntoView({ 
      behavior: 'smooth'
    });
  }

  //onclick handlers for next slider arrows
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

  //onclick handlers for prev slider arrows
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

  //Scroll top for same url
  scrollToTop(path) {
    if (('/' + path) == window.location.pathname) {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }
  

  render() {    
    const postList = this.getPostList()
    const arrows = this.props.arrows ? 'true' : '';
    const isHome = this.props.home ? 'true' : '';
    const cat = this.props.cat;
    const catTitle = (function () {
      if (cat == 'featured' && isHome == true) return '';
      else if (cat == 'featured' && isHome == false) return 'FRW.CO.UK';
      else if (cat == 'dodec') return 'Dodec Digital Agency';
      else if (cat == 'personal') return 'Personal Websites';      
    });
    return (     

      <div className={`other ${cat} ${this.state[cat].slide == 'active' ? 'slide' : 'list'}`}>
        <div className="slidesTitle">
                   <h4>{catTitle()}</h4>
                   <div className={`showSlide ${isHome} ${this.state[cat].slide}`} onClick={(e) => this.toggleSlideStatus(cat, 'slide', e)}><span></span></div>
                   {cat != 'featured' ? (<div className={`showList ${isHome} ${this.state[cat].list}`} onClick={(e) => this.toggleSlideStatus(cat, 'list', e)}><span></span><span></span><span></span></div>) : ''}                   
               </div>

        <div className={`slide-${this.state.currentIndex} direction-${this.state.direction}`}>
          {/* Your post list here. */
          postList.map((post, i) => (
            <div key={i} className="postListing">
              <h3>{post.title}</h3>                    
              <div className="postImage">
                {arrows ? (<span onClick={(e) => this.prevButton(cat, e)}>&#8592;</span>) : ''}
                {arrows ? (<span onClick={(e) => this.nextButton(cat, e)}>&#8594;</span>) : ''}
                <Link className="post-link" to={post.path} key={post.title} onClick={(e) => this.scrollToTop(post.path, e)}>
                  {post.lazyImageUrl !== '' && !isHome ? (
                    <Img 
                    sizes={post.lazyImageUrl} 
                    alt=""
                  />
                  ) : (
                    <Img                       
                      sizes={post.lazyImageUrlFeatured} 
                      alt=""
                    />
                  )}
                  <div className="imageHover">
                    <div>View Details</div>
                  </div>
                </Link>              
              </div>
            </div>
          ))}
        </div>
      </div>


    )
  }
}

export default PostListing
