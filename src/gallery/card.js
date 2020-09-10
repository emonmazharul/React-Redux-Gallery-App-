import React from 'react'
import {Text,Box,Avatar,Flex} from '@chakra-ui/core'
import {useSelector} from 'react-redux';
function Card(){
  const {showcaseImageInfo} = useSelector(state => state.imageInfo);
  const {width,display,imgOwner,ownerPhoto} = showcaseImageInfo; 
	return (
		<Box bg="#e7f0f3" w={width} display={display}>
			<Flex justify="space-around">
			<Text mt="6" mb="2" color="#1a1a1d" fontSize="xl" display="inline">By: {imgOwner}</Text>
			<Avatar mt="2" mb="2" size="lg" name="Mazharul" name={imgOwner} src={ownerPhoto}/>
			</Flex>
		</Box>
	);
}

export default Card;