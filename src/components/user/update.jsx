import React from 'react'
import { Flex,Modal,ModalCloseButton,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button, Input,  VStack,useToast, useDisclosure, Heading, HStack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Link, json } from 'react-router-dom';
import Navbar from '../navbar/Navbar'
import {useNavigate } from 'react-router-dom';
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;


const Update = () => {
  const navigate = useNavigate();
  let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
  let localStorageEmail = localStorageData.Email 

  const { isOpen: isaddOpen , onOpen: onaddOpen, onClose: onaddClose } = useDisclosure()
  const { isOpen: isupdateOpen , onOpen: onupdateOpen, onClose: onupdateClose } = useDisclosure()

  const initialRef = useRef(null)
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [updateID, setupdateID] = useState('')
  const [data, setdata] = useState([])
  const toast = useToast()
  const params = { Email : localStorageEmail}
  const getData = async() =>{
    try {
      
        let result = await axios.post(`${ REACT_APP_BACKENDAPI}user/`,params)
        setdata(result.data)
    } catch (error) {
        console.log(error);
    }
  }
  const handleUpdate = async()=>{
    //console.log(dataObj);
     const dataObj = {
        Name,Email
    }
    //console.log(dataObj);
    const config = {
        headers:{
          "Content-type":"application/json",
          "Authorization":localStorage.getItem("tok")
        }
    }
    try {
        let ans = await axios.patch(`${ REACT_APP_BACKENDAPI}user/update/${updateID}`,dataObj,config)
        toast({
            title: `Note Updated`,
            status: 'success',
            duration: 2000,
            isClosable: false,
          })
          onupdateClose()
          let updatedDataIndex = data.findIndex(item =>item._id == updateID)
          data[updatedDataIndex].Name = Name
          data[updatedDataIndex].Email = Email
    } catch (error) {
        toast({
            title: `Login first1`,
            description:`You don't have authorization`,
            status: 'success',
            duration: 2000,
            isClosable: false,
          })
        console.log(error);
    }
}
  const handleUpdateModal = (item)=>{
   // console.log(item);
      onupdateOpen()
    const {Name,Email,_id:id} = item
    setName(Name)
    setEmail(Email)
    setupdateID(id)
  }
  const handleDelete = async(id)=>{
    const config = {
        headers:{
          "Content-type":"application/json",
          "Authorization":localStorage.getItem("tok")
        }
    }
    try {
        let ans = await axios.delete(`${ REACT_APP_BACKENDAPI}user/delete/${id}`,config)
        toast({
            title: `User Deleted`,
            status: 'error',
            duration: 2000,
            isClosable: false,
          })
          let dataAfterDelete = data.filter((item)=>{
            return id != item._id
          })
          setdata(dataAfterDelete)
          navigate('/');
    } catch (error) {
        toast({
            title: `Login first2`,
            description:`You don't have authorization`,
            status: 'error',
            duration: 2000,
            isClosable: false,
          })
        console.log(error);
    }
  }
//   const handleSubmit = async() =>{
//     const dataObj = {
//         title,note,category
//     }
//     const config = {
//       headers:{
//         "Content-type":"application/json",
//         "Authorization":localStorage.getItem("tok")
//       }
//   }
//   try {
//     let ans = await axios.post(`${ REACT_APP_BACKENDAPI}note/create`,dataObj,config)
//     toast({
//       title: `Note created`,
//       status: 'success',
//       duration: 2000,
//       isClosable: false,
//     })
//     settitle('')
//     setcategory('')
//     setnote('')
//     setdata((prev)=>[...prev,ans.data])
//   } catch (error) {
//     toast({
//         title: `Login first3`,
//         status: 'error',
//         duration: 4000,
//         isClosable: false,
//       })
//     console.log(error);
//   }
//   onaddClose()
// }

useEffect(()=>{
    getData()
},[])
  return (
    <>
     {<Navbar />}
    
    <VStack w={{base:'80%',md:'50%'}} m='auto' mt='7' spacing={'5'}>
        
        <Modal
        initialFocusRef={initialRef}
        isOpen={isaddOpen}
        onClose={onaddClose}
      >
        <ModalOverlay />
        {/* <ModalContent w={{base:'90%',md:'100%'}}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection={'column'} gap={'2'}>
              <Text fontSize='md' >Title</Text>
              <Input  ref={initialRef} placeholder='Enter title' size='md' value={title} onChange={(e)=>settitle(e.target.value)} />
              <Text fontSize='md'>Notes</Text>
      <Input placeholder='Enter notes' size='md' value={note} onChange={(e)=>setnote(e.target.value)} />
      <Text fontSize='md'>Category</Text>
      <Input placeholder='Enter category' size='md' value={category} onChange={(e)=>setcategory(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={onaddClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent> */}
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isupdateOpen}
        onClose={onupdateClose}
      >
        <ModalOverlay />
        <ModalContent w={{base:'90%',md:'100%'}}>
          <ModalHeader>Update ME</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection={'column'} gap={'2'}>
              <Text fontSize='md' >Name</Text>
              <Input  ref={initialRef} placeholder='Enter title' size='md' value={Name} onChange={(e)=>setName(e.target.value)} />
              <Text fontSize='md'>Email</Text>
      <Input placeholder='Enter notes' size='md' value={Email} onChange={(e)=>setEmail(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleUpdate} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={onupdateClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {
        data.length == 0?<h1>No data</h1>:data.map((item)=>{
            return(
                <Flex key={item._id} w='100%' border='1px' borderColor='gray.200' flexDirection={'column'} spacing={'1'} alignItems="left" p={'5'}>
        <Heading fontSize='lg' >Name:  {item.Name}</Heading>
        <Text fontSize='lg' >Email:  {item.Email}</Text>
        <Text fontSize='lg' >Role:  {item.Role}</Text>
        <HStack mt='5' justify={'center'} gap='10%'>
          <Button colorScheme='yellow' onClick={()=>{handleUpdateModal(item)}}>Update</Button>
          {/* <Button colorScheme='red' onClick={()=>{handleDelete(item._id)}}>Delete</Button> */}
        </HStack>
        </Flex>
            )
        })
      }
      
    </VStack>
    </>
  )
}

export default Update

