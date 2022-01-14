// const { ApolloServer, gql } = require('apollo-server');
import {ApolloServer, gql} from 'apollo-server'

// The GraphQL schema
const myTypeDefs = gql`
  type Query {  
    fetchBoards : Return
  }

  type Mutation {
    createBoard: String
  }
`;

// A map of functions which return data for the schema.
const myResolvers = {
  Query: {
    fetchBoards: () => {
// 디비에서 데이터 꺼내는 로직

      return "조회에 성공하였습니다"
    }
  },
  Mutation: {
    createBoard: ()=>{
      //디비의 데이터를 저장하는 로직

      return "등록 성공!"
    }
  }
};

const server = new ApolloServer({
  typeDefs : myTypeDefs, // typeDefs 이름이 같을 때 myTypeDefs가 아니라, 키, 밸류가 같으면 밸류 생략 가능(shorthand property)
  resolvers : myResolvers // 위와같음
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});