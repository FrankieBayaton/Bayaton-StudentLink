import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudentLink</Text>
      <Text style={styles.subtitle}>Connecting students. Empowering futures.</Text>

      <Pressable style={styles.signupButton} onPress={() => router.push("/signup")}>
        <Text style={styles.signupText}>Signup</Text>
      </Pressable>

      <Pressable style={styles.loginButton} onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 30, 
    backgroundColor: "rosybrown",
  },
  title: { 
    fontSize: 34, 
    fontWeight: "800", 
    color: "#050505ff", 
    marginBottom: 6,
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "Caecilia",
  },
  subtitle: {
    fontSize: 16,
    color: "#191919ff",
    marginBottom: 60,
    textAlign: "center",
    fontFamily: "Caecilia",
  },
  loginButton: { 
    width: "85%", 
    paddingVertical: 16, 
    borderRadius: 20, 
    alignItems: "center", 
    marginVertical: 10,
    backgroundColor: "#5c5151ff", 
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  loginText: { 
    color: "#ffffffff", 
    fontSize: 18, 
    fontWeight: "600",
    fontFamily: "Caecilia",
  },
  signupButton: { 
    width: "85%", 
    paddingVertical: 16, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: "#000", 
    alignItems: "center", 
    marginVertical: 10,
    backgroundColor: "#2e2525ff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  signupText: { 
    color: "#fdfdfdff", 
    fontSize: 18, 
    fontWeight: "600",
    fontFamily: "Caecilia",
  },
});
