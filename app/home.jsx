import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎓 S T U D E N T L I N K</Text>
      <Text style={styles.subtitle}>Your Bridge to Success</Text>

      <View style={styles.cardContainer}>
        {/* Announcements Card */}
        <Link href="/announcements" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardIcon}>📢</Text>
            <Text style={styles.cardText}>Announcements</Text>
          </Pressable>
        </Link>

        {/* View Grades Card */}
        <Link href="/grades" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardIcon}>📝</Text>
            <Text style={styles.cardText}>View Grades</Text>
          </Pressable>
        </Link>

        {/* Class Schedule Card */}
        <Link href="/schedule" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardText}>Class Schedule</Text>
          </Pressable>
        </Link>

        {/* Assignments/Tasks Card */}
        <Link href="/assignments" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardIcon}>🗂️</Text>
            <Text style={styles.cardText}>Assignments/Tasks</Text>
          </Pressable>
        </Link>

        {/* View Profile Card */}
        <Link href="/profile" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardIcon}>👤</Text>
            <Text style={styles.cardText}>Profile</Text>
          </Pressable>
        </Link>
      </View>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffffff",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Caecilia",
  },
  subtitle: {
    fontSize: 16,
    color: "#e8e6e6ff",
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Caecilia",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
  },
  card: {
    backgroundColor: "#585858ff",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginVertical: 10,
    marginHorizontal: 10,
    width: "40%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 10,
    color: "#000000ff",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffffff",
    textAlign: "center",
    fontFamily: "Caecilia",
  },
});
