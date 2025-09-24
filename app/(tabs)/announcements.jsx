import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useGoals } from "../../hooks/useGoals";
import { router } from "expo-router";

export default function Announcements() {
  const {
    currentUser,
    announcements,
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  } = useGoals();

  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingId, setEditingId] = useState(null);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser) fetchAnnouncements();
  }, [currentUser]);

  const handleSave = async () => {
    if (!newAnnouncement.trim()) return;
    if (editingId) {
      await updateAnnouncement(editingId, newAnnouncement.trim());
      setEditingId(null);
    } else {
      await createAnnouncement(newAnnouncement.trim());
    }
    setNewAnnouncement("");
  };

  const handleEdit = (announcement) => {
    setNewAnnouncement(announcement.text);
    setEditingId(announcement.id);
    const index = announcements.findIndex(a => a.id === announcement.id);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleDelete = (announcement) => {
    Alert.alert("Delete Announcement", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteAnnouncement(announcement.id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('../home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.title}>📢 Announcements</Text>

      {currentUser && (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add announcement"
            value={newAnnouncement}
            onChangeText={setNewAnnouncement}
            placeholderTextColor="#999"
          />
          <Pressable style={styles.addButton} onPress={handleSave}>
            <Text style={styles.addButtonText}>{editingId ? "Update" : "Add"}</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={announcements.sort((a,b) => b.createdAt?.seconds - a.createdAt?.seconds)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.text}</Text>
            {currentUser?.id === item.userId && (
              <View style={{ flexDirection: "row" }}>
                <Pressable style={styles.editButton} onPress={() => handleEdit(item)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={() => handleDelete(item)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No announcements</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
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
