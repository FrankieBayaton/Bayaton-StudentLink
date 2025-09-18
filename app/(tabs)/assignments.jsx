import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the arrow icon
import { useNavigation } from "@react-navigation/native"; // Import navigation
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function Assignments() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const flatListRef = useRef(null);
  const navigation = useNavigation(); // Use navigation to go back

  useEffect(() => {
    // Load tasks from AsyncStorage when component mounts
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to save tasks", error);
    }
  };

  const addOrUpdateTask = () => {
    if (taskText.trim() === "") {
      Alert.alert("Please enter a task");
      return;
    }

    let updatedTasks;
    if (editingIndex !== null) {
      // Update task
      updatedTasks = [...tasks];
      updatedTasks[editingIndex] = taskText.trim();
      setEditingIndex(null);
    } else {
      // Add new task
      updatedTasks = [taskText.trim(), ...tasks];
    }

    saveTasks(updatedTasks);
    setTaskText("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    if (editingIndex === index) setEditingIndex(null);
    saveTasks(updatedTasks);
  };

  const startEdit = (index) => {
    setTaskText(tasks[index]);
    setEditingIndex(index);

    // Scroll to edited item
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      {/* Back Button (Arrow Icon) positioned at the top */}
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
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
        <Pressable style={styles.addButton} onPress={addOrUpdateTask}>
          <Text style={styles.addButtonText}>
            {editingIndex !== null ? "Update" : "Add"}
          </Text>
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.taskCard,
              editingIndex === index && { borderColor: "#007bff", borderWidth: 2 },
            ]}
          >
            <Text style={styles.taskText}>• {item}</Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={styles.editButton}
                onPress={() => startEdit(index)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteTask(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
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
  backButton: {
    backgroundColor: "#785e78ff", // Violet color
    padding: 12,
    borderRadius: 50, // Circular button
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",  // Absolute positioning to place it above content
    top: 40,  // Positioning from the top of the screen
    left: 20,  // Positioning from the left side
    zIndex: 1, // Ensure it's above other content
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#121213ff",
    textAlign: "center",
  },
  inputRow: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    marginRight: 8,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#c09ac6ff",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  addButtonText: { color: "white", fontWeight: "600", fontSize: 16 },
  taskCard: {
    backgroundColor: "#e2baedff",
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskText: { fontSize: 18, color: "#333", flex: 1 },
  editButton: {
    backgroundColor: "#57616bff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },
  editButtonText: { color: "white", fontWeight: "600" },
  deleteButton: {
    backgroundColor: "#514444ff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  deleteButtonText: { color: "white", fontWeight: "600" },
});

