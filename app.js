import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { readJSON, writeJSON } from "./helpers.js"

const data = readJSON('./preaches.json')

const typeDefs = `#graphql

    type Preache {
        nameShepherd: String
        titlePreaches: String
        verse: String
        ytLink: String
    }

    type VerseToday {
        verse: String
        numberVerse: String
    }

    type Query {
        verseToday: VerseToday
        preaches: [Preache]
        findPreache(titlePreaches: String!): Preache
    }

    type Mutation {
        setVerse(newVerse: String!, numberVerse: String!): VerseToday
    }

`;

const resolvers = {
    Query: {
        preaches: () => data,
        findPreache: (root, args) => {
            const { titlePreaches } = args
            const preache = data?.find(p => p?.titlePreaches === titlePreaches)
            return preache
        },
        verseToday: () => {
            const verse = readJSON('./verse.json')
            return verse
        } 
    }, 
    Mutation: {
        setVerse: (root, args) => { 

            const { newVerse, numberVerse } = args
            const verse = readJSON('./verse.json')
            
            verse['verse'] = newVerse
            verse['numberVerse'] = numberVerse

            writeJSON('./verse.json', verse)
            
            return readJSON('./verse.json')
        } 
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


startStandaloneServer(server, {
    listen: { port: 4200 }
})
    .then(({ url }) => {
        console.log('server on port ', url)
    })
    .catch(err => console.log('err graphql server'))
