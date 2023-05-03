export class Home {
    id?: number;
    name: string | undefined;
    addressId?: number;
}

export class EditHome {
    name: string | undefined;
    addressId: number | undefined;
}

export interface AddHome {
    name: string;
}

export interface HomeDetails {
    id?: number;
    name: string;
    addressId: number;
    streetName: string;
    number: number;
    city: string;
    zipCode: number;
    country: string;
}