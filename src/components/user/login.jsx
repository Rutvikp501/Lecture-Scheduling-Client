import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import { useState } from 'react';
import axios from 'axios';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {useNavigate } from 'react-router-dom';
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const toast = useToast();
  const [Password, setpassword] = useState('');
  const handleLogin = async () => {
    const data = {
      Email,
      Password,
    };
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    
    try {
      await axios
        .post(`${ REACT_APP_BACKENDAPI}user/login`, data, config)
        .then((res) => {
          //console.log(res);
          var token = res.data;
          localStorage.setItem("tok", JSON.stringify(token));
          if (res.data.status !=="failed"){
          setpassword('');
          setEmail('');
          toast({
            title: `Login successfully`,
            status: 'success',
            duration: 2000,
            isClosable: false,
          });
          navigate('/home');
        }else{
          toast({
            title: res.data.message,
            status: 'error',
            duration: 4000,
            position: 'top',
            isClosable: true,
          });
          }
        })
        .catch((err) => {
          
          
        });
    } catch (error) {
      console.log(error, 'wrong pass');
    }
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email ID</FormLabel>
              <Input type="email" value={Email} onChange={(e)=>setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} value={Password} onChange={(e)=>setpassword(e.target.value)}/>
              <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }}align={'start'}justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link href='/register' color={'blue.400'}>Sign Up</Link>
              </Stack>
              <Button bg={'blue.400'}color={'white'}_hover={{ bg: 'blue.500' }} onClick={handleLogin}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;

