import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="light">
      <Slot />
    </GluestackUIProvider>
  );
}
