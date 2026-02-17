export interface Product {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    description: string;
    category: string;
}

export interface TryOnRequest {
    user_image: string;
    garment_image: string;
    category: string;
    adjustment_params: {
        height: number;
        weight: number;
        preserve_identity: boolean;
    };
}

export interface TryOnResult {
    imageUrl: string;
    status: 'success' | 'error';
    message?: string;
}
