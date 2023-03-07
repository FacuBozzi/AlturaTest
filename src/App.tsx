import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, GridItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { NFT } from './types/types';
import { getFileFormat } from './utils/formatFunctions';
import ReactPlayer from 'react-player'
import Navbar from './components/Navbar';

function App() {
  const [nfts, setNfts] = useState([]);
  const ethAddress = '0x7292a63772E7939eF6cb3B94f997Be860Fb0754e'; // Replace with the Ethereum address you want to get NFTs for

  const getNfts = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.opensea.io/api/v1/assets',
      params: {
        owner: '0x7292a63772E7939eF6cb3B94f997Be860Fb0754e',
        order_direction: 'desc',
      },
      headers: { accept: 'application/json' }
    };

    axios
      .request(options)
      .then(function (response) {
        setNfts(response.data.assets);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getNfts().then(() => console.log("los nfts", nfts))
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState<NFT>();

  function handleNftClick(nft: any) {
    setSelectedNft(nft);
    onOpen();
  }

  function handlePurchaseClick() {
    if (!selectedNft) return;
    console.log("selectedNft", selectedNft);
    window.open(selectedNft.permalink, '_blank');
    onClose();
  }

  console.log("nft", nfts)

  return (
    <>
      <Navbar />
      <Container w='100%' maxWidth='990px' p={10}>
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          {nfts.map((nft: NFT, index) => (
            <GridItem key={index}>
              <Box
                onClick={() => handleNftClick(nft)}
                _hover={{ cursor: 'pointer' }}
              >
                <img src={nft.image_thumbnail_url} alt={nft.name} />
                <div>{nft.name}</div>
                {/* <div>{nft.description}</div> */}
              </Box>
            </GridItem>
          ))}
        </Grid>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedNft && selectedNft.name}</ModalHeader>
            <ModalBody>{selectedNft && (
              <>
                {/* if its a video it will render a video player instead of an img */}
                {getFileFormat(selectedNft.image_original_url) === '.mp4' || '.mov' ? (
                  <Box w='100%'>
                    <ReactPlayer
                      url={selectedNft.image_original_url}
                      muted={true}
                      loop={true}
                      playing={true}
                      volume={0.01}
                      controls={false}
                      width='100%'
                    />
                  </Box>
                ) : (
                  <img src={selectedNft?.image_original_url} alt={selectedNft?.name} />
                )}
                <Box mt="1" fontWeight="normal" as="h5" lineHeight="tight" isTruncated>
                  {selectedNft?.description}
                </Box>
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