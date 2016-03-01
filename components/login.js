import React, {Component, PropTypes, Text, View, TouchableHighlight} from 'react-native'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'

const Touch = TouchableHighlight

export class LoginButton extends Component {
  static propTypes = {
    webClientId: PropTypes.string.isRequired,
    offlineAccess: PropTypes.bool,
  };

  state = {};

  componentDidMount(){
    GoogleSignin.configure({
      webClientId: this.props.webClientId,
      offlineAccess: this.props.offlineAccess
    })
    GoogleSignin.currentUserAsync().then(user => {
      this.setState({user: user})
    }).done()
  }

  _login() {
    GoogleSignin.signIn()
    .then(user => {
      this.setState({user: user})
    })
    .catch(err => {
    })
    .done()
  }

  _logout() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut())
    .then(() => {
      this.setState({user: null})
    })
    .done()
  }

  render(){
    if (this.state.user) {
      return (
        <View style={{alignItems: "center"}}>
          <Text>Hello {this.state.user.name}</Text>
          <Touch underlayColor="white" onPress={() => {this._logout()}}>
            <Text style={{fontSize: 22}}>Logout</Text>
          </Touch>
        </View>
      )
    }
    else if (this.state.user === null) {
      return (
        <View style={{alignItems: "center"}}>
          <GoogleSigninButton
            style={{width: 312, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {this._login()}}
          />
        </View>
      )
    }
    else {
      return (
        <Text>Loading...</Text>
      )
    }
  }
}
