import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage({ meetups }) {
   return (
      <>
         <Head>
            <title>Meetups</title>
            <meta
               name="viewport"
               content="initial-scale=1.0, width=device-width"
            />
            <meta name="description" content="Create and view meetings." />
         </Head>
         <MeetupList meetups={meetups} />
      </>
   );
}

// export function getServerSideProps(context) {
//    const req = context.req;
//    const res = context.res;

//    return {
//       props: {
//          meetups: DUMMY_MEETUPS,
//       },
//    };
// }

export async function getStaticProps() {
   const client = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
   const db = client.db();

   const meetupCollection = db.collection("meetups");
   const meetups = await meetupCollection.find().toArray();
   client.close();

   return {
      props: {
         meetups: meetups.map((meetup) => ({
            title: meetup.title,
            address: meetup.address,
            image: meetup.image,
            id: meetup._id.toString(),
         })),
      },
      revalidate: 10,
   };
}

export default HomePage;
