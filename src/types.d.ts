interface User {
    active: boolean;
    created_at: string;
    district: number;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    middle_initial: string | null | undefined;
    verified: boolean;
}

interface UserInfo {
    firstName: string;
    lastName: string;
    middleInitial?: string | null | undefined;
    active: boolean;
    district: number;
    email: string;
}