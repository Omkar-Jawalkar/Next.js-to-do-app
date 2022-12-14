import React from "react";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
const Todo = () => {
  return (
    <Box
      borderRadius="lg"
      boxShadow={"base"}
      color={"gray.800"}
      position={"relative"}
      bg="yellow.300"
      px={8}
      py={4}
      m="4"
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
        Hospital asdas d asd asdsad d asd asd asd
      </Heading>
      <HStack spacing={3} pos="absolute" top={5} right={24} boxSize={6}>
        <CheckIcon color={"green.600"} boxSize={6} />
        <EditIcon color={"purple.600"} boxSize={6} />
        <DeleteIcon color={"red.500"} boxSize={6} />
      </HStack>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aliquam
        perferendis ipsam inventore labore aperiam excepturi, unde rem minus
        optio, fugit quidem laboriosam. Provident, cumque. Ut illum similique
        placeat quia.
      </Text>
    </Box>
  );
};

export default Todo;
