export interface Event {
  id: string;
  title: string;
  description: string;
  category: string; // e.g. 'sports', 'music'
  date: string; // ISO format: "2025-04-20T15:00:00Z"
  location: string;
  attendees: number;
  image?: string; // Optional URL to event banner
}
