import HttpClient from "../../../utils/httpClient";
import type { Project, Apartment, Booking } from "../types";

const BookingService = {
    getProjects: async () => {
        const response = await HttpClient.get<Project[]>("/BookingBds/projects");
        return response.data;
    },

    getApartments: async (projectId: string) => {
        const response = await HttpClient.get<Apartment[]>(`/BookingBds/projects/${projectId}/apartments`);
        return response.data;
    },

    createBooking: async (apartmentId: string, depositAmount: number, requestId: string) => {
        const response = await HttpClient.post<{ trackingId: string }>("/BookingBds/booking", {
            apartmentId,
            depositAmount,
            requestId
        });
        return response.data;
    },

    confirmPayment: async (bookingId: string, transactionId: string, amountPaid: number) => {
        const response = await HttpClient.post<{ trackingId: string }>("/BookingBds/payment", {
            bookingId,
            transactionId,
            amountPaid
        });
        return response.data;
    },

    getMyBookings: async () => {
        const response = await HttpClient.get<Booking[]>("/BookingBds/my-bookings");
        return response.data;
    }
};

export default BookingService;
