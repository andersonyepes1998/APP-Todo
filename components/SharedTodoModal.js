import { useEffect, useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";

const SharedTodoModal = ({ id, title, shared_with_id, completed }) => {
    const [author, setAuthor] = useState({});
    const [sharedWith, setSharedWith] = useState({});

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        const response = await fetch(
            `http://192.168.1.7:5000/todos/shared_todos/${id}`,
            {
              method: "GET",
            }
          );
        const { author, shared_with } = await response.json();
        setAuthor(author);
        setSharedWith(shared_with);
    }

    return (
        <View style={styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20 }]}>
                Compartir tareas
            </Text>
            <Text style={[styles.title, { marginBottom: 20 }]}>
                "{title}"
            </Text>
            <Text style={[styles.title]}>
                Estado
            </Text>
            <View
                style={[
                    styles.status,
                    { backgroundColor: completed === 1 ? "#4ade80" : "#f87171" },
                ]}
                >
                <Text style={[styles.title, { color: "white" }]}>
                    {completed === 1 ? "Completado" : "Incompleto"}
                </Text>
            </View>
            <Text style={[styles.description]}>
                PARTICIPANTES
            </Text>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.participant}>
                    <Text style={[styles.description, { color: "white" }]}>
                        {author.name}
                    </Text>
                </View>
                <View style={styles.participant}>
                    <Text style={[styles.description, { color: "white" }]}>
                        {sharedWith.name}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 15,
    },
    title: {
      fontWeight: "900",
      padding: 3,
      letterSpacing: 0.5,
      fontSize: 16,
      textAlign: "center",
    },
    description: {
      color: "#56636F",
      fontSize: 13,
      fontWeight: "900",
      color: "black",
    },
    participant: {
      backgroundColor: "#8b5cf6",
      padding: 5,
      paddingHorizontal: 10,
      margin: 5,
      borderRadius: 20,
      fontWeight: "900",
      color: "white",
    },
    input: {
      borderWidth: 2,
      borderColor: "#00000020",
      padding: 15,
      borderRadius: 15,
      marginVertical: 15,
    },
    status: {
      padding: 5,
      paddingHorizontal: 10,
      marginTop: 5,
      marginBottom: 20,
      borderRadius: 20,
      fontWeight: "900",
      color: "white",
    },
  });

export default SharedTodoModal;