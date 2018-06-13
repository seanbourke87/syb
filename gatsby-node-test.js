const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

// exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
//   const { createNodeField } = boundActionCreators;
//   let slug;
//   if (node.internal.type === "wordpress__POST") {
//     const fileNode = getNode(node.parent);
//     const parsedFilePath = path.parse(fileNode.relativePath);
//     if (
//       Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
//       Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
//     ) {
//       slug = `/${_.kebabCase(node.frontmatter.slug)}`;
//     }
//     if (
//       Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
//       Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
//     ) {
//       slug = `/${_.kebabCase(node.frontmatter.title)}`;
//     } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
//       slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
//     } else if (parsedFilePath.dir === "") {
//       slug = `/${parsedFilePath.name}/`;
//     } else {
//       slug = `/${parsedFilePath.dir}/`;
//     }
//     createNodeField({ node, name: "slug", value: slug });
//   }
// };

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    // The pages that will be created with each Node. They can stay the same.
    const postPage = path.resolve("src/templates/post.jsx");
    const tagPage = path.resolve("src/templates/tag.jsx");
    const categoryPage = path.resolve("src/templates/category.jsx");

    // The actual query for each node.
    resolve(
      graphql(
        `
          {
            allWordpressPost {
              edges {
                node {
                  id
                  slug
                  status
                  template
                  format
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off"*/
          console.log(result.errors);
          reject(result.errors);
        }
        // Sets to hold categories and tags.
        const tagSet = new Set();
        const categorySet = new Set();

        // Build the nodes from the GraphQL queries
        result.data.allWordpressPost.edges.forEach(edge => {

          // Create Page is part of the Gatsby API
          createPage({
            path: edge.node.slug,
            component: postPage, // Which page should it create?
            context: {
              slug: edge.node.fields.slug
            }
          });
        });
      })
    );
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};
