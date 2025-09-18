import React, { useState, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";

export default function Schedule() {
  const [schedule, setSchedule] = useState([
    { day: "Mon", subject: "Programming", time: "8:00 AM" },
    { day: "Tue", subject: "Database", time: "10:00 AM" },
    { day: "Wed", subject: "Networking", time: "1:00 PM" },
    { day: "Thu", subject: "Web Development", time: "9:00 AM" },
    { day: "Fri", subject: "Systems Analysis", time: "2:00 PM" },
    { day: "Sat", subject: "Capstone Project", time: "9:00 AM" },
    { day: "Sun", subject: "Thesis Writing", time: "10:30 AM" },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [newDay, setNewDay] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newTime, setNewTime] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const startEdit = (index) => {
    setEditingIndex(index);
    setNewDay(schedule[index].day);
    setNewSubject(schedule[index].subject);
    setNewTime(schedule[index].time);
    setIsAdding(false);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const saveEdit = () => {
    if (!newDay.trim() || !newSubject.trim() || !newTime.trim()) {
      Alert.alert("Error", "Please fill all fields to update.");
      return;
    }

    const updated = [...schedule];
    updated[editingIndex] = {
      day: newDay.trim(),
      subject: newSubject.trim(),
      time: newTime.trim(),
    };
    setSchedule(updated);
    resetInputs();
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingIndex(null);
    resetInputs();
  };

  const addNewItem = () => {
    if (!newDay.trim() || !newSubject.trim() || !newTime.trim()) {
      Alert.alert("Error", "Please fill all fields to add.");
      return;
    }
    setSchedule([
      ...schedule,
      { day: newDay.trim(), subject: newSubject.trim(), time: newTime.trim() },
    ]);
    resetInputs();
    setIsAdding(false);
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const deleteItem = (index) => {
    Alert.alert(
      "Confirm Delete",
      `Delete schedule for ${schedule[index].day}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updated = schedule.filter((_, i) => i !== index);
            setSchedule(updated);
            if (editingIndex === index) resetInputs();
            else if (editingIndex > index) setEditingIndex(editingIndex - 1);
          },
        },
      ]
    );
  };

  const resetInputs = () => {
    setEditingIndex(null);
    setNewDay("");
    setNewSubject("");
    setNewTime("");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.title}>📅 Class Schedule</Text>

      {!isAdding && editingIndex === null && (
        <Pressable style={styles.addButton} onPress={startAdd}>
          <Text style={styles.addButtonText}>+ Add New</Text>
        </Pressable>
      )}

      {isAdding && (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Day"
            value={newDay}
            onChangeText={setNewDay}
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={newSubject}
            onChangeText={setNewSubject}
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={newTime}
            onChangeText={setNewTime}
          />
          <Pressable style={styles.saveButton} onPress={addNewItem}>
            <Text style={styles.saveText}>Add</Text>
          </Pressable>
          <Pressable
            style={[styles.saveButton, { backgroundColor: "#514d4dff", marginLeft: 8 }]}
            onPress={() => {
              setIsAdding(false);
              resetInputs();
            }}
          >
            <Text style={styles.saveText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {editingIndex !== null && (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Day"
            value={newDay}
            onChangeText={setNewDay}
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={newSubject}
            onChangeText={setNewSubject}
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={newTime}
            onChangeText={setNewTime}
          />
          <Pressable style={styles.saveButton} onPress={saveEdit}>
            <Text style={styles.saveText}>Update</Text>
          </Pressable>
          <Pressable
            style={[styles.saveButton, { backgroundColor: "#999", marginLeft: 8 }]}
            onPress={resetInputs}
          >
            <Text style={styles.saveText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={schedule}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.card,
              editingIndex === index && { borderColor: "#424951ff", borderWidth: 2 },
            ]}
          >
            <View>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.details}>
                {item.day} • {item.time}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={styles.editButton}
                onPress={() => startEdit(index)}
              >
                <Text style={styles.editText}>Edit</Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteItem(index)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#BC8F8F" }, // ash gray

  backButton: {
    backgroundColor: "#927c9eff",
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
    color: "#131213ff",
    textAlign: "center",
    fontFamily: "Caecilia",
  },

  addButton: {
    backgroundColor: "#6a5674ff",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    width: 120,
    alignSelf: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Caecilia",
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    flexWrap: "nowrap",
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    marginRight: 8,
    fontFamily: "Caecilia",
  },
  saveButton: {
    backgroundColor: "#786482ff",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  saveText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Caecilia",
  },

  card: {
    backgroundColor: "#ecace9ff",
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
    alignSelf: "center",
  },
  subject: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000ff",
    fontFamily: "Caecilia",
  },
  details: {
    fontSize: 16,
    color: "#4f4e4eff",
    marginTop: 4,
    fontFamily: "Caecilia",
  },

  editButton: {
    backgroundColor: "#495664ff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },
  editText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Caecilia",
  },

  deleteButton: {
    backgroundColor: "#6e4e4eff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Caecilia",
  },
});
