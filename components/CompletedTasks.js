import React from "react";
import { Box, Center, Flex, Heading, VStack } from "@chakra-ui/react";

const CompletedTasks = () => {
  return (
    <Flex
      w={{ base: "full", lg: "2xl" }}
      my="2"
      borderLeftWidth={{ base: 0, lg: 1 }}
    >
      <VStack w="full" p="3">
        <Heading textAlign={"center"}>
          <Center>Tasks Completed</Center>
        </Heading>
      </VStack>
    </Flex>
  );
};

export default CompletedTasks;
