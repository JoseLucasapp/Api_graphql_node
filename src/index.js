const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
        hello: String
        users: [User!]!
        getUserByEmail(email: String!): User!
    }

    type User{
        _id: ID!
        name: String!
        email: String!
        active: Boolean!
    }

    type Post{
        _id: ID!
        title: String
        content: String
        author: User!
    }

    type Mutation{
        createUser(email: String!, name: String!): User!
    }
`;

const users = [
    {_id: String(Math.random()), name: 'Lucas', email:'lucas@gmail.com', active: true},
    {_id: String(Math.random()), name: 'Lucas', email:'lucas2@gmail.com', active: true},
    {_id: String(Math.random()), name: 'Lucas', email:'lucas3@gmail.com', active: false},
]

const resolvers = {
    Query: {
        hello: ()=> 'hello world',
        users: ()=> users,
        getUserByEmail: (_, args)=>{
            return users.find((user)=> user.email === args.email)
        }
    },

    Mutation: {
        createUser: (_, args)=>{
            const newUser = {
                _id: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true
            }

            users.push(newUser);

            return newUser;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>console.log(`Server is running at ${url}`))