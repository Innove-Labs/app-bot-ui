export type Company = {
    id: number;
    name: string;
    email: string;
    description: string;
    category?: string;
    companyReferralId: string;
    isVerified: boolean;
    phoneNumber?: string;
}