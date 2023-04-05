export interface Book {
    id: number;
    google_id: string;
    title: string;
    authors: string;
    description: string;
    isbn: string;
    thumbnail: string;
    pivot: {
        id: number;
        user_id: number;
        book_id: number;
        read_count: number;
        added_at: Date;
    }
}