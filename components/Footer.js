import {
  VStack,
  HStack,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack
      py={4}
      bg={bgColor}
      px={4}
      w="full"
      alignItems="center"
      textAlign={"center"}
      bottom={0}
      pos="fixed"
    >
      <Text fontSize="lg">Made with ❤️ by Omkar Jawalkar </Text>
      <HStack fontSize="2xl" spacing={4} p="3">
        <Link target={"_blank"} href="https://github.com/Omkar-Jawalkar">
          {" "}
          <AiFillGithub />
        </Link>

        <Link
          target={"_blank"}
          href="https://www.instagram.com/omkar_jawalkar/"
        >
          <AiOutlineInstagram></AiOutlineInstagram>
        </Link>
        <Link
          target={"_blank"}
          href="https://www.linkedin.com/in/omkar-jawalkar-68b658208/"
        >
          <AiFillLinkedin></AiFillLinkedin>
        </Link>
        <Link target={"_blank"} href="https://twitter.com/omkar_jawalkar">
          <AiFillTwitterCircle></AiFillTwitterCircle>
        </Link>
      </HStack>
    </VStack>
  );
};

export default Footer;
