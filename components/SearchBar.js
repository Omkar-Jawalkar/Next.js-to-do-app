import {
  VStack,
  Input,
  Heading,
  Code,
  Box,
  Text,
  Divider,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  HStack,
  LightMode,
  useDisclosure,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import React, { useState } from "react";

const SearchBar = ({ placeholder }) => {
  const todoData = useSelector((state) => state.todoData.value);
  const result = todoData.filter((todo) => todo.completeStatus !== true);
  const {
    isOpen: isShowOpen,
    onOpen: onShowOpen,
    onClose: onShowClose,
  } = useDisclosure();

  const [priorityColor, setPriorityColor] = useState("red");
  const statusColor = useColorModeValue("gray.700", "gray.700");
  const statusbg = useColorModeValue("yellow.400", "yellow.400");
  const [filterData, setFilterData] = useState([]);
  return (
    <VStack alignItems={"start"} justifyContent={"start"} spacing="0px">
      <Input
        id="inputSearchBar"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        mr="0px"
        // borderRightRadius={0}
        placeholder={placeholder}
        sx={{
          _placeholder: { color: "white" },
          _active: {
            outline: "none",
          },
        }}
        type="search"
        onChange={(e) => {
          const keyword = e.target.value;
          if (keyword !== "") {
            const results = result.filter((data) =>
              data.title.toLowerCase().includes(keyword.toLowerCase())
            );
            setFilterData(results);
          } else {
            setFilterData([]);
          }
        }}
      />
      <Box
        id="searchBar"
        float={"left"}
        overflowY={"auto"}
        maxH={"200px"}
        textColor={"black"}
        w={"full"}
        sx={{
          zIndex: 2,
        }}
        bg="whiteAlpha.900"
        borderRadius="lg"
      >
        {filterData.map((item) => (
          <Box
            key={item.id}
            h={"50px"}
            justifyContent="center"
            alignItems="center"
            borderBottom={"1px"}
            p="2"
            sx={{
              _hover: {
                bg: "gray.200",
                cursor: "pointer",
              },
            }}
            hidden={filterData.length === 0 ? true : false}
            onClick={() => {
              const searchID = document.getElementById("searchBar");
              searchID.style.display = "none";
              const inputID = document.getElementById("inputSearchBar");
              inputID.value = "";
              onShowOpen();
            }}
          >
            <Text px={"4"} fontSize="lg">
              {" "}
              {item.title}
            </Text>

            <Modal
              isCentered
              isOpen={isShowOpen}
              onClose={() => {
                const searchID = document.getElementById("searchBar");
                searchID.style.display = "block";
                onShowClose();
                setFilterData([]);
              }}
            >
              <ModalOverlay />

              <ModalContent
                sx={{
                  zIndex: 10,
                }}
                sx={{ wordBreak: "breakWord" }}
                color={"gray.900"}
                bg={item.myColor}
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
                    <Heading>{item.title}</Heading>{" "}
                    <Box m="0">
                      <LightMode>
                        <Badge mx={"1"} colorScheme={priorityColor}>
                          {item.priority}
                        </Badge>
                      </LightMode>
                    </Box>
                  </HStack>
                </ModalHeader>

                <ModalCloseButton />
                <ModalBody>
                  <Text fontSize={"lg"}>{item.description}</Text>
                </ModalBody>

                <ModalFooter>
                  <Code color={statusColor} fontSize={"lg"} bg={statusbg}>
                    Status : {item.status}
                  </Code>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};

export default SearchBar;
