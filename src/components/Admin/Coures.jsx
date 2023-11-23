import React from 'react'
import { Flex,Modal,ModalCloseButton,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button, Input,  VStack,useToast, useDisclosure, Heading, HStack, Image } from '@chakra-ui/react'
import { Text,Box } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import AddCouresbutton from '../AddCoures'
import Couresallocationbutton from './Couresallocation'
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;

const CreateCoures = () => {
  let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
  let Email = localStorageData.Email 

  const [data, setdata] = useState([])
  const params = { Email: Email}
  const getData = async() =>{
    try {
        let result = await axios.get(`${ REACT_APP_BACKENDAPI}course/`,params)
        console.log(result.data);
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
      {<AddCouresbutton />}  
      {
        data.length == 0?<h1>No Coures to show</h1>:data.map((item)=>(
          <Flex key={item?._id} w='100%' border='1px' borderColor='gray.200' flexDirection={'column'} spacing={'1'} alignItems="left" p={'5'}>
          <Text gap={'2rem'}>Name:&nbsp;&nbsp;{item?.Name}</Text>
          <Text gap={'2rem'}>Level:&nbsp;&nbsp;{item?.Level}</Text>
          {
            item?.Lectures?.length> 0 && item?.Lectures?.map((lecture)=>(
              <Flex gap={'2rem'}>
                 <Text>Date:</Text>
                <Text>{lecture.Date}</Text>
                <Text>Instructor:</Text>
                <Text>{lecture.Instructor}</Text>
              </Flex>
            ))
          }
          {
            item?.CoverImg && <Image w="100px" src={item?.CoverImg?.url} />
          }
          
      <Couresallocationbutton courseData={item}  />
        </Flex>
        ))
      }
      
    </VStack>
    </>
  )
}

export default CreateCoures