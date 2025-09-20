import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    console.log("🟡 Attempting signup...");

    if (!name || !courseYear || !email || !password || !confirmPassword) {
      console.log("❌ Missing fields");
      Alert.alert("⚠️ Missing Fields", "Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      console.log("❌ Password mismatch");
      Alert.alert("⚠️ Password Error", "Passwords do not match.");
      return;
    }

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const existingUser = await AsyncStorage.getItem(`user_${trimmedEmail}`);

      if (existingUser !== null) {
        console.log("❌ User already exists");
        Alert.alert("⚠️ Account Exists", "User already exists. Please log in.");
        return;
      }

      const userData = {
        name,
        courseYear,
        email: trimmedEmail,
        password,
        profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
      };

      await AsyncStorage.setItem(`user_${trimmedEmail}`, JSON.stringify(userData));
      console.log("✅ Signup successful. Navigating to login...");

      Alert.alert("✅ Success", "Signup successful! Please login.");

      // ✅ Use push instead of replace to support web better
      router.push("/login");

    } catch (error) {
      console.error("❌ Signup error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        placeholder="Course & Year (e.g. BSIT - 3rd Year)"
        value={courseYear}
        onChangeText={setCourseYear}
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#ccc"
      />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BC8F8F",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0a0a0aff",
    marginBottom: 20,
  },
  input: {
    width: 260,
    height: 48,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#605f61ff",
    paddingVertical: 14,
    width: 260,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Caecilia",
  },
  loginContainer: {
    flexDirection: "row",
  },
  loginText: {
    color: "#070707ff",
    fontSize: 16,
    fontFamily: "Caecilia",
  },
  loginLink: {
    color: "#5d5d5dff",
    fontSize: 16,
    fontFamily: "Caecilia",
    textDecorationLine: "underline",
  },
});
