import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Read() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/home"); // proceed to Home page
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>📖 Please Read</Text>
          <Text style={styles.message}>
            Welcome to{" "}
            <Text style={{ fontWeight: "bold", color: "#171717ff", fontFamily: "Caecilia" }}>
              StudentLink
            </Text>! 🎓{"\n\n"}
            Before using the app, please take a moment to review the guidelines and
            announcements.{"\n\n"}
            ✅ Stay updated with Announcements{"\n"}
            ✅ Manage your Schedule{"\n"}
            ✅ Check your Grades{"\n"}
            ✅ Track Assignments & Tasks{"\n\n"}
            Thank you for being part of{" "}
            <Text style={{ fontWeight: "bold", color: "#141414ff", fontFamily: "Caecilia" }}>
              CCTC StudentLink
            </Text>! 
          </Text>

          <Pressable style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#BC8F8F", // Rosy Brown
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ebdaec", // light violet/white card
    borderRadius: 18,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
    maxWidth: 380,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#030303ff",
    textAlign: "center",
    fontFamily: "Caecilia",
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    marginBottom: 30,
    color: "#333",
    fontFamily: "Caecilia",
  },
  button: {
    backgroundColor: "#4e4e4eff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Caecilia",
  },
});
