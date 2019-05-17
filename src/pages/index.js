import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Introduction from '../block/introduction/introduction';

const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        authorBirthDate
        job {
          name
          url
        }
      }
    }

    allProjectsYaml {
      edges {
        node {
          link
          title
          type
        }
      }
    }

    allContactsYaml {
      edges {
        node {
          title
          url
          itemprop
        }
      }
    }
  }
`;

export default function IndexPage() {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <Introduction
          site={data.site.siteMetadata}
          contacts={data.allContactsYaml.edges.map(({ node }) => node)}
          projects={data.allProjectsYaml.edges.map(({ node }) => node)}
        />
      )}
    />
  );
}
