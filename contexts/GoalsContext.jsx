import { createContext, useState, useContext } from "react";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { router } from "expo-router";

export const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [assignments, setAssignments] = useState([]); // For tasks
  const [schedules, setSchedules] = useState([]); // For schedule/goals
  const [grades, setGrades] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  // ------------------ USER ------------------
  async function signupUser(userData) {
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      const exists = snapshot.docs.some(
        (doc) => doc.data().email.toLowerCase() === userData.email.toLowerCase()
      );
      if (exists) return { success: false, message: "User already exists" };

      const docRef = await addDoc(usersRef, {
        ...userData,
        email: userData.email.toLowerCase(),
        createdAt: new Date(),
      });

      setLoading(false);
      return { success: true, userId: docRef.id };
    } catch (error) {
      console.error("Signup error:", error);
      setLoading(false);
      return { success: false, message: "Something went wrong" };
    }
  }

  async function loginUser(email, password) {
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      const userDocSnap = snapshot.docs.find(
        (doc) => doc.data().email.toLowerCase() === email.toLowerCase()
      );

      if (!userDocSnap) return { success: false, message: "User does not exist" };
      const userDoc = userDocSnap.data();

      if (userDoc.password !== password)
        return { success: false, message: "Incorrect password" };

      setCurrentUser({ id: userDocSnap.id, ...userDoc });
      setLoading(false);
      return { success: true, user: { id: userDocSnap.id, ...userDoc } };
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return { success: false, message: "Something went wrong" };
    }
  }

  function logout() {
    setCurrentUser(null);
    router.push("/");
  }

  // ------------------ ASSIGNMENTS (Tasks) ------------------
  async function fetchAssignments() {
    if (!currentUser) return;
    setLoading(true);
    try {
      const ref = collection(db, "assignments");
      const snapshot = await getDocs(ref);
      const allAssignments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAssignments(allAssignments);
      setLoading(false);
    } catch (error) {
      console.error("Fetch assignments error:", error);
      setLoading(false);
    }
  }

  async function createAssignment(data) {
    if (!currentUser) return;
    const docRef = await addDoc(collection(db, "assignments"), {
      ...data,
      userId: currentUser.id,
      createdAt: new Date(),
    });
    setAssignments((prev) => [...prev, { id: docRef.id, ...data, userId: currentUser.id }]);
  }

  async function updateAssignment(id, data) {
    const ref = doc(db, "assignments", id);
    await updateDoc(ref, data);
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...data } : a))
    );
  }

  async function deleteAssignment(id) {
    const ref = doc(db, "assignments", id);
    await deleteDoc(ref);
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  }

  // ------------------ SCHEDULES ------------------
  async function fetchSchedules() {
    if (!currentUser) return;
    setLoading(true);
    try {
      const ref = collection(db, "schedules");
      const snapshot = await getDocs(ref);
      const allSchedules = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSchedules(allSchedules);
      setLoading(false);
    } catch (error) {
      console.error("Fetch schedules error:", error);
      setLoading(false);
    }
  }

  async function createSchedule(data) {
    if (!currentUser) return;
    const docRef = await addDoc(collection(db, "schedules"), {
      ...data,
      userId: currentUser.id,
      createdAt: new Date(),
    });
    setSchedules((prev) => [...prev, { id: docRef.id, ...data, userId: currentUser.id }]);
  }

  async function updateSchedule(id, data) {
    const ref = doc(db, "schedules", id);
    await updateDoc(ref, data);
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  }

  async function deleteSchedule(id) {
    const ref = doc(db, "schedules", id);
    await deleteDoc(ref);
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  }

  // ------------------ GRADES ------------------
  async function fetchGrades() {
    if (!currentUser) return;
    setLoading(true);
    try {
      const gradesRef = collection(db, "grades");
      const snapshot = await getDocs(gradesRef);
      const allGrades = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGrades(allGrades);
      setLoading(false);
    } catch (error) {
      console.error("Fetch grades error:", error);
      setLoading(false);
    }
  }

  async function createGrade(data) {
    if (!currentUser) return;
    const docRef = await addDoc(collection(db, "grades"), {
      ...data,
      userId: currentUser.id,
      createdAt: new Date(),
    });
    setGrades((prev) => [...prev, { id: docRef.id, ...data, userId: currentUser.id }]);
  }

  async function updateGrade(id, data) {
    const ref = doc(db, "grades", id);
    await updateDoc(ref, data);
    setGrades((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...data } : g))
    );
  }

  async function deleteGrade(id) {
    const ref = doc(db, "grades", id);
    await deleteDoc(ref);
    setGrades((prev) => prev.filter((g) => g.id !== id));
  }

  // ------------------ ANNOUNCEMENTS ------------------
async function fetchAnnouncements() {
  if (!currentUser) return;
  setLoading(true);
  try {
    const ref = collection(db, "announcements");
    const snapshot = await getDocs(ref);
    const allAnnouncements = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAnnouncements(allAnnouncements);
    setLoading(false);
  } catch (error) {
    console.error("Fetch announcements error:", error);
    setLoading(false);
  }
}

async function createAnnouncement(text) {
  if (!currentUser) return;
  const docRef = await addDoc(collection(db, "announcements"), {
    text,
    userId: currentUser.id,
    createdAt: new Date(),
  });
  setAnnouncements((prev) => [{ id: docRef.id, text, userId: currentUser.id }, ...prev]);
}

async function updateAnnouncement(id, text) {
  const ref = doc(db, "announcements", id);
  await updateDoc(ref, { text });
  setAnnouncements((prev) => prev.map(a => a.id === id ? { ...a, text } : a));
}

async function deleteAnnouncement(id) {
  const ref = doc(db, "announcements", id);
  await deleteDoc(ref);
  setAnnouncements((prev) => prev.filter(a => a.id !== id));
}

  return (
    <GoalsContext.Provider
  value={{
    currentUser,
    loading,
    signupUser,
    loginUser,
    logout,
    // Assignments
    assignments,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    // Schedules
    schedules,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    // Grades
    grades,
    fetchGrades,
    createGrade,
    updateGrade,
    deleteGrade,
    // Announcements
    announcements,
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  }}
>
  {children}
</GoalsContext.Provider>
  );
}

// Hook
export const useGoals = () => useContext(GoalsContext);
