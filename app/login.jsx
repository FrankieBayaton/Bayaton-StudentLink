import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useGoals } from "../hooks/useGoals";

const Login = () => {
  const router = useRouter();
  const { loginUser, loading } = useGoals()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("⚠️ Please fill all fields");
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      Alert.alert("✅ Login successful");
      // Optionally store user locally if needed
      router.replace("/read"); // navigate to your app's main page
    } else {
      Alert.alert("⚠️ Login failed", result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Log In"}</Text>
      </Pressable>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text>Don't have an account? </Text>
        <Pressable onPress={() => router.push("/signup")}>
          <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BC8F8F",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 10 },
  input: {
    width: 260,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 14,
    width: 260,
    backgroundColor: "#90847aff",
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
