// src/types.ts

// Since the Swagger spec wasn't highly specific, these types are inferred
// from the actual payloads and typical requirements.

export interface Pet {
    id: number;
    name: string;
    commonName: string;
    description: string;
    location: string;
    food: string;
    diet: string;
    weight: string;
    // Add other fields as discovered (e.g., origin, habitat, facts array)
}

export interface Feedback {
    id: number;
    name: string;
    city: string;
    month: string;
    year: string;
    text: string;
    profile_picture?: string;
}

export interface Camera {
    id: number;
    petId: number;
    text: string;
    url?: string;
}

export interface AuthResponse {
    token: string;
}

export interface UserProfile {
    id: number;
    login: string;
    name: string;
    email: string;
}

export interface DonationPayload {
    name: string;
    email: string;
    amount: number;
    petId: number;
}
