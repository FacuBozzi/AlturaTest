import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  useDisclosure,
  useColorModeValue,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import alturaLogo from '../../assets/logo-svg.svg'
import ReadMeModal from '../Modals/ReadmeModal';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openRead, setOpenRead] = useState<boolean>(false);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW="1150px" mx="auto" >
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box><img src={alturaLogo} /></Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link onClick={() => setOpenRead(true)}>Read This</Link>
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4}>
          <Stack as={'nav'} spacing={4}>
            <Link onClick={() => setOpenRead(true)}>Read This</Link>
          </Stack>
        </Box>
      ) : null}

      {openRead ? (
        <ReadMeModal openRead={openRead} setOpenRead={setOpenRead}/>
      ) : null}
    </Box>
  );
};

export default Navbar;