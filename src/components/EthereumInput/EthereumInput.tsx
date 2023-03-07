import { useState } from "react";
import { Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { EthereumFormProps } from "../../types/types";

const EthereumForm = ({ setEthAddress }: EthereumFormProps) => {
    const [address, setAddress] = useState("");
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setEthAddress(address);
    }

    return (
        <Container w='100%' maxWidth='990px' p={10}>
            <form onSubmit={handleSubmit}>
                <FormControl id="address" isRequired>
                    <FormLabel>Ethereum address you need NFTs from</FormLabel>
                    <Input
                        type="text"
                        placeholder="0x..."
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        isInvalid={address.length > 0 && !isValidAddress}
                    />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit" isDisabled={!isValidAddress}>
                    Check NFTs
                </Button>
            </form>
        </Container>
    );
}

export default EthereumForm;