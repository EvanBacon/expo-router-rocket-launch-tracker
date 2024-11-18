// NOTE: The default React Native styling doesn't support server rendering.
// Server rendered styles should not change between the first render of the HTML
// and the first render on the client. Typically, web developers will use CSS media queries
// to render different styles on the client and server, these aren't directly supported in React Native

import { useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

// but can be achieved using a styling library like Nativewind.
export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>("light");

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme());
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  return colorScheme;
}
