/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Router, Route} from './react-native-router'

import CompanyList from './components/company/list'
import PersonList from './components/person/list'
import MissionList from './components/mission/list'

import NavBar from './components/navbar'

export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <NavBar />
          <Route name="companies" component={CompanyList}/>
          <Route name="people" component={PersonList}/>
          <Route name="missions" component={MissionList}/>
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
});
