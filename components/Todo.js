import React from "react";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoDataSlice";
import { useToast } from "@chakra-ui/react";
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
  // toast import
  const toast = useToast();

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
      borderRadius="lg"
      boxShadow={"base"}
      color={"gray.800"}
      position={"relative"}
      bg={myColor}
      px={8}
      py={4}
      sx={{
        _hover: {
          boxShadow: "dark-lg",
        },
      }}
    >
      <Heading
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        textOverflow={"ellipsis"}
        pb={2}
        w="40"
        as="h2"
        size="lg"
      >
        {title}
      </Heading>
      <HStack spacing={3} pos="absolute" top={5} right={24} boxSize={6}>
        <CheckIcon cursor={"pointer"} color={"green.600"} boxSize={6} />
        <EditIcon cursor={"pointer"} color={"purple.600"} boxSize={6} />
        <DeleteIcon
          onClick={handleDelete}
          cursor={"pointer"}
          color={"red.500"}
          boxSize={6}
        />
      </HStack>
      <Text>{description}</Text>
    </Box>
  );
};

export default Todo;
