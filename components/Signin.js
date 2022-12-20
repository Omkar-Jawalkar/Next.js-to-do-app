import React from "react";
import {
  Container,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
const Signin = () => {
  return (
    <Card my={"8"} mx={"6"}>
      <CardHeader textAlign={"center"}>
        <Heading>Hey, I'm glad you are here🥳🎉</Heading>
      </CardHeader>
      <CardBody textAlign={"center"}>
        <VStack spacing={"4"}>
          <Text fontSize={"lg"}>
            Would you mind <b>Signing In</b>, it'll take less than a sec 🙋‍♂️
          </Text>

          <Text fontSize={"md"}>
            Go on, juz click on the <b>Sign in</b> button below and boom 💥,
            I'll meet you on the other side!🤠
          </Text>
        </VStack>
      </CardBody>
      <CardFooter justifyContent={"center"}>
        <Button onClick={signIn} bg={"blue.500"}>
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signin;
