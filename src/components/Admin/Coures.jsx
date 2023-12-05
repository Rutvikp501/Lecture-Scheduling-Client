import React from 'react'
import { Avatar, VStack, Heading, Card, Stack, CardBody, CardFooter, Image,Flex } from '@chakra-ui/react'
import { Text, } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import AddCouresbutton from '../AddCoures'
import Couresallocationbutton from './Couresallocation'
const REACT_APP_BACKENDAPI = process.env.REACT_APP_BACKENDAPI;

const CreateCoures = () => {
  let localStorageData = JSON.parse(localStorage.getItem('tok'));
  let Email = localStorageData.Email
 
  const [data, setdata] = useState([])
  const [date, setdate] = useState([])
  const params = { Email: Email }
  const getData = async () => {
    try {
      let result = await axios.get(`${REACT_APP_BACKENDAPI}course/`, params)
      console.log(result.data);
      setdata(result.data.AllCourse)
      setdate(result.data.todaydate)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      {<Navbar />}
        {<AddCouresbutton />}
        {
  data.length === 0 ? (
    <h1>No Courses to show</h1>
  ) : (
<Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>

//     <Flex wrap="wrap" justifyContent="center" > 
//       {data.map((item) => (
//         <Card direction={{ base: "column", sm: "row" }} variant="outline" key={item.id}  boxShadow={'2xl'} rounded={'lg'}   p={6}  margin={4} textAlign={'center'}>
//           {item?.CoverImg && (
//             <Image
//               objectFit="cover"
//               maxW={{ base: "100%", sm: "200px" }}
//               src={item?.CoverImg?.url}
//               alt="Course Image"
//             />
//           )}

//           <Stack>
//           <CardBody maxW={"800px"}>
//   <Heading size="md">{item?.Name}&nbsp;&nbsp;{item?.Level}</Heading>

//   {item?.Lectures?.length > 0 && (
//     <VStack spacing={4}>
//       {item?.Lectures?.filter((lecture) => lecture.Date >= date)
//         .map((lecture) => (
//           <Stack
//             mt={6}
//             direction="row"
//             spacing={4}
//             align="center"
//             key={lecture.id}
//           >
//             <Avatar src="https://avatars0.githubusercontent.com/u/1164541?v=4" />

//             <Stack direction="column" spacing={0} fontSize="sm">
//               <Text fontWeight={600}>{lecture.Date}</Text>
//             </Stack>
//           </Stack>
//         ))}
//     </VStack>
//   )}
// </CardBody>



//             <CardFooter>
//               <Couresallocationbutton w="50px" courseData={item} />
//             </CardFooter>
//           </Stack>
//         </Card>
//       ))}
//     </Flex>
  )}



    </>
  )
}

export default CreateCoures