import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useGoals } from "../hooks/useGoals"

export default function Signup() {
  const router = useRouter();
  const { signupUser, loading } = useGoals()

  const [name, setName] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !courseYear || !email || !password || !confirmPassword) {
      Alert.alert("⚠️ Missing Fields", "Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("⚠️ Password Error", "Passwords do not match.");
      return;
    }

    const userData = {
      name,
      courseYear,
      email,
      password,
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    };

    const result = await signupUser(userData);

    if (result.success) {
      Alert.alert("✅ Success", "Signup successful! Please login.");
      router.push("/login");
    } else {
      Alert.alert("⚠️ Error", result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Course & Year" value={courseYear} onChangeText={setCourseYear} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <Pressable style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
      </Pressable>

      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={{ textDecorationLine: "underline" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#BC8F8F" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: { width: 260, height: 48, backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 16, marginBottom: 16 },
  button: { backgroundColor: "#605f61ff", width: 260, paddingVertical: 14, borderRadius: 14, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  loginContainer: { flexDirection: "row" },
});
