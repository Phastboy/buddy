import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <ThemeSelector/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});