import React from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { useGoals } from "../../hooks/useGoals";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // 👈 Import Icon

export default function Profile() {
  const { currentUser, logout } = useGoals();

  return (
    <ScrollView contentContainerStyle={styles.container}>
            <Pressable style={styles.backButton} onPress={() => router.push('../home')}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>

      {currentUser ? (
        <>
          <Image source={{ uri: currentUser.profilePic }} style={styles.profilePic} />
          <Text style={styles.title}>👤 My Profile</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{currentUser.name}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Course & Year</Text>
            <Text style={styles.value}>{currentUser.courseYear}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{currentUser.email}</Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Not logged in</Text>
          <Text style={{ marginBottom: 20 }}>Please log in to view your profile.</Text>
        </>
      )}

      {/* 🔓 Logout button */}
      <Pressable
        style={[styles.logoutButton, !currentUser && { backgroundColor: "#aaa" }]}
        onPress={logout}
        disabled={!currentUser}
      >
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
    flexGrow: 1,
  },
 backButton: {
    backgroundColor: "#806f88ff",
    padding: 12,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#bc65b8ff",
    marginTop: 60, // extra margin to avoid overlap with back button
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
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
