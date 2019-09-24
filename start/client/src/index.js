import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { resolvers, typeDefs } from './resolvers'
import React from 'react'
import ReactDOM from 'react-dom'
import Pages from './pages'
import Login from './pages/login'

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/',
    headers: {
      authorization: localStorage.getItem('token'),
    }
  }),
  typeDefs,
  resolvers,
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  }
})

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN)
  return data.isLoggedIn ? <Pages /> : <Login />
}


ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById("root")
)