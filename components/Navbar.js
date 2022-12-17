import React, { useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Flex,
  Heading,
  HStack,
  FormControl,
  Input,
  Image,
  Text,
  Button,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
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
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();
  const [defaultImage, setDefaultImage] = useState(
    "https://printbusiness.co.uk/wp-content/uploads/2021/01/C4.png"
  );
  const handleImage = async () => {
    if (session) {
      if (session.user.image === null || session.user.image === undefined) {
        setDefaultImage(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTQNZR7oVHBW4Xl_5ENsDFHJC2SdC-pnxLw&usqp=CAU"
        );
      } else {
        setDefaultImage(session.user.image);
      }
    }
  };
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
        {!session ? (
          <Button onClick={() => {signIn();
            
          }}>Sign In</Button>

        ) : (
          <HStack ref={btnRef} onClick={onOpen} cursor={"pointer"}>
            <Image
              borderRadius="full"
              boxSize={8}
              src={
                !session
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTQNZR7oVHBW4Xl_5ENsDFHJC2SdC-pnxLw&usqp=CAU"
                  : session.user.image
              }
            />

            <Text display={{ base: "none", md: "block" }} whiteSpace={"nowrap"}>
              {!session ? "SignIn" : session.user.name}
            </Text>
          </HStack>
        )}
      </HStack>

      {/* Logout and search drawer */}

      <Drawer
        isOpen={isOpen}
        placement="right"
        finalFocusRef={btnRef}
        onClose={onClose}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader>Account Settings</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack p="4" w="full">
              <Text>Hey, {!session ? "" : session.user.name}</Text>
              <Text>Thankyou for using me!!</Text>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              bg={"red.400"}
              mr={3}
              onClick={() => {
                onClose();
                signOut();
              }}
            >
              {" "}
              Logout{" "}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
