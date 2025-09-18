import React from "react";
import { GoalsProvider } from "./context/GoalsContext";
import GoalsScreen from "./screens/GoalsScreen"; // example screen

export default function App() {
  return (
    <GoalsProvider>
      <GoalsScreen />
    </GoalsProvider>
  );
}
