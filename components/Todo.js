import React, { useState, useRef, useEffect } from "react";

import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";

import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTodo, checkTodo, updateTodo } from "../slices/todoDataSlice";
import db from "../firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";

import { useSession } from "next-auth/react";
// modal imports

import {
  Box,
  Text,
  Heading,
  Code,
  Button,
  VStack,
  Portal,
  Badge,
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
  Tooltip,
  Textarea,
  StylesProvider,
  useToast,
  Spinner,
  LightMode,
} from "@chakra-ui/react";

// Import Open Model

import ShowTodo from "./ShowTodo";

// Draggable

import { useDrag } from "react-dnd";

const Todo = ({
  id,
  description,
  priority,
  status,
  time,
  title,
  myColor,
  email,
}) => {
  // POrtal useRef

  const ref = useRef();

  useEffect(() => {
    handlePriority();
  }, []);
  // Create useState for showModel

  // Drag

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: { id: id, email: email },
    collect: (moniter) => ({
      isDragging: !!moniter.isDragging(),
    }),
  }));

  // toast import
  const toast = useToast();
  const inputSelectColor = useColorModeValue("gray.100", "gray.100");

  // Color mode for priority and status

  const [priorityColor, setPriorityColor] = useState("red");
  const statusColor = useColorModeValue("gray.700", "gray.700");
  const statusbg = useColorModeValue("yellow.400", "yellow.400");

  // todo Update states

  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updatePriority, setUpdatePriority] = useState(priority);
  const [updateStatus, setUpdateStatus] = useState(status);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isShowOpen,
    onOpen: onShowOpen,
    onClose: onShowClose,
  } = useDisclosure();
  const [spinnerState, setSpinnerState] = useState(false);

  // session use

  const { data: session } = useSession();

  // HandlePriority

  function handlePriority() {
    if (priority === "Urgent") {
      setPriorityColor("red");
    } else if (priority === "Necessary") {
      setPriorityColor("yellow");
    } else {
      setPriorityColor("green");
    }
  }

  console.log("handlePriority", handlePriority);
  console.log("priority", priority);

  // Handle update task

  const handleUpdate = async () => {
    setSpinnerState(true);
    try {
      const updateTodoRef = doc(db, `users/${session.user.email}/todos/${id}`);
      await updateDoc(updateTodoRef, {
        title: updateTitle,
        description: updateDescription,
        priority: updatePriority,
        status: updateStatus,
      });

      dispatch(
        updateTodo({
          id: id,
          title: updateTitle,
          description: updateDescription,
          priority: updatePriority,
          status: updateStatus,
        })
      );
      setSpinnerState(false);
      onEditClose();
      toast({
        title: "Todo Updated 🎉",
        position: "top",
        description: "Your todo has been updated!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      onEditClose();
      toast({
        title: "Sorry, we couldn't update your todo!",
        description: "Please check your Internet Connection!",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle Check Task

  const handleCheck = async () => {
    try {
      const todoRef = doc(db, `users/${session.user.email}/todos/${id}`);
      await updateDoc(todoRef, {
        completeStatus: true,
      });
      dispatch(checkTodo({ id: id }));
      toast({
        title: "Todo Completed 🎉",
        description: "Keep it up!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (e) {
      toast({
        title: "Please check your Internet Connection!",
        description: "",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Handle Delete Task
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const response = await axios
      .post("/api/delete", { id: id, email: email })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("There was some error", err);
      });

    console.log("Response", response.status);
    if (response.status === 200) {
      dispatch(deleteTodo({ id: id }));
      toast({
        title: "Todo Deleted",
        description: "Your todo has been deleted",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      ref={drag}
      borderRadius="lg"
      boxShadow={"base"}
      color={"gray.800"}
      position={"relative"}
      bg={myColor}
      px={6}
      py={4}
      sx={{
        _hover: {
          boxShadow: "dark-lg",
        },
      }}
      onClick={() => {
        handlePriority();
        onShowOpen();
      }}
      cursor={"pointer"}
      id="box"
    >
      <HStack>
        <Heading
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          pb={2}
          maxW={{ base: "60px", md: "40", lg: "40", xl: "40" }}
          as="h2"
          size="lg"
        >
          {title}
        </Heading>
        <Box pb="1">
          <LightMode>
            <Badge mx={{ base: "0", md: "1" }} colorScheme={priorityColor}>
              {priority}
            </Badge>
          </LightMode>
        </Box>
      </HStack>
      <HStack spacing={3} pos="absolute" top={5} right={24} boxSize={6}>
        <Tooltip placement="top" label="Complete me 🙋‍♂️">
          <CheckIcon
            onClick={(e) => {
              e.stopPropagation();
              handleCheck();
            }}
            cursor={"pointer"}
            color={"green.600"}
            boxSize={6}
          />
        </Tooltip>
        <Tooltip placement="top" label="Edit me ✏️">
          <EditIcon
            onClick={(e) => {
              e.stopPropagation();
              onEditOpen();
            }}
            cursor={"pointer"}
            color={"purple.600"}
            boxSize={6}
          />
        </Tooltip>

        <Tooltip placement="top" label="Delete🥺">
          <DeleteIcon
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            cursor={"pointer"}
            color={"red.500"}
            boxSize={6}
          />
        </Tooltip>
      </HStack>
      <Text>{description}</Text>

      {/* Model for update */}

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent color={"gray.800"} bg={myColor}>
          <ModalCloseButton />
          <ModalHeader>Update a task</ModalHeader>
          <ModalBody>
            <FormControl>
              <SimpleGrid spacing={4} columns={2}>
                <GridItem colSpan={2}>
                  <Text mb={2} fontSize={"lg"}>
                    Title
                  </Text>
                  <Input
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    variant={"filled"}
                    required
                    placeholder="Cook a meal..."
                    focusBorderColor="none"
                    bg={inputSelectColor}
                    sx={{
                      _hover: { bg: "gray.200" },
                      _placeholder: { color: "gray.500" },
                    }}
                    value={updateTitle}
                  ></Input>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text mb={2} fontSize={"lg"}>
                    Description
                  </Text>
                  <Textarea
                    onChange={(e) => setUpdateDescription(e.target.value)}
                    variant={"filled"}
                    placeholder="Watch a cooking video..."
                    focusBorderColor="none"
                    bg={inputSelectColor}
                    sx={{
                      _hover: { bg: "gray.200" },
                      _placeholder: { color: "gray.500" },
                    }}
                    value={updateDescription}
                  ></Textarea>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text mb={2} fontSize={"lg"}>
                    Priority
                  </Text>
                  <Select
                    onChange={(e) => setUpdatePriority(e.target.value)}
                    bg={inputSelectColor}
                    focusBorderColor="none"
                    variant={"filled"}
                    value={updatePriority}
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
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    value={updateStatus}
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
                    onEditClose();
                  }}
                  bg={"red.500"}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdate} bg={"blue.500"}>
                  Update{" "}
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

      {/* SHow todo modal */}

      <Modal isCentered isOpen={isShowOpen} onClose={onShowClose}>
        <ModalOverlay />

        <ModalContent
          zIndex={"10000"}
          sx={{ wordBreak: "breakWord" }}
          color={"gray.900"}
          bg={myColor}
        >
          <ModalHeader
            sx={{
              width: "700ppx",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            <HStack alignItems={"center"}>
              {" "}
              <Heading>{title}</Heading>{" "}
              <Box m="0">
                <LightMode>
                  <Badge mx={"1"} colorScheme={priorityColor}>
                    {priority}
                  </Badge>
                </LightMode>
              </Box>
            </HStack>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"lg"}>{description}</Text>
          </ModalBody>

          <ModalFooter>
            <Code color={statusColor} fontSize={"lg"} bg={statusbg}>
              Status : {status}
            </Code>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Todo;
