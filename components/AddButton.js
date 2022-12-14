import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  GridItem,
  Input,
  Select,
  HStack,
  FormControl,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const colorArray = [
  "red.300",
  "yellow.300",
  "green.300",
  "blue.300",
  "cyan.300",
  "orange.300",
  "pink.300",
  "purple.300",
  "teal.300",
];

// Function to add open a model to add a task

const AddButton = () => {
  const [myColor, setMyColor] = useState("yellow.300");
  const addTask = () => {
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    setMyColor(color);
    onOpen();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        color="gray.800"
        bg={myColor}
        h="40"
        w="40"
        p="4"
        boxShadow="dark-lg"
        textAlign="center"
        onClick={addTask}
      >
        {" "}
        <VStack spacing="7">
          <AddIcon boxSize={9} as="b" />
          <Heading>Add</Heading>
        </VStack>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"gray.800"} bg={myColor}>
          <ModalCloseButton />
          <ModalHeader>Add a task</ModalHeader>
          <ModalBody>
            <FormControl>
              <SimpleGrid spacing={6} columns={2}>
                <GridItem colSpan={2}>
                  <Text mb={2} fontSize={"lg"}>
                    Title
                  </Text>
                  <Input
                    variant={"filled"}
                    required
                    placeholder="Cook a meal..."
                  ></Input>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text mb={2} fontSize={"lg"}>
                    Description
                  </Text>
                  <Input placeholder="Cook a meal..."></Input>
                </GridItem>
                <GridItem colSpan={1}>
                  <Select placeholder="Select option">
                    <option value="option1">Urgent</option>
                    <option value="option3">Necessary</option>
                    <option value="option3">Chill</option>
                  </Select>
                </GridItem>
                <GridItem colSpan={1}>
                  <Select placeholder="Status">
                    <option value="option2">Beginning</option>
                    <option value="option2">Half Way</option>
                    <option value="option3">At the End</option>
                  </Select>
                </GridItem>
              </SimpleGrid>
              <HStack spacing={5} justify={"center"} alignItems="center" py="8">
                <Button
                  onClick={() => {
                    onClose();
                  }}
                  bg={"red.500"}
                >
                  Cancel
                </Button>
                <Button bg={"blue.500"}>Save</Button>
              </HStack>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddButton;
