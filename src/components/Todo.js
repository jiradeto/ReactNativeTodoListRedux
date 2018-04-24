import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { initializeList, filterTask } from '../actions';
import Input from './common/Input';
import Button from './common/Button';
import data from '../todos.json';
import ListItem from './ListItem';
import { TASK_FILTER_TYPE } from '../actions/type';
const filters = ['All', 'Active', 'Completed'];

class TodoApp extends Component {
  state = {
    tasks: data,
    newTaskName: '',
    selectedIndex: 0
  };

  componentWillMount() {
    this.props.dispatch(initializeList());
  }
  onAddTask() {
    data.push({
      id: data.length + 1,
      text: this.state.newTaskName,
      completed: false
    });

    this.setState({
      tasks: data
    });

    // this.setState({
    //   tasks: [
    //     ...this.state.tasks,
    //     {
    //       id: this.state.tasks.length + 1,
    //       text: this.state.newTaskName,
    //       completed: false
    //     }
    //   ]
    // });
  }

  onPressFilter(index) {

    newData = data.slice().filter(d => {
      return d.completed === false;
    });
    this.setState({
      tasks: newData
    });

    
    this.setState({
      selectedIndex: index
    });

    switch (index) {
      case 0:
        this.props.dispatch(filterTask(TASK_FILTER_TYPE.FILTER_ALL));
        break;
      case 1:
        
        break;
      case 2:
        newData = data.filter(d => {
          return d.completed;
        });
        this.setState({
          tasks: newData
        });
        break;
    }
  }

  _onPressItem = index => {
    const newData = this.state.tasks.slice();
    newData[index] = {
      ...this.state.tasks[index],
      completed: !this.state.tasks[index].completed
    };
    this.setState({
      tasks: newData
    });
  };

  _renderItem = ({ item, index }) => {
    return <ListItem task={item} index={index} onPress={this._onPressItem} />;
  };

  _keyExtractor = (item, index) => item.id.toString();

  renderRow(task) {
    return (
      <ListItem
        task={task}
        onPress={() => {
          this.toggleStatus(task.id);
        }}
      />
    );
  }

  toggleStatus(index) {
    const newData = this.state.tasks.slice();

    newData[index - 1] = {
      ...this.state.tasks[index - 1],
      completed: !this.state.tasks[index - 1].completed
    };
    this.setState({
      tasks: newData
    });
    this.createDataSource(newData);
  }

  render() {
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <View style={[styles.addSection, styles.seperator]}>
          <Input
            onChangeText={text => this.setState({ newTaskName: text })}
            value={this.state.newTaskName}
            style={styles.input}
            placeholder="Add things here..."
          />
          <Button style={styles.button} onPress={this.onAddTask.bind(this)}>
            Add
          </Button>
        </View>
        <View style={styles.listSection}>
          <FlatList
            data={this.props.tasks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
        <ButtonGroup
          onPress={this.onPressFilter.bind(this)}
          selectedIndex={selectedIndex}
          buttons={filters}
          containerStyle={styles.filterSection}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  seperator: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1
  },
  button: {
    marginLeft: 6,
    flex: 0.2
  },
  input: {
    flex: 0.8
  },
  container: {
    flex: 1
  },
  addSection: {
    padding: 20,
    flexDirection: 'row'
  },
  filterSection: {
    flexDirection: 'row',
    flex: 1
  },
  listSection: {
    backgroundColor: 'white',
    flex: 8
  }
});
const select = store => {
  const { tasks } = store.todo;
  console.log('pond here', store.todo);
  return {
    tasks
  };
};
export default connect(select)(TodoApp);
