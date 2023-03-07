interface creator {
    address: string
}

export interface NFT {
    name: string;
    description: string;
    image_thumbnail_url: string;
    image_original_url: string;
    id: number;
    permalink: string;
    address: string;
    creator: creator;
    token_id: string;
    image_url: string;
}

export interface ReadMeModalTypes {
    openRead: boolean;
    setOpenRead: Function;
}

export interface EthereumFormProps {
    setEthAddress: (address: string) => void;
}