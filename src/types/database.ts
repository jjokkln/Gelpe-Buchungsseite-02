export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            bookings: {
                Row: {
                    id: string
                    user_id: string
                    start_date: string
                    end_date: string
                    status: 'reserved' | 'paid' | 'cancelled'
                    total_price: number
                    stripe_session_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    start_date: string
                    end_date: string
                    status?: 'reserved' | 'paid' | 'cancelled'
                    total_price: number
                    stripe_session_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    start_date?: string
                    end_date?: string
                    status?: 'reserved' | 'paid' | 'cancelled'
                    total_price?: number
                    stripe_session_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    first_name: string | null
                    last_name: string | null
                    phone: string | null
                    address_street: string | null
                    address_city: string | null
                    address_zip: string | null
                    role: string
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    first_name?: string | null
                    last_name?: string | null
                    phone?: string | null
                    address_street?: string | null
                    address_city?: string | null
                    address_zip?: string | null
                    role?: string
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    first_name?: string | null
                    last_name?: string | null
                    phone?: string | null
                    address_street?: string | null
                    address_city?: string | null
                    address_zip?: string | null
                    role?: string
                    updated_at?: string | null
                }
            }
            blocked_dates: {
                Row: {
                    id: string
                    date: string
                    booking_id: string | null
                    reason: string | null
                }
                Insert: {
                    id?: string
                    date: string
                    booking_id?: string | null
                    reason?: string | null
                }
                Update: {
                    id?: string
                    date?: string
                    booking_id?: string | null
                    reason?: string | null
                }
            }
        }
    }
}
