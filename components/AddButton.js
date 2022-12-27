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
  useToast,
  Spinner,
  Container,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import styles from "../styles/Home.module.css";
import axios from "axios";
import SearchBar from "./SearchBar";
import { v4 as uuidv4 } from "uuid";
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

import { useDispatch } from "react-redux";
import { addTask, addTodo } from "../slices/todoDataSlice";

// Function to add open a model to add a task

const AddButton = () => {
  //
  const [spinnerState, setSpinnerState] = useState(false);

  // Using use Toast Hook

  const toast = useToast();

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
  const [id, setId] = useState("");

  // Using Redux dispatch

  const dispatch = useDispatch();

  // Function to select color

  const addTask = () => {
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    setMyColor(color);
    if (session) {
      setUserEmail(session.user.email);
    }
    const currTime = new Date().getDate();
    setTime(currTime);
    setId(uuidv4());
    onOpen();
  };

  // Function to handle Submit

  const handleSubmit = async () => {
    setSpinnerState(true);

    if (description === "" || title === "") {
      toast({
        title: "Please fill complete details",
        description:
          "You may have not filled Description field or Title field ",
        status: "warning",
        position: "top",
        duration: 6000,
        isClosable: true,
      });
      setSpinnerState(false);
      return;
    }

    const todo = {
      title: title,
      description: description,
      priority: priority,
      status: status,
      time: time,
      userEmail: userEmail,
      myColor: myColor,
      id: id,
    };

    const response = await axios
      .post("/api/add", todo)
      .then((res) => {
        console.log("Data sent to server");
        return res;
      })
      .catch((err) => {
        console.log("There was some error", err);
      });
    onClose();

    if (response.status === 200) {
      setSpinnerState(false);

      // Dispatching add todo to Redux

      dispatch(addTodo(todo));
      toast({
        title: "Todo Added Successfully",
        description: "Now you can see your todo in the list",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setSpinnerState(false);
      toast({
        title: "Error Adding Todo",
        description: "Please try again",
        status: "error",
        position: "top",
        duration: 6000,
        isClosable: true,
      });
    }

    setDescription("");
    setTitle("");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Container
        my="2"
        mx={"4"}
        h={"50px"}
        display={{ base: "inline-block", md: "none" }}
        centerContent
        w={"full"}
      >
        {session && <SearchBar placeholder={"Search a task"} />}
      </Container>

      <Button
        color="gray.800"
        bg={myColor}
        h="40"
        w="40"
        p="4"
        boxShadow="dark-lg"
        textAlign="center"
        onClick={addTask}
        sx={{
          zIndex: 1,
        }}
      >
        {" "}
        <VStack spacing="7">
          <AddIcon boxSize={9} as="b" />
          <Heading>Add</Heading>
        </VStack>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent zIndex={"5000"} color={"gray.800"} bg={myColor}>
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
                  Save{" "}
                  {spinnerState && (
                    <Spinner
                      ml={2}
                      thickness="1px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      size="sm"
                    />
                  )}
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
