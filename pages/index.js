import { Box, Container, Divider } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { getSession } from "next-auth/react";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import AddButton from "../components/AddButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import db from "../firebase/clientApp";

import { useSession } from "next-auth/react";
import CombineComponent from "../components/CombineComponent";
import Signin from "../components/Signin";
import { initializeTodo } from "../slices/todoDataSlice";

export default function Home({ todos }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  if (todos) {
    dispatch(initializeTodo(todos.arr));
  }

  return (
    <Box pos={"absolute"} w="full">
      <Navbar />

      {!session ? (
        <Container my={{ base: "100px", lg: "120px" }} maxW={"container.md"}>
          <Signin />
        </Container>
      ) : (
        <>
          <Container mt="5" centerContent>
            <AddButton />
          </Container>
          <Divider mt="8" mb="2" />
          <DndProvider backend={HTML5Backend}>
            <CombineComponent todos={todos} />
          </DndProvider>
        </>
      )}
      <Box pos={"relative"} bottom="0">
        <Footer />
      </Box>
    </Box>
  );
}

export async function getServerSideProps({ req }) {
  // Getting Session
  let headers = {};
  const session = await getSession({ req });
  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` };
    console.log("My Session", session.user.email);

    const querySnapshot = await getDocs(
      collection(db, `users/${session.user.email}/todos`)
    );
    const arr = [];
    querySnapshot.docs.map((doc) => {
      arr.push(doc.data());
    });

    // console.log("This is query data", querySnapshot.docs);

    // This is working Code

    return {
      props: {
        todos: { arr },
      }, // will be passed to the page component as props
    };
  }

  return {
    props: {
      todos: {},
    }, // will be passed to the page component as props
  };
}
