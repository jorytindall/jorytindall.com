import { useQuery } from '@apollo/client';
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

export const GET_EXPERIENCES = gql`
    query Experiences {
        experiences {
            id
            company
            role
            responsibilities
        }
    }
`

export default async function MePage() {
  const { loading, error, data } = await useQuery(GET_EXPERIENCES)

  return (
    <ApolloProvider client={client}>
      <h1>Me page!</h1>
    </ApolloProvider>
  )
}