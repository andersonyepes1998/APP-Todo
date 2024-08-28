import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SharedTodoModal from "./SharedTodoModal";
import TodoModalContent from "./TodoModalContent";

const CheckMark = ({id, completed, toggleTodo}) => {

  const toggle = async () => {
    const response = await fetch(`http://192.168.1.7:5000/todos/${id}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        value: completed ? false : true
      })
    });
    const data = await response.json();
    toggleTodo(id);
    console.log(data);
  }

  return (
    <Pressable 
      onPress={toggle}
      style={[styles.checkMark, {backgroundColor: completed === 0 ? '#E9E9EF' : '#0EA5E9'}]}
    ></Pressable>
  )
}

  const Task = ({ id, title, shared_with_id, completed, clearTodo, toggleTodo }) => {
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const sharedBottomSheetRef = useRef(null);
    const snapPoints = ['55%', '48%', '75%'];
    const snapPointsShared = ['40%'];

    const handlePressModal = () => {
      bottomSheetModalRef.current?.present();
    }

    const handlePressShared = () => {
      sharedBottomSheetRef.current?.present();
    }

    const deleteTodo = async () => {
      const response = await fetch(`http://192.168.1.7:5000/todos/${id}`, {
        method: 'DELETE'
      });
      clearTodo(id);
      console.log(response.status);
    }

    return(
      <TouchableOpacity
        onLongPress={() => setIsDeleteActive(true)}
        onPress={() => setIsDeleteActive(false)}
        activeOpacity={1}
        style={styles.container}
      >
        <View style={styles.containerTextCheckBox}>
          <CheckMark 
            id={id}
            completed={completed}
            toggleTodo={toggleTodo}
          />
          <Text style={styles.text}>{title}</Text>
        </View>
        {shared_with_id !== null ? (
          <Feather
            onPress={handlePressShared}
            name='users'
            size={20}
            color='#383839'
          />
        ) : (
          <Feather
            onPress={handlePressModal}
            name='share'
            size={20}
            color='#383839'
          />
        )}
        {isDeleteActive && (
          <Pressable onPress={deleteTodo} style={styles.deleteButton}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>x</Text>
          </Pressable>
        )}

        <BottomSheetModal
          ref={sharedBottomSheetRef}
          snapPoints={snapPointsShared}
          backgroundStyle={{ borderRadius: 50, borderWidth:4 }}
        >
          <SharedTodoModal
            id={id}
            title={title}
            shared_with_id={shared_with_id}
            completed={completed}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50, borderWidth:4 }}
        >
          <TodoModalContent
            id={id}
            title={title}
          />
        </BottomSheetModal>
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 14,
      borderRadius: 21,
      marginBottom: 10,
      backgroundColor: "white",
    },
    containerTextCheckBox: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      flexGrow: 1,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: "#383839",
      letterSpacing: -0.011 * 16, 
      flexShrink: 1,
      marginHorizontal: 8,
    },
    checkMark: {
      width: 20,
      height: 20,
      borderRadius: 7,
    },
    deleteButton: {
      position: "absolute",
      right: 0,
      top: -6,
      width: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ef4444",
      borderRadius: 10,
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 15,
    },
    row: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    title: {
      fontWeight: "900",
      letterSpacing: 0.5,
      fontSize: 16,
    },
    subtitle: {
      color: "#101318",
      fontSize: 14,
      fontWeight: "bold",
    },
    description: {
      color: "#56636F",
      fontSize: 13,
      fontWeight: "normal",
      width: "100%",
    },
});

export default Task;