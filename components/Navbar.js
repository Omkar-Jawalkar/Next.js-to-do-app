import React, { useState } from "react";
import {
  Flex,
  Heading,
  HStack,
  FormControl,
  Input,
  Image,
  Text,
  VStack,
  Stack,
  Button,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import {
  SunIcon,
  HamburgerIcon,
  Search2Icon,
  MoonIcon,
} from "@chakra-ui/icons";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      px="3"
      py="3"
      justifyContent="space-between"
      boxShadow={"2xl"}
      itemsAlign="start"
    >
      {/* This is logo image */}
      <HStack>
        <Image
          w="8"
          h="8"
          src="https://printbusiness.co.uk/wp-content/uploads/2021/01/C4.png"
        ></Image>
        <Heading whiteSpace={"nowrap"} size="md">
          To Do List
        </Heading>
      </HStack>

      <FormControl display={{ base: "none", md: "block" }} px="16" flex="2">
        <HStack spacing="0px">
          <Input
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            mr="0px"
            // borderRightRadius={0}
            placeholder="search"
            sx={{
              _placeholder: { color: "white" },
              _active: {
                outline: "none",
              },
            }}
            type="search"
          />

          {/* Search Button */}
          {/* <Button borderLeftRadius={0} ml="0px">
            <Search2Icon />
          </Button>{" "} */}
        </HStack>
      </FormControl>

      <HStack justifyContent="start">
        {colorMode === "light" ? (
          <MoonIcon mx={2} onClick={toggleColorMode} boxSize={6} />
        ) : (
          <SunIcon mx={2} onClick={toggleColorMode} boxSize={6} />
        )}
        <HStack>
          <Image
            borderRadius="full"
            boxSize={8}
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />

          <Text display={{ base: "none", md: "block" }} whiteSpace={"nowrap"}>
            Omkar Jawalkar
          </Text>
        </HStack>
      </HStack>

      {/* This is Search bar */}
    </Flex>
  );
};

export default Navbar;
