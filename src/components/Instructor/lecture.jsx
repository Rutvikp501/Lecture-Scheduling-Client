import React from 'react'
import { Flex, VStack,useToast, useDisclosure, Heading, HStack, Image } from '@chakra-ui/react'
import { Text,Box } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;

const Getlecture = () => {
  let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
  let Email = localStorageData.Email 
  const [data, setdata] = useState([])
  const params = { Email: Email}
  const getData = async() =>{
    try {
        let result = await axios.post(`${ REACT_APP_BACKENDAPI}course/instructorLecture`,params)
        //console.log(result.data);
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
    <VStack w={{base:'80%',md:'50%'}} m='auto' mt='7' spacing={'5'}>
      {
        data.length == 0?<h1>No Lecture's to show</h1>:data.map((item)=>(
          <Flex key={item._id} w='50%' border='1px' borderColor='gray.200' flexDirection={'column'} spacing={'1'} alignItems="left" p={'5'}>
            <Flex gap={'2rem'}>
          <Text>Date:&nbsp;&nbsp;{item.lectureDate}</Text>
          <Text>Coures:&nbsp;&nbsp;{item.courseName}</Text>
          </Flex>
        </Flex>
        ))
      }
      
    </VStack>
    </>
  )
}

export default Getlecture