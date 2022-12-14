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
    <Flex direction={"column"}>
      <Heading mb="3">Tasks</Heading>

      <SimpleGrid columns={2}>
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
