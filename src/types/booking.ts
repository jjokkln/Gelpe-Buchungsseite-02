export interface BookingData {
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    paymentMethod?: "stripe" | "cash";
    userId?: string; // Optional because derived from auth on server
    tariff?: "halfDay" | "fullDay" | "weekend" | "weekly";
    startTime?: string;
    extraKm?: number;
}

export interface BlockedDate {
    start_date: string;
    end_date: string;
    reason?: string;
}
