import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGoals } from "../../hooks/useGoals";

export default function Grades() {
  const router = useRouter();
  const { currentUser, grades, fetchGrades, createGrade, updateGrade, deleteGrade } = useGoals()

  const [newSubject, setNewSubject] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [editingId, setEditingId] = useState(null);

  const flatListRef = useRef(null);

  useEffect(() => {
    fetchGrades();
  }, [currentUser]);

  const addOrUpdateSubject = async () => {
    const gradeNum = parseInt(newGrade);
    if (!newSubject.trim()) return alert("Please enter subject name");
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100)
      return alert("Please enter a valid grade between 0 and 100");

    if (editingId) {
      await updateGrade(editingId, { name: newSubject.trim(), grade: gradeNum });
      setEditingId(null);
    } else {
      await createGrade({ name: newSubject.trim(), grade: gradeNum });
    }

    setNewSubject("");
    setNewGrade("");
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const editSubject = (item) => {
    setNewSubject(item.name);
    setNewGrade(item.grade.toString());
    setEditingId(item.id);
  };

  const deleteSubject = (id) => {
    Alert.alert("Delete Subject", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteGrade(id),
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const isOwner = currentUser && item.userId === currentUser.id;

    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subject}>{item.name}</Text>
          <Text
            style={[
              styles.grade,
              item.grade >= 90
                ? styles.excellent
                : item.grade >= 85
                ? styles.good
                : styles.pass,
            ]}
          >
            {item.grade}
          </Text>
        </View>

        {isOwner && (
          <View style={styles.actions}>
            <Pressable
              style={[styles.actionButton, { backgroundColor: "#4e5a67ff" }]}
              onPress={() => editSubject(item)}
            >
              <Text style={styles.actionText}>Edit</Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, { backgroundColor: "#5d4b4bff" }]}
              onPress={() => deleteSubject(item.id)}
            >
              <Text style={styles.actionText}>Delete</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.push('../home')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.title}>📝 My Grades</Text>

      {currentUser && (
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Subject"
            value={newSubject}
            onChangeText={setNewSubject}
            placeholderTextColor="#999"
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 10 }]}
            placeholder="Grade"
            value={newGrade}
            onChangeText={setNewGrade}
            keyboardType="numeric"
            placeholderTextColor="#999"
            maxLength={3}
          />
          <Pressable style={styles.addButton} onPress={addOrUpdateSubject}>
            <Text style={styles.addButtonText}>{editingId ? "Update" : "Add"}</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={grades}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No subjects found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#BC8F8F", // ash gray
  },
  backButton: {
    backgroundColor: "#b095beff",
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
    backgroundColor: "#faf6f6",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 48,
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
    backgroundColor: "#937f9cff",
    paddingHorizontal: 17,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e1b2d7ff",
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subject: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Caecilia",
  },
  grade: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Caecilia",
  },
  excellent: {
    color: "#08790eff", // green
  },
  good: {
    color: "#f9a825", // yellow
  },
  pass: {
    color: "#c62828", // red
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginLeft: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Caecilia",
  },
  emptyText: {
    marginTop: 20,
    color: "#333",
    textAlign: "center",
    fontFamily: "Caecilia",
  },
});
