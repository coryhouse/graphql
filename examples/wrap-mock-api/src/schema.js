const {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} = require("graphql");
const request = require("request-promise");

const Company = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    companyDescription: {
      type: GraphQLString,
      description:
        `This field is used for the company's "tag line" which is technically a part of their
        trademark. This field can be omitted but should never be truncated or manipulated in a UI.`
    }
  }
});

const Author = new GraphQLObjectType({
  name: "Author",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    company: {
      type: Company,
      resolve: (rawAuthorData) => {
        const companyId = rawAuthorData.companyId;
        return request(`http://localhost:3000/companies/${companyId}`)
          .then(JSON.parse);
      }
    }
  }
});

const Post = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: {
      type: Author,
      resolve: (rawPostData) => {
        const authorId = rawPostData.authorId;
        return request(`http://localhost:3000/authors/${authorId}`)
          .then(JSON.parse);
      }
    },
    publishDate: { type: GraphQLString },
    content: { type: GraphQLString }
  }
});

const Blog = new GraphQLObjectType({
  name: "Blog",
  fields: {
    posts: {
      type: new GraphQLList(Post),
      args: {
        page: { type: GraphQLString }
      },
      resolve: (rawBlogData, args) => {
        const page = args.page || "";

        return request(`http://localhost:3000/blog-posts/?_page=${page}`)
          .then(JSON.parse);      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Blog
});
