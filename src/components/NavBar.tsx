import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer() // is not ssr
  });

  let body = null

  if (fetching){
    body = null
  } else if (!data?.me){
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex>
        <Box textTransform="capitalize" color="white" mr={2}>{data.me.username}</Box>
        <Button isLoading={logoutFetching} onClick={() => logout()} variant='link'>Logout</Button>
      </Flex>
    )
  }

  return (
    <Flex bg="tomato" p={4} >
      <Box ml={"auto"}>
        {body}
      </Box>
    </Flex>

  );
}