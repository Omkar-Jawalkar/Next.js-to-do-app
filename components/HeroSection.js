import React from "react";
import Todo from "./Todo";
import {
  Heading,
  useBreakpointValue,
  SimpleGrid,
  GridItem,
  Flex,
} from "@chakra-ui/react";

const HeroSection = () => {
  const colSpan = useBreakpointValue({ base: 2, lg: 1 });

  return (
    <Flex px={"4"} maxW={"4xl"} direction={"column"}>
      <Heading pt="4" textAlign={"center"} mb="3">
        Tasks
      </Heading>

      <SimpleGrid mb={"6"} p="4" spacing={10} columns={2}>
        <GridItem colSpan={colSpan}>
          <Todo />
        </GridItem>
        <GridItem colSpan={colSpan}>
          <Todo />
        </GridItem>
        <GridItem colSpan={colSpan}>
          <Todo />
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
};

export default HeroSection;
