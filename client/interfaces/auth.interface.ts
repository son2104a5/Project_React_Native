export interface RegisterRequest {
    fullName: string,
    email: string,
    phone: string,
    password: string
    dateOfBirth: Date
}

export interface LoginRequest {
    email: string,
    password: string
}