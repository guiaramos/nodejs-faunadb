import express from 'express';
import * as faundadb from 'faunadb';

const app = express();

const client = new faundadb.Client({
  secret: String(process.env.FAUNA_SECRET),
});

const { Get, Ref, Collection } = faundadb.query;

app.get('/tweet/:id', async (req, res) => {
  const doc = await client
    .query(Get(Ref(Collection('tweets'), req.params.id)))
    .catch((err) => console.error(err));

  res.send(doc);
});

app.listen(5000, () => console.log('API on http://localhost:5000/'));
