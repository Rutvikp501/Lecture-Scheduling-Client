import React from 'react'
import { Center, VStack,Avatar, useDisclosure, Heading, HStack, useColorModeValue } from '@chakra-ui/react'
import { Text,Box } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;

const InstructorList = () => {
  let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
  let Email = localStorageData.Email 
  const [data, setdata] = useState([])
  const params = { Email: Email}
  const getData = async() =>{
    try {
        let result = await axios.get(`${ REACT_APP_BACKENDAPI}course/instructor`,params)
        console.log(result);
        setdata(result.data)
    } catch (error) {
        console.log(error);
    }
  } 
useEffect(()=>{
    getData()
},[])


  return (
    <>
     {<Navbar />}
    <VStack >
      {
        data.length == 0?<h1>No Instructor to show</h1>:data.map((item)=>(
          <Center py={6}>
      <Box     boxShadow={'2xl'} rounded={'lg'}   p={6}   textAlign={'center'}>
        <Avatar size={'xl'} src={ 'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'  }
          mb={4}  pos={'relative'}    _after={{ content: '""', w: 4,h: 4, bg: 'green.300',border: '2px solid white',rounded: 'full',pos: 'absolute', bottom: 0,right: 3, }}/>
        <Heading fontSize={'2xl'} fontFamily={'body'}>        {item.Name}        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>        {item.Email}        </Text>
  
      </Box>
    </Center>
          // <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          //               <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />
          //               <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          //                 <Text fontWeight={600}>Name:&nbsp;&nbsp;{item.Name}</Text>
          //                 <Text color={'gray.500'} fontWeight={600}>Email:&nbsp;&nbsp;{item.Email}</Text>
          //                 {/* <Text color={'gray.500'}>{lecture.Date}</Text> */}
          //               </Stack>
          //             </Stack>
          
        ))
      }
      
    </VStack>
    </>
  )
}

export default InstructorList