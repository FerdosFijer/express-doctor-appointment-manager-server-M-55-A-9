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
    const bookingCollection = db.collection("booking");

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
    app.patch("/appointments/:id", async (req, res) =>{
      const {id} = req.param;
      const result = await appointmentsCollection.updateOne(
        {_id : new Object}
      )
    })
    app.delete("/appointments/:id", async (req, res) =>{
        const {id} = req.params
        console.log(id);
        const result = await appointmentsCollection.deleteOne({_id: new ObjectId(id)})
        res.send(result)
    })
    app.get("/booking/:userId",  async (req, res)=>{
      const {userId} = req.params;
      const result = await bookingCollection.find({userId: userId}).toArray();
      res.json(result);
    })
    app.post("/booking", async (req, res)=> {
        const newBookingData = req.body;
        console.log(newBookingData);
        const result = await bookingCollection.insertOne(newBookingData);
        res.json(result);
    })
    app.delete("/booking/:bookingId",  async (req, res) =>{
        const {bookingId}= req.params;
        console.log(bookingId);
        
        const result = await bookingCollection.deleteOne({_id: new ObjectId(bookingId)})
        res.json(result); 
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