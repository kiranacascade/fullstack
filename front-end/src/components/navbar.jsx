import { Button, Flex, VStack, Avatar, Menu, MenuButton, Portal, MenuList, MenuItem, Box, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// importan redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

export const Navbar = () => {
  const { firstName } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const signOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      <VStack justify="space-evenly" align="flex-end" shadow="base" bgColor="gray.50" w="100vw" h="16">
        <Flex justify="space-evenly">
          {token ? (
            <>
              <Avatar size="md" src="https://bit.ly/broken-link" mr="3" />
              <Menu>
                <MenuButton as={Button} mt="1" mr="6">
                  Hi, {firstName}
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                mr="2"
              >
                Login
              </Button>
              <Button mr="2" rounded={"full"} onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};
