import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in </h1> : <h1>Not signed in</h1>;
};

LandingPage.getInitialProps = async (context) => {
  //build client is a pre-config axios object
  const client = buildClient(context);

  const { data } = await client
    .get("/api/users/currentuser")
    .catch((e) => console.error(e));

  return data;
};

export default LandingPage;
