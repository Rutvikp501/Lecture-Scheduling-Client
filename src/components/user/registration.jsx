import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Link,
  Select
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;
export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Role, setRole] = useState('Instructor')
  const toast = useToast()
  const [Password, setpassword] = useState('')
  const [AdminCode, setAdminCode] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAdminCodeChange = (event) => {
    setAdminCode(event.target.value);
  };
  const handleSubmit = async () => {
    //alert();
    const data = {
      Role, Name, Email, Password,AdminCode
    }
    console.log(data);
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    try {
      await axios.post(`${ REACT_APP_BACKENDAPI}user/register`, data, config)
      .then((res)=>{
        //console.log(res);
        var resp = res.data
        if (resp.status==="failed"){
        toast({
          title: resp.message,
          status: 'error',
          duration: 2000,
          isClosable: false,
        });
      }else{
        setpassword('');
        setRole('');
        setName('');
        setEmail('');
        toast({
          title: "User Registered Successfully",
          status: 'success',
          duration: 2000,
          isClosable: false,});
          navigate('/');
      }       
      })      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          {/* <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Role</FormLabel>
                  <Input type="text" onChange={(e) => setRole(e.target.value)} />
                </FormControl>
              </Box>
            </HStack> */}
            <HStack>
      <Box>
        <FormControl id="firstName" isRequired>
          <FormLabel>Role</FormLabel>
          <Select onChange={handleRoleChange} defaultValue="Instructor">
            <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option>
          </Select>
        </FormControl>

        {Role === 'Admin' && (
          <FormControl id="adminCode" isRequired>
            <FormLabel>Admin Code</FormLabel>
            <Input
              type="text"
              onChange={handleAdminCodeChange}
            />
          </FormControl>
        )}
      </Box>
    </HStack>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" onChange={(e) => setName(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>
            
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setpassword(e.target.value)} />
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={handleSubmit}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} href='/'>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
