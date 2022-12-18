import React from "react";
import { Box, Center, Flex, Heading, VStack } from "@chakra-ui/react";
import CompletedTodo from "./CompletedTodo";
import { useSelector } from "react-redux";

const CompletedTasks = () => {
  const myTodos = useSelector((state) => state.todoData.value);

  return (
    <Flex
      w={{ base: "full", lg: "2xl" }}
      my="2"
      borderLeftWidth={{ base: 0, lg: 1 }}
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
