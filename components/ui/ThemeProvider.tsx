import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNTheme,
} from "@react-navigation/native";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <RNTheme value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {props.children}
    </RNTheme>
  );
}
