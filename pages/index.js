import { Container, Divider, Flex } from "@chakra-ui/react";

import AddButton from "../components/AddButton";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CompletedTasks from "../components/CompletedTasks";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container mt="5" centerContent>
        <AddButton />
      </Container>
      <Divider mt="8" mb="2" />
      <Flex direction={{ base: "column", lg: "row" }}>
        <HeroSection />
        <CompletedTasks />
      </Flex>
      <Footer />
    </>
  );
}
