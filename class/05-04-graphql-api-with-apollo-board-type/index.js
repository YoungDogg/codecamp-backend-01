// const { ApolloServer, gql } = require('apollo-server');
import {ApolloServer, gql} from 'apollo-server'

// The GraphQL schema
const myTypeDefs = gql`
  type BoradReturn {
    number: Int
    writer: String
    title: String
    contents : String
  }

  type Query {  
    fetchBoards : [BoradReturn] #주석) 배열 안ㅇ에 객체 1개 이상
  }

  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
  }
`;

// A map of functions which return data for the schema.
const myResolvers = {
  Query: {
    fetchBoards: (_, args) => {
// 디비에서 데이터 꺼내는 로직

      return [{  number : 1, writer:"철수", title:"제목",contents : "내용" },
      {  number : 2, writer:"철수2", title:"제목2",contents : "내용2" },
      {  number : 3, writer:"철수3", title:"제목3",contents : "내용3" },
      {  number : 4, writer:"철수3", title:"제목4",contents : "내용4" }
    ]
    }
  },
  Mutation: {
    createBoard: (_, args)=>{
      //디비의 데이터를 저장하는 로직
      console.log(args);
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