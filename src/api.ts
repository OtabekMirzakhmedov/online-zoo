import { Pet, Feedback, Camera, DonationPayload } from './types';

const BASE_URL = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    // Auto-inject Auth Token if it exists in localStorage
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
            throw new ApiError(response.status, `API request failed: ${response.statusText}`);
        }

        // Some endpoints return { data: [...] }, others return just [...]
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
}

// ----- Service Methods -----

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
