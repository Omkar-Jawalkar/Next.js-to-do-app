import React from "react";
import { Box, Heading, HStack, Text, Toast, useToast } from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import db from "../firebase/clientApp";
import axios from "axios";
import { useSession } from "next-auth/react";
import { checkTodo, deleteTodo } from "../slices/todoDataSlice";
const CompletedTodo = (props) => {
  const { data: session } = useSession();
  // Toast import

  const toast = useToast();
  // Dispatch to redux store

  const dispatch = useDispatch();

  const repeatHandle = async () => {
    try {
      const docRef = doc(
        db,
        `users/${session.user.email}/todos/${props.todo.id}`
      );
      await updateDoc(docRef, {
        completeStatus: false,
      });
      dispatch(checkTodo({ id: props.todo.id }));
      toast({
        title: "Undo Successfully",
        description: " Now you can complete this todo again",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
      toast({
        title: "An error occurred.",
        description: "Unable to Redo todo",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const deleteHandle = async () => {
    const response = await axios
      .post("/api/delete", { id: props.todo.id, email: session.user.email })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("There was some error", err);
      });

    if (response.status === 200) {
      dispatch(deleteTodo({ id: props.todo.id }));
      toast({
        title: "Todo Deleted",
        description: "Your todo has been deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p="4"
      borderRadius={"lg"}
      color={"gray.800"}
      justifyContent={"center"}
      bg={props.todo.myColor}
      filter="auto"
      brightness="70%"
      sx={{
        _hover: {
          filter: "auto",
          brightness: "100%",
        },
      }}
      BoxShadow={"xl"}
      position={"relative"}
      px={"10"}
    >
      <Heading mb={"2"} filter="auto" brightness="100%">
        {props.todo.title}
      </Heading>
      <Text>{props.todo.description}</Text>
      <HStack
        spacing={"3"}
        right={"6"}
        top={"6"}
        fontSize={"2xl"}
        pos={"absolute"}
      >
        <RepeatIcon
          cursor={"pointer"}
          onClick={repeatHandle}
          color={"purple.600"}
        />
        <DeleteIcon
          cursor={"pointer"}
          onClick={deleteHandle}
          color={"red.600"}
        />
      </HStack>
    </Box>
  );
};

export default CompletedTodo;
