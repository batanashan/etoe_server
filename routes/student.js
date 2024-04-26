var express = require('express');
var router = express.Router();
var mangoDB = require('mongodb')
var { ObjectId } = require('mongodb')
const dbConnect = async () => {
    var mongoClient = mangoDB.MongoClient;
    const url = "mongodb+srv://u1:p1@userinfo.lye6kki.mongodb.net/"
    const server = await mongoClient.connect(url)
    const db = server.db("Class")
    return db;
}

router.get("/get-user", async (req, res, next) => {
    const db = await dbConnect()
    const collection = db.collection("Students")
    const result = await collection.find({}).toArray()
    res.send(result)
})


/* GET users listing. */

router.post('/send-post', async function (req, res, next) {
    const data = req.body.data;
    const db = await dbConnect()
    const collection = db.collection("Students")
    const result = await collection.insertOne(data)


   return res.send(result);
});

router.delete('/send-delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const db = await dbConnect()
    const collection = db.collection("Students")
    const result = await collection.deleteOne({ _id: new ObjectId(id) })


 return   res.send(result);
});

router.put('/send-put', async function (req, res, next) {
    const id = req.query.id;
    const data = req.body.data
    const db = await dbConnect()
    const collection = db.collection("Students")
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })


   return res.send(result);
});



module.exports = router;