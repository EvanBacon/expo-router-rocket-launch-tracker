"use client";
import { Link as ExpoLink } from "expo-router";
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { type ComponentProps } from "react";
import { Platform } from "react-native";

type Props = Omit<ComponentProps<typeof ExpoLink>, "href"> & { href: string };

export default function Link({ href, ...rest }: Props) {
  return (
    <ExpoLink
      {...rest}
      href={href}
      onPress={async (event) => {
        if (
          Platform.OS !== "web" &&
          rest.target === "_blank" &&
          href.startsWith("http")
        ) {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
