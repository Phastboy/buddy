import { Text } from './Themed';

export const ScrollContent = () => (
  <>
    {Array.from({ length: 30 }).map((_, i) => (
      <Text key={i} style={{ padding: 20, borderBottomWidth: 1 }}>
        Scroll Item {i + 1}
      </Text>
    ))}
  </>
);
