import React from 'react'
import { Flex, VStack,useToast, useDisclosure, Heading, HStack, Image } from '@chakra-ui/react'
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
    <VStack w={{base:'80%',md:'50%'}} m='auto' mt='7' spacing={'5'}>
      {
        data.length == 0?<h1>No Instructor to show</h1>:data.map((item)=>(
          <Flex key={item._id} w='100%' border='1px' borderColor='gray.200' flexDirection={'column'} spacing={'1'} alignItems="left" p={'5'}>
          <Text>Name:&nbsp;&nbsp;{item.Name}</Text>
          <Text>Email:&nbsp;&nbsp;{item.Email}</Text>
          {/* {
            item?.CoverImg && <Image src={item.CoverImg.url} />
          } */}
        </Flex>
        ))
      }
      
    </VStack>
    </>
  )
}

export default InstructorList