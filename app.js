/* @flow */
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

const webClientId = "1013003508849-ke0dsjttftqcl0ee3jl7nv7av9iuij8p.apps.googleusercontent.com"

// Routes
import {Router, Route} from './react-native-router'
import CompanyList from './components/company/list'
import PersonList from './components/person/list'
import MissionList from './components/mission/list'

import {Menu} from './components/menu'

import {LoginTimetrack} from './components/login'


const Header = (props) => {
  return (
    <View style={{padding: 10, height: 40, backgroundColor: "black"}}>
      <Text style={{fontSize: 18, alignSelf: "center", color: "white"}}>Timetrack by redpelicans</Text>
    </View>
  )
}

const Title = (props) => {
  return (
    <View style={{marginBottom: 22, marginTop: 22, alignItems: "center"}}>
      <Text style={{fontSize: 32, color: "black"}}>{props.children}</Text>
    </View>
  )
}


export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Title>Authentification</Title>
        <LoginTimetrack
          webClientId={webClientId}
          onGoogleError={(err) => { console.warn(err) }}
          onTimetrackError={(err) => { console.warn("TIMETRACK ERROR: " + err) }}
          onSuccess={(user, logout) => { console.warn("OK") }}
          RenderLoading={ () => <Text>Loading...</Text> }
        />
        <View style={{alignItems: "center"}}>
        </View>
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
