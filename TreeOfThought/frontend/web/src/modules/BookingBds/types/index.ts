export enum ApartmentStatus {
    Available = 'Available',
    Pending = 'Pending',
    Deposited = 'Deposited',
    Sold = 'Sold'
}

export enum BookingStatus {
    Pending = 'Pending',
    Paid = 'Paid',
    Cancelled = 'Cancelled',
    Completed = 'Completed'
}

export interface Project {
    id: string;
    name: string;
    description: string;
    location: string;
    totalUnits: number;
}

export interface Apartment {
    id: string;
    projectId: string;
    unitNumber: string;
    floor: number;
    price: number;
    status: ApartmentStatus;
}

export interface Booking {
    id: string;
    apartmentId: string;
    customerId: string;
    salesId?: string;
    depositAmount: number;
    status: BookingStatus;
    requestId: string;
    createdAt: string;
}
