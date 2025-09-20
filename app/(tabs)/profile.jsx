import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const router = useRouter();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const loggedInEmail = await AsyncStorage.getItem("loggedInUser");

        if (!loggedInEmail) {
          Alert.alert("Not logged in", "Please log in first.");
          router.replace("/login");
          return;
        }

        const userData = await AsyncStorage.getItem(`user_${loggedInEmail}`);
        if (userData) {
          const parsedUser = JSON.parse(userData);

          setStudent({
            name: parsedUser.name || "Student",
            courseYear: parsedUser.courseYear || "BSIT - 3rd Year", // ✅ Combined field
            email: parsedUser.email || loggedInEmail,
            profilePic:
              parsedUser.profilePic ||
              "https://randomuser.me/api/portraits/women/68.jpg",
          });
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to load profile.");
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedInUser");
    router.replace("/login");
  };

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: student.profilePic }} style={styles.profilePic} />
      <Text style={styles.title}>👤 My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{student.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Course & Year</Text> {/* ✅ Updated label */}
        <Text style={styles.value}>{student.courseYear}</Text> {/* ✅ Combined value */}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{student.email}</Text>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#BC8F8F",
    padding: 20,
    paddingBottom: 40,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#bc65b8ff",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#111111ff",
  },
  card: {
    backgroundColor: "#ebb6e1ff",
    padding: 16,
    marginVertical: 8,
    width: "90%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#4e4c4cff",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#976455ff",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 14,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
