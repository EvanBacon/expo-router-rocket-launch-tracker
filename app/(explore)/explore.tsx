import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { label } from "@bacons/apple-colors";
import { StyleSheet, Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <BodyScrollView>
      <Text style={{ color: label }}>TODO</Text>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
