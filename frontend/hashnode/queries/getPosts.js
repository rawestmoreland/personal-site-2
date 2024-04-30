import { gql } from 'graphql-request';

const HOST = process.env.NEXT_PUBLIC_HASHNODE_HOST;

export const GET_POSTS = gql`
  query Posts($limit: Int = 10, $after: String) {
    publication(host: "${HOST}") {
      posts(first: $limit, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            brief
            url
            publishedAt
          }
        }
      }
    }
  }
`;
