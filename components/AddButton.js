import React, { useState } from "react";
import { useSession } from "next-auth/react";
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
  useColorModeValue,
  Textarea,
  StylesProvider,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import styles from "../styles/Home.module.css";
import axios from "axios";
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
  const inputSelectColor = useColorModeValue("gray.100", "gray.100");

  // Session Usage

  const { data: session } = useSession();

  // Input States

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Urgent");
  const [status, setStatus] = useState("Beginning");
  const [userEmail, setUserEmail] = useState("");

  // Function to select color

  const addTask = () => {
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    setMyColor(color);
    if (session) {
      setUserEmail(session.user.email);
    }
    const currTime = new Date().getDate();
    setTime(currTime);
    onOpen();
  };

  // Function to handle Submit

  const handleSubmit = async () => {
    const todo = {
      title: title,
      description: description,
      priority: priority,
      status: status,
      time: time,
      userEmail: userEmail,
    };

    const response = await axios
      .post("http://localhost:3000/api/add", todo)
      .then((res) => {
        console.log("Data sent to server");
        return res.data;
      })
      .catch((err) => {
        console.log("There was some error", err);
      });

    console.log("I am response", response);
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
              <SimpleGrid spacing={4} columns={2}>
                <GridItem colSpan={2}>
                  <Text mb={2} fontSize={"lg"}>
                    Title
                  </Text>
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    variant={"filled"}
                    required
                    placeholder="Cook a meal..."
                    focusBorderColor="none"
                    bg={inputSelectColor}
                    sx={{
                      _hover: { bg: "gray.200" },
                      _placeholder: { color: "gray.500" },
                    }}
                  ></Input>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text mb={2} fontSize={"lg"}>
                    Description
                  </Text>
                  <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                    variant={"filled"}
                    placeholder="Watch a cooking video..."
                    focusBorderColor="none"
                    bg={inputSelectColor}
                    sx={{
                      _hover: { bg: "gray.200" },
                      _placeholder: { color: "gray.500" },
                    }}
                  ></Textarea>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text mb={2} fontSize={"lg"}>
                    Priority
                  </Text>
                  <Select
                    onChange={(e) => setPriority(e.target.value)}
                    bg={inputSelectColor}
                    focusBorderColor="none"
                    variant={"filled"}
                  >
                    <option style={{ backgroundColor: "white" }} value="Urgent">
                      Urgent
                    </option>
                    <option
                      style={{ backgroundColor: "white" }}
                      bg={inputSelectColor}
                      value="Necessary"
                    >
                      Necessary
                    </option>
                    <option
                      style={{ backgroundColor: "white" }}
                      bg={inputSelectColor}
                      value="Chill"
                    >
                      Chill
                    </option>
                  </Select>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text mb={2} fontSize={"lg"}>
                    Status
                  </Text>
                  <Select
                    bg={inputSelectColor}
                    focusBorderColor="none"
                    variant={"filled"}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option
                      style={{ backgroundColor: "white" }}
                      value="Beginning"
                    >
                      Beginning
                    </option>
                    <option
                      style={{ backgroundColor: "white" }}
                      value="Half Way"
                    >
                      Half Way
                    </option>
                    <option
                      style={{ backgroundColor: "white" }}
                      value="At the End"
                    >
                      At the End
                    </option>
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
                <Button onClick={handleSubmit} bg={"blue.500"}>
                  Save
                </Button>
              </HStack>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddButton;
