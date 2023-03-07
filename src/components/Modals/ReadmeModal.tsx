import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { ReadMeModalTypes } from '../../types/types'

const ReadMeModal = ({openRead, setOpenRead}: ReadMeModalTypes) => {
    return (
        <Modal isOpen={openRead} onClose={() => setOpenRead(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Important</ModalHeader>
                <ModalBody>
                    Test
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