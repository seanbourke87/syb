module.exports = {
  siteTitle: "SYB Front End Developer", // Site title.
  siteTitleAlt: "SYB Front End Developer", // Alternative site title for SEO.
  siteLogo: "", // Logo used for SEO and manifest.
  siteUrl: "http://localhost:8000/", // Domain of your website without pathPrefix.
  pathPrefix: "/gatsby-wordpress-starter", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Front end developer portfolio.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "", // GA tracking ID.
  disqusShortname: "", // Disqus shortname.
  postDefaultCategoryID: "", // Default category for posts.
  userName: "", // Username to display in the author segment.
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "London, UK", // User location to display in the author segment.
  userAvatar: "", // User avatar to display in the author segment.
  userDescription:
    "", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/Vagr9K/gatsby-advanced-starter",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/Vagr9K",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:vagr9k@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2018. Sean Y Bourke.", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#6593b7", // Used for setting manifest and progress theme colors.
  backgroundColor: "#fff" // Used for setting manifest background color.
};
