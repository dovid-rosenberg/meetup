import { MongoClient } from "mongodb";

async function handler(req, res) {
   if (req.method === "POST") {
      const data = req.body;

      const client = await MongoClient.connect(
         "mongodb+srv://rosedove:n8x03rs0mSj6VWFF@cluster0.rf4fraq.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupCollection = db.collection("meetups");

      const result = await meetupCollection.insertOne(JSON.parse(data));
      console.log(result);
      client.close();

      res.status(201).json({ message: "Meetup inserted" });
   }
}
export default handler;
