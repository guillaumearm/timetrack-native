import React, {cloneElement, Component, PropTypes, Text, View, TouchableHighlight} from 'react-native'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'

const Touch = TouchableHighlight

export class LoginButton extends Component {
  static propTypes = {
    webClientId: PropTypes.string.isRequired,
    offlineAccess: PropTypes.bool,
    children: PropTypes.element,
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
      console.warn(err)
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
          <Touch underlayColor="white" onPress={() => {this._logout()}}>
            <Text style={{fontSize: 22}}>Logout</Text>
          </Touch>
          {cloneElement(this.props.children, {user: this.state.user})}
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
