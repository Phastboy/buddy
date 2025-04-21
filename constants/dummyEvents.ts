// src/constants/dummyEvents.ts
import { Event } from '../types/event';

export const dummyEvents: Event[] = [
  {
    id: 'e1',
    title: 'Campus Football Final',
    description: 'Watch the electrifying campus football finals!',
    category: 'sports',
    date: '2025-04-23T16:00:00Z',
    location: 'Main Stadium',
    attendees: 120,
    image: 'https://example.com/images/football.jpg',
  },
  {
    id: 'e2',
    title: 'Live Music Night',
    description: "Experience the best of OAU's musical talent!",
    category: 'music',
    date: '2025-04-24T19:30:00Z',
    location: 'SUB Auditorium',
    attendees: 85,
    image: 'https://example.com/images/music.jpg',
  },
  {
    id: 'e3',
    title: 'Jollof Cook-off',
    description: 'Whose jollof reigns supreme?',
    category: 'food',
    date: '2025-04-25T13:00:00Z',
    location: 'Amphi Theater',
    attendees: 60,
    image: 'https://example.com/images/food.jpg',
  },
];
