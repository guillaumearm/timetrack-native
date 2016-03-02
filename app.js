/* @flow */
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

//const webClientId = "538845155711-be2jo7f82ecrenk57oirsafbtt25detf.apps.googleusercontent.com"
const webClientId = "1013003508849-ke0dsjttftqcl0ee3jl7nv7av9iuij8p.apps.googleusercontent.com"

// Routes
import {Router, Route} from './react-native-router'
import CompanyList from './components/company/list'
import PersonList from './components/person/list'
import MissionList from './components/mission/list'

import {Menu} from './components/menu'

import {LoginButton} from './components/login'


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

class QueryTimetrackServer extends Component {
state = {};

componentDidMount() {
  const {id_token} = this.props.user
  const options = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id_token})
  };

  fetch('http://rp3.redpelicans.com:5004/login', options)
  .then(res => {
    console.warn("HERE");
    return res.text()
  })
  .then(res => {
    this.setState({user: res})
    console.warn("OK: ", res);
  })
  .catch(err => {
    console.warn("ERROR: ", err)
  })
}

render() {
    const {user} = this.props
    const id_token = user.idToken
    console.warn(user);

    if (this.state.user){
      return (
        <Text>Congratulations, you are logged on redpelicans timetrack server</Text>
      )
    }
    
    return (
      <View>
        <Text>Hello {user.name}</Text>
        <Text>server id token :  {user.idToken}</Text>
      </View>
    )
  }
}

export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Title>Authentification</Title>
        <LoginButton webClientId={webClientId}>
          <QueryTimetrackServer/>
        </LoginButton>
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
