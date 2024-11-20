import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { label } from "@bacons/apple-colors";
import { Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <BodyScrollView>
      <Text style={{ color: label }}>TODO</Text>
    </BodyScrollView>
  );
}
