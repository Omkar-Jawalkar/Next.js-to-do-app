import React from "react";
import { Box, Center, Flex, Heading, VStack, useToast } from "@chakra-ui/react";
import CompletedTodo from "./CompletedTodo";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase/clientApp";
import { checkTodo } from "../slices/todoDataSlice";
import { useDispatch } from "react-redux";

const CompletedTasks = () => {
  const dispatch = useDispatch();
  const myTodos = useSelector((state) => state.todoData.value);
  const toast = useToast();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => repeatHandle(item.id, item.email),
    collect: (moniter) => ({
      isOver: !!moniter.isOver(),
    }),
  }));

  // Repeat handle second

  const repeatHandle = async (id, email) => {
    try {
      const docRef = doc(db, `users/${email}/todos/${id}`);
      await updateDoc(docRef, {
        completeStatus: true,
      });
      dispatch(checkTodo({ id: id }));
      toast({
        title: "Task Completed Successfully🎉",
        description: "keep it up!",
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

  return (
    <Flex
      w={{ base: "full", lg: "2xl" }}
      my="2"
      borderLeftWidth={{ base: 0, lg: 1 }}
      ref={drop}
    >
      <VStack spacing={"10"} px="8" w="full">
        <Heading textAlign={"center"}>
          <Center>Tasks Completed</Center>
        </Heading>
        {myTodos.map(
          (todo) =>
            todo.completeStatus && (
              <Box w="full">
                <CompletedTodo todo={todo} />
              </Box>
            )
        )}
      </VStack>
    </Flex>
  );
};

export default CompletedTasks;
