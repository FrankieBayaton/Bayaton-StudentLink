import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useGoals } from "../../hooks/useGoals";
import { router } from "expo-router";

export default function Assignments() {
  const {
    currentUser,
    assignments,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  } = useGoals();

  const [taskText, setTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser) fetchAssignments();
  }, [currentUser]);

  const handleAddOrUpdateTask = async () => {
    if (!taskText.trim()) {
      Alert.alert("Please enter a task");
      return;
    }

    if (editingId) {
      await updateAssignment(editingId, { text: taskText.trim() });
      setEditingId(null);
    } else {
      await createAssignment({ text: taskText.trim() });
    }

    setTaskText("");
  };

  const handleEdit = (task) => {
    setTaskText(task.text);
    setEditingId(task.id);
    const index = assignments.findIndex((a) => a.id === task.id);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleDelete = (task) => {
    if (!currentUser || task.userId !== currentUser.id) return;
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteAssignment(task.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('../home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.title}>🗂️ Assignments / Tasks</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add new task..."
          value={taskText}
          onChangeText={setTaskText}
          placeholderTextColor="#999"
        />
        <Pressable style={styles.addButton} onPress={handleAddOrUpdateTask}>
          <Text style={styles.addButtonText}>{editingId ? "Update" : "Add"}</Text>
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        data={assignments.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>• {item.text}</Text>
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
        ListEmptyComponent={
          <Text style={{ marginTop: 20, color: "#333", textAlign: "center" }}>
            No tasks added yet.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#BC8F8F" },
  backButton: { backgroundColor: "#785e78ff", padding: 12, borderRadius: 50, width: 50, height: 50, justifyContent: "center", alignItems: "center", position: "absolute", top: 40, left: 20, zIndex: 1 },
  title: { fontSize: 28, fontWeight: "bold", marginVertical: 20, color: "#121213ff", textAlign: "center" },
  inputRow: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  input: { flex: 1, height: 48, backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 16, fontSize: 16, color: "#000", marginRight: 8 },
  addButton: { marginLeft: 10, backgroundColor: "#c09ac6ff", paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12 },
  addButtonText: { color: "white", fontWeight: "600", fontSize: 16 },
  taskCard: { backgroundColor: "#e2baedff", padding: 18, marginVertical: 8, borderRadius: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  taskText: { fontSize: 18, color: "#333", flex: 1 },
  editButton: { backgroundColor: "#57616bff", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10, marginRight: 8 },
  editButtonText: { color: "white", fontWeight: "600" },
  deleteButton: { backgroundColor: "#514444ff", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10 },
  deleteButtonText: { color: "white", fontWeight: "600" },
});
