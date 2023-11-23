import React from 'react'
import { Text, Modal,ModalCloseButton,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button, Input,useToast, useDisclosure, Select, 
  } from '@chakra-ui/react';

import { useState,useEffect } from 'react'
import axios from 'axios'
import { useRef } from 'react'
const REACT_APP_BACKENDAPI=process.env.REACT_APP_BACKENDAPI;

const Couresallocationbutton = ({courseData}) => {
const { isOpen: isaddOpen , onOpen: onaddOpen, onClose: onaddClose } = useDisclosure()
const { isOpen: isupdateOpen , onOpen: onupdateOpen, onClose: onupdateClose } = useDisclosure()

let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
let Email = localStorageData.Email 
const initialRef = useRef(null)
const [Level, setLevel] = useState('')
const [Description, setDescription] = useState('')
const [data, setdata] = useState([])
const [instructorDetails, setinstructorDetails] = useState([])
const [selectInstructor, setselectInstructor] = useState(null)
const [selectDate, setselectDate] = useState(null)
const toast = useToast()
  const getData = async() =>{
    try {
        let result = await axios.get(`${ REACT_APP_BACKENDAPI}course/instructor`,Email)
        setinstructorDetails(result.data)
        // setdata(result.data)
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    getData()
},[])
const handleSubmit = async() =>{
console.log(selectInstructor,courseData?._id,selectDate);
try {
  const dataObj = {
    Instructor :selectInstructor,
    Course :courseData?._id,
    Date : selectDate
  }
  
  const config = {
    headers:{
      "Content-type":"application/json",
      "Authorization":localStorage.getItem("tok")
    }
  }
let ans = await axios.post(`${ REACT_APP_BACKENDAPI}Course/coursealocate`,dataObj,config )
console.log(ans);
toast({
  title: `Coures Alocates`,
  status: 'success',
  duration: 2000,
  isClosable: false,
  
})
window.location.reload();
setDescription('')
// setdata((prev)=>[...prev,ans.data])
} catch (error) {
    console.log(error);
toast({
    title: `${error?.response?.data}`,
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
      <input style={{cursor:'pointer',padding:'0.5rem',background:'none',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px'}} type='date' onChange={(e)=>setselectDate(e.target.value)} />
      {instructorDetails.length>0 && <Select onChange={(e)=>setselectInstructor(e.target.value)} placeholder='Select Instructor'>
        {
            instructorDetails.length>0 && instructorDetails?.map((instructor)=>(
                <option value={instructor?._id}>{instructor?.Name}</option>
            ))
        }
      </Select>}
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
