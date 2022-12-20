import Todo from "./Todo";

import { useSession } from "next-auth/react";
import {
  Heading,
  useBreakpointValue,
  SimpleGrid,
  GridItem,
  Flex,
  Tooltip,
  Container,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const HeroSection = ({ todos }) => {
  const todoInfo = useSelector((state) => state.todoData.value);
  // console.log("my todo info", todoInfo);
  const result = todoInfo.filter((todo) => todo.completeStatus !== true);
  console.log("my result", result);
  const colSpan = useBreakpointValue({ base: 2, lg: 1 });
  const { data: session } = useSession();
  return (
    <Flex
      px={"4"}
      w={{
        base: "full",
        lg: "full",
      }}
      direction={"column"}
    >
      <Heading pt="4" textAlign={"center"} mb="3">
        Tasks
      </Heading>

      <SimpleGrid mb={"6"} p="4" spacing={10} columns={2}>
        {result.length === 0 ? (
          <GridItem colSpan={2}>
            <Container fontSize={"lg"} w={"full"} centerContent>
              <Text my="2">Decide what you want🙇‍♂️ </Text>
              <Text>Add that and get started!💪</Text>
            </Container>
          </GridItem>
        ) : (
          <>
            {result.map((todo) =>
              todo.completeStatus ? (
                <></>
              ) : (
                <GridItem key={todo.id} colSpan={colSpan}>
                  <Todo
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    status={todo.status}
                    priority={todo.priority}
                    time={todo.time}
                    myColor={todo.myColor}
                    email={session && session.user.email}
                  />
                </GridItem>
              )
            )}
          </>
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default HeroSection;
