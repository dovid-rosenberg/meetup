import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
   const router = useRouter();
   async function addMeetupHandler(enteredMeetupData) {
      const response = await fetch("/api/new-meetup", {
         method: "POST",
         body: JSON.stringify(enteredMeetupData),
         headers: {
            ContentType: "application/json",
         },
      });

      const data = await response.json();
      console.log(data);

      router.push("/");
   }
   return (
      <>
         <Head>
            <title>New Meetup</title>
            <meta
               name="viewport"
               content="initial-scale=1.0, width=device-width"
            />
            <meta name="description" content="Create a new meeting." />
         </Head>
         <NewMeetupForm onAddMeetup={addMeetupHandler} />
      </>
   );
}

export default NewMeetupPage;
