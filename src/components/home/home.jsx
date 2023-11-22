import {
    Stack,
    Text,
    useBreakpointValue,
    Flex,Button,  Heading, 
  } from '@chakra-ui/react';
  import Navbar from '../navbar/Navbar';
  import { Link } from 'react-router-dom';

import AddCouresbutton from "../AddCoures"



  export default function Home() {

    return (
        <>
        {<Navbar />}
        
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                Book Coures
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}> 
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              The project board is an exclusive resource for contract work. It's
              perfect for freelancers, agencies, and moonlighters.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            {/* {<AddCouresbutton />}
             
              <Button as={Link} to="/coures"  rounded={'full'}>How It Works</Button> */}
            </Stack>
          </Stack>
        </Flex>
        {/* <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={logo}          />
        </Flex> */}
      </Stack>
      </>
    );
  }