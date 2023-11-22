import React from 'react'
import { Text, Modal,ModalCloseButton,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button, Input,useToast, useDisclosure, 
  } from '@chakra-ui/react';

  import { useState,useEffect } from 'react'
import axios from 'axios'
import { useRef } from 'react'
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;

const Couresallocationbutton = () => {
const { isOpen: isaddOpen , onOpen: onaddOpen, onClose: onaddClose } = useDisclosure()
const { isOpen: isupdateOpen , onOpen: onupdateOpen, onClose: onupdateClose } = useDisclosure()

let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
let Email = localStorageData.Email 
const initialRef = useRef(null)
const [Level, setLevel] = useState('')
const [Description, setDescription] = useState('')
const [data, setdata] = useState([])
const toast = useToast()
  const getData = async() =>{
    try {
        let result = await axios.get(`${ REACT_APP_BACKENDAPI}course/couresallocation`,Email)
        console.log(result.data);
        setdata(result.data)
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    getData()
},[])
const handleSubmit = async() =>{

try {
  const dataObj = {

  }
  
  const config = {
    headers:{
      "Content-type":"application/json",
      "Authorization":localStorage.getItem("tok")
    }
  }
let ans = await axios.post(`${ REACT_APP_BACKENDAPI}Course/create`,dataObj,config )
toast({
  title: `Coures created`,
  status: 'success',
  duration: 2000,
  isClosable: false,
  
})
window.location.reload();
setDescription('')
setdata((prev)=>[...prev,ans.data])
} catch (error) {
toast({
    title: `Login first`,
    status: 'error',
    duration: 4000,
    isClosable: false,
  })
console.log(error);
}
onaddClose()
}

const handleSubmitModel = () =>{
  setDescription('')
  onaddOpen()
}

  return (
    <>
      <Button
               onClick={handleSubmitModel}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                allocate coures
              </Button>
              <Modal initialFocusRef={initialRef}isOpen={isaddOpen}onClose={onaddClose}>
        <ModalOverlay />
        <ModalContent w={{base:'90%',md:'100%'}}>
          <ModalHeader>Allocatr course to Instuctor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection={'column'} gap={'2'}>
             
      <Input placeholder='Enter notes' size='md' value={Level} onChange={(e)=>setLevel(e.target.value)} />
      <Text fontSize='md'>Description</Text>
      <Input placeholder='Enter category' size='md' value={Description} onChange={(e)=>setDescription(e.target.value)} />
       <Text fontSize='md'>CoverImg</Text>
       
      
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isupdateOpen}
        onClose={onupdateClose}
      ></Modal>
     
    </>
  )
}

export default Couresallocationbutton
