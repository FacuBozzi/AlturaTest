import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Box, Button, Container, Flex, Grid, GridItem, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useColorModeValue, Spinner } from '@chakra-ui/react';
import { NFT } from './types/types';
import { formatAddress, getFileFormat, trimText } from './utils/formatFunctions';
import ReactPlayer from 'react-player'
import EthereumForm from './components/EthereumInput/EthereumInput';

function App() {
  const [nfts, setNfts] = useState([]);
  const [ethAddress, setEthAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState<NFT>();

  //gets the NFTs from the opensea API
  const getNfts = async () => {
    if (!ethAddress) return;
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://api.opensea.io/api/v1/assets',
      params: {
        owner: ethAddress,
        order_direction: 'desc',
      },
      headers: { accept: 'application/json' }
    };
    console.log(options)
    axios
      .request(options)
      .then(function (response) {
        setNfts(response.data.assets);
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false)
      });
  };

  useEffect(() => {
    getNfts().then(() => console.log("The NFTs", nfts))
  }, [ethAddress])

  function handleNftClick(nft: NFT) {
    setSelectedNft(nft);
    onOpen();
  }

  function handlePurchaseClick() {
    if (!selectedNft) return;
    window.open(selectedNft.permalink, '_blank');
    onClose();
  }

  //first page (user inputs an ETH address for retrieving its NFTs)
  if (ethAddress == '') {
    return (
      <>
        <EthereumForm setEthAddress={setEthAddress} />
      </>
    )
  }

  // Spinner component when the Dapp is loading
  if (loading) return (
    <Spinner display='flex' mx='auto' mt={150}/>
  )

  return (
    <>
      <Container display='flex' flexDirection='column' alignItems='center' w='100%' maxWidth='990px' p={10}>

        {/* If there are no NFTs in the ETH account, let the user know */}
        {nfts.length === 0 &&
          <>
            <Text mt={10} fontWeight={600} fontSize={'xl'} mb={5}>No NFTs found for this account.</Text>
            <Button onClick={() => setEthAddress('')} width='300px'>Go Back</Button>
          </>
        }

        {/* mapping of every NFT gotten from the ETH account. Displayed as a grid */}
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          {nfts.map((nft: NFT, index) => (
            <>
              <GridItem key={index}>
                <Box
                  // maxW={'sm'}
                  w={'full'}
                  bg='white'
                  onClick={() => handleNftClick(nft)}
                  boxShadow={'2xl'}
                  rounded={'md'}
                  p={6}
                  transition="transform 0.2s ease-in-out"
                  _hover={{ cursor: 'pointer', transform: "scale(1.05)" }}
                  textAlign={'center'}
                >
                  <Image src={nft.image_thumbnail_url} alt={nft.name} mb={4} />

                  <Text fontWeight={600} fontSize={'xl'} mb={2}>
                    {nft.name}
                  </Text>

                  <Flex display="flex" flexDirection="column" alignItems="center">
                    <Badge colorScheme={'green'} mb={1}>{`ID: ${nft.id}`}</Badge>
                    <Badge colorScheme={'purple'}>{`Creator: ${formatAddress(nft.creator.address)}`}</Badge>
                  </Flex>
                </Box>
              </GridItem>
            </>
          ))}
        </Grid>

        {/* A 'Go Back' button for going back to input an ETH address */}
        {nfts.length > 0 && <Button mt={35} color='white' bgColor='grey' onClick={() => setEthAddress('')} width='100px'>Go Back</Button>}  

        {/* Modal with description and NFT details */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedNft && selectedNft.name}</ModalHeader>
            <ModalBody>{selectedNft && (
              <>
                {/* if its a video it will render a video player instead of an img */}
                {console.log((selectedNft?.image_original_url))}
                {getFileFormat(selectedNft?.image_original_url) === ('.mp4' || '.mov') ? (
                  <Box w='100%'>
                    <ReactPlayer
                      url={selectedNft?.image_original_url}
                      muted={true}
                      loop={true}
                      playing={true}
                      volume={0.01}
                      controls={false}
                      width='100%'
                      />
                  </Box>
                ) : (
                  <>
                  <Image src={selectedNft?.image_url} alt={selectedNft?.name} />
                  </>
                )}
                <Flex mt={3} display="flex" flexDirection="column" alignItems="center">
                  <Badge 
                    _hover={{ cursor: 'pointer'}} 
                    onClick={handlePurchaseClick} 
                    colorScheme={'blue'} 
                    mb={1}
                  >
                    Description: {selectedNft.description ? trimText(selectedNft.description, 45) : 'Not Available'}
                  </Badge>
                  <Badge 
                    _hover={{ cursor: 'pointer'}} 
                    onClick={() => window.open(`https://opensea.io/${selectedNft?.creator?.address}`, '_blank')} 
                    colorScheme={'purple'} 
                    mb={1}
                  >
                    Creator: {selectedNft.creator.address ? selectedNft.creator.address : 'Not Available'}
                  </Badge>
                  <Badge 
                    _hover={{ cursor: 'pointer'}} 
                    onClick={handlePurchaseClick} 
                    colorScheme={'green'}
                  >
                    Token ID: {selectedNft.token_id ? selectedNft.token_id : 'Not Available'}
                  </Badge>
                </Flex>
              </>
            )}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handlePurchaseClick}>
                Purchase on OpenSea
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}

export default App;