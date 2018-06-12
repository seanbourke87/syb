import React, { Component } from 'react'
import TopNavigation from '../components/Layout/Navigation/Navigation'

class wpPage extends Component {
  render() {
    const pageNode = {
      title: this.props.data.wordpressPage.title,
      content: this.props.data.wordpressPage.content,
      id: this.props.data.wordpressPage.id,
      slug: this.props.data.wordpressPage.slug
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
              <img src="" />
              <p>Sean Y Bourke</p>
            </div>
          ) : ''}
        </main>
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
