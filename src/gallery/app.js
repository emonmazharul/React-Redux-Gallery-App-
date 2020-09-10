import React from "react";
import { ThemeProvider, CSSReset, Flex } from "@chakra-ui/core";
import ImageViewer from "./imageViewer";
import Gallery from "./gallery";

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Flex>
     		<Gallery />
      	<ImageViewer />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
