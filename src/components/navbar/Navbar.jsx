import { ReactNode,setState } from 'react';
import {
  Image ,
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon,SettingsIcon ,DeleteIcon ,MoonIcon, SunIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom'
import logo from '../../assets/img/logo.jpg'
const Links = [
{ text: 'Dashboard', url: '/home' },
{ text: 'Instructor', url: '/Instructor' },
{ text: ' Coures ', url: '/coures' },];
export default function Navbar() {
  
  let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
  let Role = localStorageData.Role 
  let updatedLinks = Links;

if (Role === "Instructor") {
  updatedLinks = [{ text: 'Dashboard', url: '/home' },{ text: 'Lecture', url: '/lecture' }];
}
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ md: 'none' }}
            onClick={isOpen ?()=>onClose():()=>onOpen()}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Image src={logo} alt="Image description" width="40px" /></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {updatedLinks.map((link) => (
                <Link to={link.url}>
                {link.text}</Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} leftIcon={<DeleteIcon />}>
              <Link to="/">Logout</Link>
            </Button>
            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton >
              <MenuList>
                <MenuItem><Link to='/update'><Button  colorScheme={'teal'} size={'sm'}  leftIcon={<SettingsIcon />}/></Link></MenuItem>
                <MenuItem> 
              <Link to="/"><Button variant={'solid'} colorScheme={'teal'} size={'sm'}  leftIcon={<DeleteIcon />}/></Link>
          </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {updatedLinks.map((link) => (
                <Link key={link} to={link.url}>{link.text}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}

