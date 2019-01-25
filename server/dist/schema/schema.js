'use strict';

var _graphql = require('graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dummy data

var books = [{ name: 'Name of the wind', genre: 'Fantasy', id: '1' }, { name: 'Name of the wind2', genre: 'Fantasy1', id: '2' }, { name: 'Name of the wind3', genre: 'Fantasy2', id: '3' }];
var GraphQLObjectType = _graphql2.default.GraphQLObjectType,
    GraphQLString = _graphql2.default.GraphQLString,
    GraphQLSchema = _graphql2.default.GraphQLSchema;


var BookType = new GraphQLObjectType({
  name: 'Book',
  fields: function fields() {
    return {
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      genre: {
        type: GraphQLString
      }
    };
  }
});

var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: GraphQLString
      },
      resolve: function resolve(parent, args) {
        return _lodash2.default.find(books, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});