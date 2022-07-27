import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../components/meetups/MeetupDetail";

function MeetupDetails({ meetupData }) {
   const { image, title, address, description } = meetupData;
   return (
      <>
         <Head>
            <title>{title}</title>
            <meta
               name="viewport"
               content="initial-scale=1.0, width=device-width"
            />
            <meta name="description" content={description} />
         </Head>
         <MeetupDetail
            image={image}
            title={title}
            address={address}
            description={description}
         />
      </>
   );
}

export async function getStaticPaths() {
   const client = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
   const db = client.db();

   const meetupCollection = db.collection("meetups");
   const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
   client.close();

   return {
      paths: meetups.map((meetup) => ({
         params: { meetupId: meetup._id.toString() },
      })),
      fallback: false,
   };
}

export async function getStaticProps(context) {
   const meetupId = context.params.meetupId;

   const client = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
   const db = client.db();

   const meetupCollection = db.collection("meetups");
   const selectedMeetup = await meetupCollection.findOne({
      _id: ObjectId(meetupId),
   });
   client.close();
   return {
      props: {
         meetupData: {
            id: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            image: selectedMeetup.image,
            description: selectedMeetup.description,
         },
      },
   };
}

export default MeetupDetails;
