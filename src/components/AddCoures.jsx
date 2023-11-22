import React from 'react'
import { Text, Modal,ModalCloseButton,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button, Input,useToast, useDisclosure, 
  } from '@chakra-ui/react';

  import { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;

function AddCouresbutton() {
const { isOpen: isaddOpen , onOpen: onaddOpen, onClose: onaddClose } = useDisclosure()
const { isOpen: isupdateOpen , onOpen: onupdateOpen, onClose: onupdateClose } = useDisclosure()

let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
let localStorageEmail = localStorageData.Email 
const initialRef = useRef(null)
const [CName, setCName] = useState('')
const [Level, setLevel] = useState('')
const [Description, setDescription] = useState('')
const [CoverImg, setCoverImg] = useState('')  
const [data, setdata] = useState([])
const toast = useToast()  
const handleFileInputChange = (event) => {
  const file = event.target.files[0];
  transformFile(file)
};
const transformFile = (file) =>{
  const reader = new FileReader()
  if(file){
      reader.readAsDataURL(file)
      reader.onloadend = () =>{
          setCoverImg(reader.result)
      }
  }else{
      setCoverImg('')
  }
}

const handleSubmit = async() =>{

try {
  const dataObj = {
    Name:CName,Level,Description,CoverImg,
  }
  console.log(dataObj);
  
  
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
setCName('')
setLevel('')
setDescription('')
setCoverImg('')
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
  setCName('')
  setLevel('')
  setDescription('')
  setCoverImg('')
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
                Create Coures 
              </Button>
              <Modal initialFocusRef={initialRef}isOpen={isaddOpen}onClose={onaddClose}>
        <ModalOverlay />
        <ModalContent w={{base:'90%',md:'100%'}}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection={'column'} gap={'2'}>
              <Text fontSize='md' >Name</Text>
              <Input  ref={initialRef} placeholder='Enter title' size='md' value={CName} onChange={(e)=>setCName(e.target.value)} />
              <Text fontSize='md'>Level</Text>
      <Input placeholder='Enter notes' size='md' value={Level} onChange={(e)=>setLevel(e.target.value)} />
      <Text fontSize='md'>Description</Text>
      <Input placeholder='Enter category' size='md' value={Description} onChange={(e)=>setDescription(e.target.value)} />
       <Text fontSize='md'>CoverImg</Text>
       <Input
  placeholder="Enter notes"
  type="file"
  accept=".jpg,.png"
  onChange={handleFileInputChange}
/>
      
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={onaddClose}>Cancel</Button>
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

export default AddCouresbutton
