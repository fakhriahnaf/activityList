import React, { Component } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';
import { TextInput } from 'react-native';

export default class TodoModal extends Component {
    state = {
        newTodo: '',
        // name: this.props.list.name,
        // color: this.props.list.color,
        // todo: this.props.list.todo,
    };

    toggleTodoCompleted = index => {
        let list = this.props.list
        list.todo[index].completed = !list.todo[index].completed

        this.props.updateList(list)
    }
    addActivity = () => {
        let list = this.props.list;
        list.todo.push({title : this.state.newTodo, completed: false});
        
        this.props.updateList(list);
        this.setState({newTodo: ''});

        Keyboard.dismiss();
    }

    renderTodo = (activity,index) => {
        return (
            <View style={styles.containerActivity}>
                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                    <Ionicons
                        name={activity.completed ? 'ios-square' : 'ios-square-outline'}
                        size={24} color={colors.gray}
                        style={{ width: 32 }}
                    />
                </TouchableOpacity>
                <Text
                    style={[styles.todo,
                    {
                        textDecorationLine: activity.completed ? 'line-through' : 'none',
                        color: activity.completed ? colors.gray : colors.black
                    }]}>
                    {activity.title}
                </Text>
            </View>
        )
    }
    render() {
        const list = this.props.list

        const taskCount = list.todo.length
        const completeCount = list.todo.filter(activity => activity.completed).length
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={styles.iconBack} onPress={this.props.closeModal}>
                        <AntDesign name='close' size={24} color={colors.black} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>{completeCount} of {taskCount} task</Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flex: 3 }]}>
                        <FlatList
                            data={list.todo}
                            renderItem={({ item, index }) => this.renderTodo(item,index)}
                            keyExtractor={item => item.title}
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={[styles.section, styles.footer]} >
                        <TextInput 
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={text => this.setState({newTodo: text})}
                            value = {this.state.newTodo}
                        />
                        
                        <TouchableOpacity 
                            style={[styles.addActivity, { backgroundColor: list.color }]} 
                            onPress={() => this.addActivity()}
                        >
                            <AntDesign name='plus' size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    iconBack: {
        position: 'absolute',
        top: 64,
        right: 32,
        zIndex: 10,
    },
    section: {
        flex: 1,
        alignSelf: 'stretch',

    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addActivity: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerActivity: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todo: {
        color: colors.black,
        fontWeight: '700',
        fontSize: 16,
    }

})
