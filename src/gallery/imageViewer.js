import React from "react";
import { Box } from "@chakra-ui/core";
import UserMaterial from "./userMAterial";
import FullImage from './fullImg'

function ImageViewer() {
  return (
    <Box w="50%">
      <FullImage/>
      <UserMaterial />
    </Box>
  );
}

export default ImageViewer;
