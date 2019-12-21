const path = require('path');
const slug = require('slug');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Add slug for page generation.
  if (node.internal.type === 'StripeProduct') {
    const value = slug(node.id, slug.defaults.modes['rfc3986']);
    createNodeField({
      node,
      name: 'slug',
      value,
    });
  }
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = '/account/*';

    // Update the page.
    createPage(page);
  }
};

exports.createPages = async ({ graphql, actions, page }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allStripeProduct {
        edges {
          node {
            fields {
              slug
            }
            name
            livemode
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }

    // Create product pages
    const products = {};

    result.data.allStripeProduct.edges.forEach(({ node }) => {
      products[node.id] = [node.fields.slug, node.name];
    });

    const productTemplate = path.resolve('src/templates/ProductTemplate.js');
    Object.entries(products).forEach(([id, data]) => {
      createPage({
        path: 'marketplace/' + data[0],
        component: productTemplate,
        context: { id, data },
      });
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
