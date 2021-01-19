import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal } from 'react-native';
import colors from './src/utils/colors';
import { AntDesign } from '@expo/vector-icons';
import tempData from './tempData';
import TodoList from './src/components/todo-list';
import AddListModal from './src/components/addListModal';
import Fire from './src/utils/Firebase';



export default class App extends React.Component {
  state = {
    addActivityVisible: false,
    listData: tempData, 
    user: {}
  };

  componentDidMount() {
    firebase = new Fire((error , user ) => {
      if(error) {
        return alert ('uh ada yang erorr');
      }
      this.setState({ user });
    });

  }

  toggleAddActivityModal() {
    this.setState({ addActivityVisible: !this.state.addActivityVisible });
  };

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList}/>
  }

  addList =list => {
    this.setState({listData : [
        ...this.state.listData, 
          {...list, id: this.state.listData.length + 1, todo: [] 
        }] 
      });
  };

  updateList = list => {
    this.setState({
      listData: this.state.listData.map(item=> { 
          return item.id === list.id ? list : item
      })
    })
  }

  

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          visible={this.state.addActivityVisible}
          onRequestClose={() => this.toggleAddActivityModal()}
        >
          <AddListModal closeModal={() => this.toggleAddActivityModal()} addList={this.addList}/>

        </Modal>

        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Activity <Text style={{ fontWeight: '300', color: colors.blue }}>List</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddActivityModal()}>
            <AntDesign name='plus' size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>

        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.listData}
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps='always'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightblue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },

});
