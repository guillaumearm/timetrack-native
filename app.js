/* @flow */
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import {Router, Route} from './react-native-router'

import CompanyList from './components/company/list'
import PersonList from './components/person/list'
import MissionList from './components/mission/list'
import NavBar from './components/navbar'

//import {GoogleSigninButton} from 'react-native-google-signin'

const menuItems = [
  {
    name: "companies",
    title: "Companies",
    onPress: (router) => {
      router.replace( {name: "companies"} )
    }
  },
  {
    name: "people",
    title: "People",
    onPress: (router) => {
      router.replace({name: "people"})
    }
  },
    {
      name: "missions",
      title: "Missions",
      onPress: (router) => {
        router.replace({name: "missions"})
    }
  },
]

const Header = (props) => {
  return (
    <View style={{padding: 10, height: 40, backgroundColor: "black"}}>
      <Text style={{fontSize: 18, alignSelf: "center", color: "white"}}>Timetrack by redpelicans</Text>
    </View>
  )
}

export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(232, 232, 232)',
  },
});
