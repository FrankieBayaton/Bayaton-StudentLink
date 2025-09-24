import { Stack } from "expo-router";
import { GoalsProvider } from "../contexts/GoalsContext";

export default function RootLayout() {
  return (
    <GoalsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="login"/>
        <Stack.Screen name="signup"/>
        <Stack.Screen name="read"/>
        <Stack.Screen name="home"/>
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </GoalsProvider>
  );
}
