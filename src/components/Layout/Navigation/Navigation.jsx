import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { siteTitle } from '../../../../data/SiteConfig'
import Logo from '../../Accessories/Logo'

class TopNavigation extends Component {
  buildPageNodes() {
    const { pages } = this.props
    let pageNodes = []

    pages.edges.forEach(page => {
      pageNodes.push({
        name: page.node.title,
        pagePath: `/${page.node.slug}`,
        id: page.node.id
      })
    })
    return pageNodes
  }

  render() {
    const links = this.buildPageNodes()
    return (
      <div className="Header">
        <div className="Logo">
          <Link to="/">
            <h1>SYB <span>Front End Developer</span></h1>
          </Link>
        </div>
        <div className="mainNav">
          {links.map(node => (
            <li key={node.id}>
              <a href={node.pagePath}>{node.name}</a>
            </li>
          ))}
        </div>
      </div>
    )
  }
}

export default TopNavigation
