export class MapNode {
    public id: number;
    public business_name: string;
    public phone_number: string;
    public full_address: string;
    public business_category: string;
    public website: string;
    public facebook: string;
    public twitter: string;
    public instagram: string;
    public about: string;
    public logo: Logo;
    public contact_email: string;
    public city: string;
    public x_coordinate: string;
    public y_coordinate: string;
    public slug: string;
    public table_reservation_start_time: any;
    public table_reservation_end_time: any;
    public book_table: boolean;
    public time_zone: any;
    public latitude: number;
    public longitude: number;
    public monday: any;
    public tuesday: any;
    public wednesday: any;
    public thursday: any;
    public friday: any;
    public saturday: any;
    public sunday: any;
    public not_on_the_map: boolean;
}

class Logo {
    public url;
}