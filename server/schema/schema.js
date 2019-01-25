import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import _ from "lodash";
import Book from "../models/book";
import Author from "../models/author";

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId })
        return Author.findById(parent.authorId)
      }
    }
  })
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, {
        //   //  authorId: parent.id
        // });
        return Book.find({
          authorId: parent.id,
        })
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // return _.find(authors, {
        //   id: args.id,
        // })
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return  books;
        return Book.find({}); // return all of them
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({}); //find all
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addAuthor: {
          type: AuthorType,
          args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              age: { type: new GraphQLNonNull(GraphQLInt) }
          },
          resolve(parent, args){
              let author = new Author({
                  name: args.name,
                  age: args.age,
              });
              // moongose
              return author.save();
          }
      },
      addBook: {   
        type: BookType,
        args: {
          name: { type: GraphQLString},
          genre:  { type: GraphQLString},
          authorId: { type: GraphQLID }
        }, 
        resolve(parent, args){
          let book = new Book({
            name: args.name,
            genre: args.genre,
            authorId: args.authorId,
          });
         return book.save();
        }
      }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
