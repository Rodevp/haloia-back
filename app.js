import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { readJSON } from "./helpers.js"

const data = readJSON('./preaches.json')

const typeDefs = `#graphql

    type Preache {
        nameShepherd: String
        titlePreaches: String
        verse: String
        ytLink: String
    }

    type Query {
        preaches: [Preache]
    }

`;

const resolvers = {
    Query: {
        preaches: () => data
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


startStandaloneServer(server, {
    listen: { port: 4000 }
})
    .then(({ url }) => {
        console.log('server on port ', url)
    })
    .catch(err => console.log('err graphql server'))
