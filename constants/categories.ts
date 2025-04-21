// src/constants/categories.ts
import { Category } from '../types/category';

export const CATEGORY_ICONS = {
  sports: 'football',
  music: 'musical-notes',
  food: 'restaurant',
  tech: 'laptop',
  art: 'color-palette',
} as const;

export const categories: Category[] = [
  { id: '1', label: 'Sports', value: 'sports', icon: 'football' },
  { id: '2', label: 'Music', value: 'music', icon: 'musical-notes' },
  { id: '3', label: 'Food', value: 'food', icon: 'restaurant' },
  { id: '4', label: 'Tech', value: 'tech', icon: 'laptop' },
  { id: '5', label: 'Art', value: 'art', icon: 'color-palette' },
];
