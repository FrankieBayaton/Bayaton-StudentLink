import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([
    "📢 No classes on August 21 (Holiday)",
    "📢 Midterm exams start Oct 1 ",
    "📢 Enrollment for 2nd Semester begins Nov 5",
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const addAnnouncement = () => {
    if (newAnnouncement.trim() === "") return;

    if (editingIndex !== null) {
      const updated = [...announcements];
      updated[editingIndex] = `📢 ${newAnnouncement.trim()}`;
      setAnnouncements(updated);
      setEditingIndex(null);
    } else {
      setAnnouncements((prev) => [`📢 ${newAnnouncement.trim()}`, ...prev]);
    }

    setNewAnnouncement("");
  };

  const deleteAnnouncement = (index) => {
    setAnnouncements((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEdit = (index) => {
    setNewAnnouncement(announcements[index].replace("📢 ", ""));
    setEditingIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.title}>📢 Announcements</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add announcement"
          value={newAnnouncement}
          onChangeText={setNewAnnouncement}
          placeholderTextColor="#999"
        />
        <Pressable style={styles.addButton} onPress={addAnnouncement}>
          <Text style={styles.addButtonText}>
            {editingIndex !== null ? "Update" : "Add"}
          </Text>
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        data={announcements}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.card,
              editingIndex === index && { borderColor: "#007bff", borderWidth: 2 },
            ]}
          >
            <Text style={styles.text}>{item}</Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable style={styles.editButton} onPress={() => startEdit(index)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={() => deleteAnnouncement(index)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No announcements</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#BC8F8F", // Ash gray
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#131213",
    textAlign: "center",
    fontFamily: "Caecilia",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    fontFamily: "Caecilia",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#5d595fff",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Caecilia",
  },
  card: {
    backgroundColor: "#e6b3e5ff",
    padding: 18,
    marginVertical: 8,
    width: "90%",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    color: "#1b1b1bff",
    flex: 1,
    fontFamily: "Caecilia",
  },
  editButton: {
    backgroundColor: "#343441ff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },
  editButtonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Caecilia",
  },
  deleteButton: {
    backgroundColor: "#483e3eff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Caecilia",
  },
  empty: {
    marginTop: 20,
    color: "#333",
    textAlign: "center",
    fontFamily: "Caecilia",
  },
});
