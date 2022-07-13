import { gql }  from '@apollo/client';

export const QUERY_THOUGHTS = gql`
    query thoughts($username: String) {
        thought(username: $username) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;