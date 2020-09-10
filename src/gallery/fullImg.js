import React from 'react'
import { Box, Image, Flex } from "@chakra-ui/core";
import { useSelector,useDispatch } from "react-redux";
import Card from './card'
import {setShowcaseImageInfo} from './redux/imageSlice';
import FakeImage from './placeholderImg';

function FullImage() {
  const imgRef = React.useRef();
  const dispatch = useDispatch();
  const {showcaseImage} = useSelector(state => state.imageInfo);
  let timer;
  React.useEffect(() => {
    timer = setInterval(() => {
      const width = getComputedStyle(imgRef.current).width;
      const isComplete = imgRef.current.complete;
      if(isComplete){
        if(width == '0px'){
          dispatch(setShowcaseImageInfo({width:'0px',display:'none'}))
          return;
        }
        dispatch(setShowcaseImageInfo({width,display:''}))
        clearInterval(timer);
      }
    },1000)
  },[showcaseImage])
  
  return (
    <Flex justify="center">
      <Box width="80%" mt="2">
        {
          showcaseImage && 
          <React.Fragment>
            <Image 
              ref={imgRef} 
              src={showcaseImage} 
              d="block" 
              maxW="100%" 
              maxH="450px" 
            />
            <Card />
          </React.Fragment>
        }
        {
          !showcaseImage && <FakeImage id={imgRef}/>
        }
      </Box>
    </Flex>
  );
}

export default FullImage;