import React from "react";
import HeroSection from "./HeroSection";
import CompletedTasks from "./CompletedTasks";
import { Flex, Container, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const CombineComponent = ({ todos }) => {
  const todoInfo = useSelector((state) => state.todoData.value);
  console.log("my todo info kaga dummy", todoInfo);
  console.log("my todo info kaga dummy", todoInfo.length);
  return (
    <>
      {todoInfo.length == 0 ? (
        <Container centerContent>
          <Heading mt="10" mb="5" textAlign="center">
            Hey, I see you haven't added any tasks yet 🙆‍♂️
          </Heading>
          <Text textAlign={"center"} fontSize={"lg"}>
            Lets kill the procrastination and get started with your first task!
            😁
          </Text>
        </Container>
      ) : (
        <Flex direction={{ base: "column", lg: "row" }}>
          <HeroSection todos={todos} />
          <CompletedTasks />
        </Flex>
      )}
    </>
  );
};

export default CombineComponent;
