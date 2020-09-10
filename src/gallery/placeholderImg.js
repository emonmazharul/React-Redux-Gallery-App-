import React from 'react';
import {Image} from '@chakra-ui/core';

function FakeImage({id}){
  return (
    <Image
    	ref={id}
      src="https://via.placeholder.com/500x600?text=Loading..."
      d="block"
      maxW="100%"
      maxH="450px"
    />
  );
}

export default FakeImage;