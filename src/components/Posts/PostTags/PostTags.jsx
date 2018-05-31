import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Link from 'gatsby-link'

class PostTags extends Component {
  constructor(props) {
    super(props)

    this.getTagNames = this.getTagNames.bind(this)
  }

  getTagNames() {
    const tagNames = []
    const { tags } = this.props
    return tagNames
  }

  render() {
    const tags = this.getTagNames()
    return (
      <PostTagsContainer>
      </PostTagsContainer>
    )
  }
}

const PostTagsContainer = styled.div`
  display: flex;
  width: 100%;
  a {
    font-size: 2rem;
    margin: 0 20px 0 0;
  }
`

export default PostTags
