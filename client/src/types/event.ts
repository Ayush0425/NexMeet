export interface Event {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;

  startTime: string;
  endTime: string;
  duration: string;

  price: number;
  rating: number;
  attendees: number;

  image: string;

  description: string;

  organizer: string;
  organizerRole: string;
  organizerImage: string;

  venue: string;
address: string;
}