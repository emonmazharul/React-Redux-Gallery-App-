import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box, Button, useToast } from "@chakra-ui/core";
import { auth } from "./redux/firebaseMethods";
import loadUserInfo from "./redux/loadUserThunk";
import signInUser from "./redux/signInUserThunk";
import { signOutUser } from "./redux/userSlice";
import ImageUpload from "./imgUpload";

function UserMaterial() {
  const dispatch = useDispatch();
  const toast = useToast();
  React.useEffect(() => {
    dispatch(loadUserInfo());
  }, []);
  const { uid, isAuthenticated, displayName, photoURL } = useSelector(
    (state) => {
      return state.user;
    }
  );
  const handleSignIn = () => {
    dispatch(signInUser());
  };
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(signOutUser());
        setTimeout(() => {
          toast({
            title: "Signed out",
            description: "Signed out user",
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "top-right",
          });
        }, 100);
      })
      .catch(() => {
        toast({
          title: "Can't signed out user",
          description: "please try again",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      });
  };
  return (
    <Box>
      {isAuthenticated && uid && (
        <Flex justify="center">
          <Box w="80%" mt="2">
            <ImageUpload
              displayName={displayName}
              ownerPhoto={photoURL}
              uid={uid}
            />
          </Box>
        </Flex>
      )}
      <Flex justify="center">
        <Box w="80%" mt="2">
          <Button variantColor="blue" variant="solid" onClick={handleSignIn}>
            {isAuthenticated
              ? "Sign in with another account"
              : "Sign in with Google"}
          </Button>
        </Box>
      </Flex>
      {isAuthenticated && (
        <Flex justify="center">
          <Box mt="2" w="80%">
            <Button variantColor="red" variant="solid" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default UserMaterial;
