const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://shakibMiaProject:thaAwUjS5eomcBQi@cluster0.6aisg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const collection = await client.db("todo").collection("works");

    app.get("/", (req, res) => {
      res.send("server is running on port " + port);
    });

    app.get("/todos", async (req, res) => {
      const query = {};
      const cursor = collection.find(query);
      const projects = await cursor.toArray();
      res.send(projects);
    });

    app.post("/todos", async (req, res) => {
      const query = req.body;
      const cursor = await collection.insertOne(query);
      res.send(cursor);
    });

    app.delete("/todos/:_id", async (req, res) => {
      const query = req.params._id;
      const filter = { _id: ObjectId(query) };
      const result = await collection.deleteOne(filter);

      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => console.log("listening on port " + port));
