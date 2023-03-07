import { Button, ListItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { ReadMeModalTypes } from '../../types/types'

const ReadMeModal = ({ openRead, setOpenRead }: ReadMeModalTypes) => {
    return (
        <Modal isOpen={openRead} onClose={() => setOpenRead(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Important</ModalHeader>
                <ModalBody>
                    <UnorderedList mb={5}>
                        <ListItem>
                            Made this Dapp to work on the ethereum mainnet chain using the free OpenSea API. This was the fastest and simplest way to get the Dapp to do this job. For this reason it's probably also more limited.
                        </ListItem>
                        <ListItem>
                            It can display both videos and images once the NFT is selected and the modal is displayed. You can only see an NFT thumbnail in the grid.
                        </ListItem>
                        <ListItem>
                            I used a minimalist approach due to the time limit and my job, while still keeping a clean, modern and elegant look.
                        </ListItem>
                        <ListItem>
                            Added clear comments to make the code very understandable.
                        </ListItem>
                        <ListItem>
                            Check out this account to see video-NFTs: 0x7292a63772E7939eF6cb3B94f997Be860Fb0754e
                        </ListItem>
                        <ListItem>
                            All the main logic is on 'App.tsx'.
                        </ListItem>
                    </UnorderedList>
                    Hope you enjoy it!
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setOpenRead(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReadMeModal