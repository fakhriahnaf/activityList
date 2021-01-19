import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import colors from '../utils/colors';
import TodoModal from './TodoModal';



export default class TodoList extends React.Component {
    state = {
        showListVisible: false
    }
    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }

    render() {
        const list = this.props.list;
        const completedCount = list.todo.filter(activity => activity.completed).length;
        const remainingCount = list.todo.length - completedCount;
        return (
            <View>
                <Modal 
                    animationType='slide' 
                    visible={this.state.showListVisible} 
                    onRequestClose={() => this.toggleListModal()}
                >
                    <TodoModal 
                        list={list} 
                        closeModal={()=> this.toggleListModal()}
                        updateList={this.props.updateList}
                    />
                </Modal>

                <TouchableOpacity 
                    style={[styles.container, { backgroundColor: list.color }]}
                    onPress={() => this.toggleListModal()}
                >
                    <Text style={styles.title} numberOfLines={1}>
                        {list.name}
                    </Text>

                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtitle}>Remaining</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>Complete</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200,

    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 18,
    },
    count: {
        fontSize: 48,
        fontWeight: '200',
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.white,
    }
})
