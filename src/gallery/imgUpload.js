import React from "react";
import {
  Box,
  Button,
  useToast,
  Progress,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Input,
} from "@chakra-ui/core";
import { storage, db, serverTimestamp } from "./redux/firebaseMethods";

function ImageUpload({ displayName, ownerPhoto, uid }) {
  const btnRef = React.useRef();
  const [isDisabled, changeState] = React.useState(true);
  const [uploadProgress, setProgress] = React.useState(0);
  const [isOpen, setOpen] = React.useState(false);
  const toast = useToast();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  
  const handleImageType = (e) => {
    const fileType = e.target.files[0].type;
    if (fileType.includes("image")) {
      changeState(false);
      return;
    }
    changeState(true);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.elements.file.files[0];
    const metadata = {
      contentType: file.type,
    };
    const storageRef = storage.ref();
    const imageRef = storageRef.child(file.name);
    const uploadTask = imageRef.put(file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) {
          setProgress(0);
          toast({
            title: "Congrats!!",
            description: "Image has uploaded successfully",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "bottom-right",
          });
          return;
        }
        setProgress(progress);
        changeState(true);
      },
      () => {
        toast({
          title: "Failed!!",
          description: "Failed to upload your image",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom-right",
        });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          const imageCollection = db.collection("images");
          imageCollection
            .add({
              owner: displayName,
              ownerPhoto,
              photoURL: url,
              uid,
              createdAt: serverTimestamp(),
            })
            .then(() => {
              toast({
                title: "Success",
                description: "save the new images data in db",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "bottom-right",
              });
            })
            .catch(() => {
              toast({
                title: "Failed!!",
                description: "Can't save the new image data in db",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "bottom-right",
              });
            });
        });
      }
    );
  };
  return (
    <React.Fragment>
      <Button ref={btnRef} variantColor="teal" variant="solid" onClick={onOpen}>
        Upload Image
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Welcome {displayName} </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleUpload}>
              <Input
                type="file"
                name="file"
                placeholder="Type here..."
                onChange={handleImageType}
              />
              {uploadProgress > 0 && (
                <Box mt="2">
                  <Progress hasStripe value={uploadProgress} />
                </Box>
              )}
              <Button
                mt="2"
                type="submit"
                disabled={isDisabled}
                variantColor="teal"
                variant="solid"
              >
                Upload
              </Button>
            </form>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export default ImageUpload;
