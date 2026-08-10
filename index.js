//! express mongodb cors dotenv
const express = require('express');
const app = express()
const cors = require ("cors");
const dontenv = require('dotenv');
dontenv.config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();
    const db = client.db("Doctor-Appointment-Manager");
    const doctorCollection = db.collection("Doctor");

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Doctor server is running correctly!')
})

app.listen(port, () => {
  console.log(`Doctor server is running on port ${port}`)
})