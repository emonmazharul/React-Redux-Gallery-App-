import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Image, Box, useToast } from "@chakra-ui/core";
import { getShowcaseImage, getAllImages,setShowcaseImageInfo } from "./redux/imageSlice";
import { db } from "./redux/firebaseMethods";

function Gallery() {
  const toast = useToast();
  const { images } = useSelector((state) => state.imageInfo);
  const dispatch = useDispatch();
  React.useEffect(() => {
    //giving message to user;
    toast({
      title: "Info",
      description: "To view an image just click on it",
      status: "info",
      duration: 6000,
      isClosable: true,
      position: "bottom-right",
    });
    // getting snaphsot 
    const imageCollection = db.collection("images");
    imageCollection.orderBy("createdAt", "desc").onSnapshot(
      (snapshot) => {
        const clone = [];
        snapshot.forEach((doc) => {
          if (doc.data().photoURL) {
            clone.push({ id: doc.id, ...doc.data() });
          }
        });
        dispatch(getAllImages({ images: clone }));
        const photoURL = clone[0]
          ? clone[0].photoURL
          : "https://via.placeholder.com/500x600?text=Failed to load image";
        dispatch(getShowcaseImage({ photoURL }));
        dispatch(setShowcaseImageInfo({
          imgOwner:clone[0] ? clone[0].owner : 'John Doe',
          ownerPhoto:clone[0] ? clone[0].ownerPhoto: '',
        }))
      },
      () => {
        toast({
          title: "Error",
          description: "Can't fetching images properly.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      }
    );
  }, []);
  const handleShowCaseImage = (e) => {
    const photoURL = e.target.src;
    const {owner:imgOwner,ownerphoto:ownerPhoto} = e.target.dataset;
    dispatch(getShowcaseImage({ photoURL }));
    dispatch(setShowcaseImageInfo({imgOwner,ownerPhoto}))
  };

  return (
    <Box w="50%" h="100vh" overflow="auto">
      <Flex wrap="wrap">
        {images.map((img) => (
          <Box key={img.id} w="33.33%" h="250px">
            <Image
              src={img.photoURL}
              w="100%"
              h="100%"
              objectFit="cover"
              data-owner={img.owner}
              data-ownerphoto={img.ownerPhoto}
              onClick={handleShowCaseImage}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default Gallery;
