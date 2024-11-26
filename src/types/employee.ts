export interface Employee {
    email: string;
    fullName?: string;
    phoneNumber?: string;
    registrationDate: string;
    role: string;
    permissions: string[];
}

export interface Permission {
    key: string;
    label: string;
}
