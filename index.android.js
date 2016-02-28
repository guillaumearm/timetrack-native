/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import {Error} from './components/widgets'
import {Router, Route} from './react-native-router'

const NavBar = (props) => <Text>MENU</Text>

const First = ({route: {name, test}, router}) => <Text>Hello, I'm {name} {test}</Text>
const Second = ({route: {name, test}, router}) => <Text>Hello, I'm {name} {test}</Text>
const Third = ({route: {name, test}, router}) => <Text>Hello, I'm {name} {test}</Text>

class timetrack extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar />
        <Router>
          <Route name="first" component={First}/>
          <Route name="second" component={Second}/>
          <Route name="third" component={Third}/>
        </Router>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfdf',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('timetrack', () => timetrack);
