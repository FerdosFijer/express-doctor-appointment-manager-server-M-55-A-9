const express = require('express');
const app = express()
const cors = require("cors");
const dontenv = require('dotenv');
dontenv.config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

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
    const appointmentsCollection = db.collection("AllAppointments");

    app.get("/appointments", async (req, res) => {
      const result = await appointmentsCollection.find().toArray();
      res.json(result);
    })
    app.get("/appointments/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const result = await appointmentsCollection.findOne({ _id : new ObjectId(id) });
      res.json(result);
    })
    app.path("/appointments/:id", async (req, res) =>{
      const {id} = req.param;
      const result = await appointmentsCollection.updateOne(
        {_id : new Object}
      )
    })
    app.delete("/appointments/:id", async (req, res) =>{
        const {id} = req.params
        const result = await appointmentsCollection.deleteOne({_id: new ObjectId(id)})
        res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Doctor server is running correctlyyyyyyy!')
})

app.listen(port, () => {
  console.log(`Doctor server is running on port ${port}`)
})