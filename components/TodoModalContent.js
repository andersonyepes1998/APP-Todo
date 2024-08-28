import { useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const TodoModalContent = ({id, title}) => {
    const [email, setEmail] = useState("");
    const [focus, setFocus] = useState(false);
  
    const handleSubmit = async () => {
      try {
        const response = await fetch("http://192.168.1.7:5000/todos/shared_todos", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            todo_id: id,
            user_id: 1,
            email: email,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error sharing todo:", errorData);
          return Alert.alert("Error", "Failed to share the todo.");
        }
  
        const data = await response.json();
        console.log(data);
        Keyboard.dismiss();
        setEmail("");
        setFocus(false);
        Alert.alert(
          "Congratulations 🎉",
          `You successfully shared ${title} with ${email}`,
          [{ text: "Okay" }]
        );
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "An unexpected error occurred.");
      }
    };

    return (
        <View style={styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20 }]}>
                Comparte tu tarea
            </Text>
            <Text style={[styles.title, { marginBottom: 20 }]}>
                "{title}"
            </Text>
            <Text style={styles.description}>
                Ingresa el correo electrónico del usuario con el que deseas compartir tu tarea. Comparte un
                tarea con alguien y manténgase sincronizado con sus objetivos todos los días.
            </Text>
            <TextInput
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                keyboardType="email-address"
                style={[
                styles.input,
                focus && { borderWidth: 3, borderColor: "black" },
                ]}
                placeholder="Introduce tu email de contacto"
            />
            <Button
                onPress={handleSubmit}
                title="Compartir"
                disabled={email.length === 0}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    title: {
      fontWeight: "900",
      letterSpacing: 0.5,
      fontSize: 16,
      textAlign: "center",
    },
    description: {
      color: "#56636F",
      fontSize: 13,
      fontWeight: "normal",
      width: "100%",
    },
    input: {
      borderWidth: 2,
      borderColor: "#00000020",
      padding: 15,
      borderRadius: 15,
      marginVertical: 15,
    },
  });

export default TodoModalContent;