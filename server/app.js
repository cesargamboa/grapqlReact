import express from 'express'
import grapqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';
import cors from 'cors';




const app = express();
//allow cross-origin request
app.use(cors());
mongoose.connect('mongodb://practiceuser:Gamboa1992.@ds211265.mlab.com:11265/gql-db', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to database');
}); 
app.use('/graphql', grapqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
