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
import { useNavigation } from "@react-navigation/native";
import { useGoals } from "../../hooks/useGoals";
import { router } from "expo-router";

export default function Schedule() {
  const {
    currentUser,
    schedules,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  } = useGoals();

  const [editingId, setEditingId] = useState(null);
  const [newDay, setNewDay] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newTime, setNewTime] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser) fetchSchedules();
  }, [currentUser]);

  const startEdit = (schedule) => {
    setEditingId(schedule.id);
    setNewDay(schedule.day);
    setNewSubject(schedule.subject);
    setNewTime(schedule.time);
    setIsAdding(false);
  };

  const saveEdit = async () => {
    if (!newDay || !newSubject || !newTime) {
      Alert.alert("Error", "Fill all fields");
      return;
    }
    await updateSchedule(editingId, { day: newDay, subject: newSubject, time: newTime });
    resetInputs();
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    resetInputs();
  };

  const addNewItem = async () => {
    if (!newDay || !newSubject || !newTime) {
      Alert.alert("Error", "Fill all fields");
      return;
    }
    await createSchedule({ day: newDay, subject: newSubject, time: newTime });
    resetInputs();
    setIsAdding(false);
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const deleteItem = async (scheduleId) => {
    Alert.alert("Confirm Delete", "Delete this schedule item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteSchedule(scheduleId) },
    ]);
  };

  const resetInputs = () => {
    setEditingId(null);
    setNewDay("");
    setNewSubject("");
    setNewTime("");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('../home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.title}>📅 Class Schedule</Text>

      {currentUser && !isAdding && !editingId && (
        <Pressable style={styles.addButton} onPress={startAdd}>
          <Text style={styles.addButtonText}>+ Add New</Text>
        </Pressable>
      )}

      {(isAdding || editingId) && currentUser && (
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
          <Pressable
            style={styles.saveButton}
            onPress={editingId ? saveEdit : addNewItem}
          >
            <Text style={styles.saveText}>{editingId ? "Update" : "Add"}</Text>
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

      <FlatList
        ref={flatListRef}
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isOwner = currentUser && item.userId === currentUser.id;

          return (
            <View
              style={[
                styles.card,
                editingId === item.id && { borderColor: "#424951ff", borderWidth: 2 },
              ]}
            >
              <View>
                <Text style={styles.subject}>{item.subject}</Text>
                <Text style={styles.details}>
                  {item.day} • {item.time}
                </Text>
              </View>

              {isOwner && (
                <View style={{ flexDirection: "row" }}>
                  <Pressable style={styles.editButton} onPress={() => startEdit(item)}>
                    <Text style={styles.editText}>Edit</Text>
                  </Pressable>

                  <Pressable style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#BC8F8F" },
  backButton: { backgroundColor: "#927c9eff", padding: 12, borderRadius: 50, width: 50, height: 50, justifyContent: "center", alignItems: "center", position: "absolute", top: 40, left: 20, zIndex: 1 },
  title: { fontSize: 28, fontWeight: "bold", marginVertical: 20, color: "#131213ff", textAlign: "center", fontFamily: "Caecilia" },
  addButton: { backgroundColor: "#6a5674ff", paddingVertical: 12, borderRadius: 12, marginBottom: 15, alignItems: "center", width: 120, alignSelf: "center" },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "600", fontFamily: "Caecilia" },
  inputRow: { flexDirection: "row", marginBottom: 20, alignItems: "center", flexWrap: "nowrap" },
  input: { flex: 1, height: 48, backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 16, fontSize: 16, color: "#000", marginRight: 8, fontFamily: "Caecilia" },
  saveButton: { backgroundColor: "#786482ff", paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12 },
  saveText: { color: "white", fontWeight: "600", fontSize: 16, fontFamily: "Caecilia" },
  card: { backgroundColor: "#ecace9ff", padding: 18, marginVertical: 8, width: "90%", borderRadius: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, alignSelf: "center" },
  subject: { fontSize: 18, fontWeight: "600", color: "#000000ff", fontFamily: "Caecilia" },
  details: { fontSize: 16, color: "#4f4e4eff", marginTop: 4, fontFamily: "Caecilia" },
  editButton: { backgroundColor: "#495664ff", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10, marginRight: 8 },
  editText: { color: "white", fontWeight: "600", fontFamily: "Caecilia" },
  deleteButton: { backgroundColor: "#6e4e4eff", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10 },
  deleteText: { color: "white", fontWeight: "600", fontFamily: "Caecilia" },
});
