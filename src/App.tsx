import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, GridItem } from '@chakra-ui/react';

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
      headers: {accept: 'application/json'}
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

  return (
    <Grid>
      <h1>NFTs owned by {ethAddress}</h1>
      {nfts.map((nft: any) => (
        <GridItem key={nft.id}>
          <img src={nft.image_thumbnail_url} alt={nft.name} />
          <h2>{nft.name}</h2>
          <h2>{nft.description}</h2>
        </GridItem>
      ))}
    </Grid>
  );
}

export default App;