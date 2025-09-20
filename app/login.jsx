import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem("loggedInUser");
        console.log("Logged in user from storage:", loggedInUser);
        if (loggedInUser) {
          router.replace("login");
        }
      } catch (e) {
        console.error("Login check failed", e);
      }
    };

    checkLogin();
  }, []);

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill all fields");
      Alert.alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const trimmedEmail = email.trim().toLowerCase();
      console.log("Trying to login with email:", trimmedEmail);

      const existingUserJson = await AsyncStorage.getItem(`user_${trimmedEmail}`);

      if (!existingUserJson) {
        setError("User does not exist. Please sign up.");
        Alert.alert("User does not exist", "Please sign up first.");
        return;
      }

      const user = JSON.parse(existingUserJson);
      console.log("Fetched user data:", user);

      if (user.password !== password) {
        setError("Your Password is Incorrect");
        Alert.alert("Your Password is Incorrect");
        return;
      }

      await AsyncStorage.setItem("loggedInUser", trimmedEmail);
      console.log("Login success. Navigating to /read");

      setEmail("");
      setPassword("");
      setError("");
      router.replace("/read");
    } catch (e) {
      console.error("Login error:", e);
      setError("Something went wrong. Please try again.");
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#777"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError("");
        }}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#777"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={styles.plainText}>Don't have an account? </Text>
        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.link}>Sign Up</Text>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Caecilia",
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
    fontFamily: "Caecilia",
  },
  button: {
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#90847aff",
    borderRadius: 14,
    width: 260,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Caecilia",
  },
  error: {
    color: "#444040ff",
    marginBottom: 8,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Caecilia",
  },
  plainText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Caecilia",
  },
  link: {
    color: "#393839ff",
    fontSize: 16,
    fontFamily: "Caecilia",
    textDecorationLine: "underline",
  },
});
