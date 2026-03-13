import { Pet, Feedback, Camera, DonationPayload } from './types';

const BASE_URL = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

const fallbackPets = [
    { id: 1, name: "Lucas", commonName: "Giant Panda", description: "Native to central China, giant pandas have come to symbolize vulnerable species." },
    { id: 2, name: "Andy", commonName: "Madagascarian Lemur", description: "Lemurs are considered the world's most endangered group of mammals." },
    { id: 3, name: "Glen", commonName: "Gorilla in Congo", description: "Variety of snacks very important for the healthy life of gorillas and his plenty of babies." },
    { id: 4, name: "Mike", commonName: "Chinese Alligator", description: "From nose to tail, belly to back, hard scales protect this petite alligator." }
];

const fallbackCameras = [
    { id: 1, petId: 1, text: "Watch live from China's Panda Center" },
    { id: 4, petId: 2, text: "The ring-tailed lemurs play in Madagascar, Lemuria Land" },
    { id: 3, petId: 3, text: "Livestream from Gorilla Forest Corridor habitat cam" },
    { id: 5, petId: 4, text: "Watch Mike the Chinese Alligator in his protected habitat" }
];

async function apiFetch<T>(endpoint: string, options: RequestInit = {}, retries = 3): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const token = localStorage.getItem('token');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            
            if (response.status === 500 && retries > 0) {
                console.log(`[Retry] Simulated 500 error on ${endpoint}. Retries left: ${retries - 1}`);
                await new Promise(res => setTimeout(res, 500)); 
                return apiFetch<T>(endpoint, options, retries - 1);
            }
            throw new ApiError(response.status, `API request failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.warn(`[Fallback] Error fetching ${endpoint}. Using mock data fallback.`);
        
        if (endpoint.includes('/pets')) {
            const match = endpoint.match(/\/pets\/(\d+)/);
            if (match) {
                const id = parseInt(match[1]);
                return fallbackPets.find(p => p.id === id) as any;
            }
            return fallbackPets as any;
        }
        
        if (endpoint.includes('/cameras')) {
            return fallbackCameras as any;
        }
        
        throw error;
    }
}



export interface PaginatedResponse<T> {
    data?: T;
    error?: string;
}

export async function getPets() {
    return apiFetch<PaginatedResponse<Pet[]> | Pet[]>('/pets');
}

export async function getPetById(id: number) {
    return apiFetch<PaginatedResponse<Pet> | Pet>(`/pets/${id}`);
}

export async function getFeedback() {
    return apiFetch<PaginatedResponse<Feedback[]> | Feedback[]>('/feedback');
}

export async function getCameras() {
    return apiFetch<PaginatedResponse<Camera[]> | Camera[]>('/cameras');
}

export async function postDonation(payload: DonationPayload) {
    return apiFetch<unknown>('/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}
