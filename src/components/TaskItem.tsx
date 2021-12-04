import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit-pen/edit.png';

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TaskProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, taskNewTitle: string) => void;
}

export default function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskProps) {
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title)

    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setEditing(true)
    }
    function handleCancelEditing() {
        setNewTitle(task.title)
        setEditing(false)
    }
    function handleSubmitEditing() {
        editTask(task.id, newTitle)
        setEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (editing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [editing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${task.id}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${task.id}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        value={newTitle}
                        editable={editing}
                        onChangeText={setNewTitle}
                        onSubmitEditing={handleSubmitEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={ styles.iconsContainer }>
                {
                    editing ? (
                        <TouchableOpacity
                            style={{ paddingHorizontal: 13 }}
                            onPress={handleCancelEditing}
                        >
                            <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={{ paddingHorizontal: 13 }}
                            onPress={handleStartEditing}
                        >
                            <Image source={editIcon} />
                        </TouchableOpacity>
                    )
                }
                <View style={styles.divisor}>
                </View>
                <TouchableOpacity
                    style={{ paddingHorizontal: 13 }}
                    onPress={() => removeTask(task.id)}
                    disabled={editing}
                >
                    <Image source={trashIcon} style={{ opacity: editing ? 0.2 : 1 }} />
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    divisor: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    }
})