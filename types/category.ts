import { Ionicons } from '@expo/vector-icons';

export interface Category {
  id: string;
  label: string; // Display name, e.g. "Music"
  value: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
}
