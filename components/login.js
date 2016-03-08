import React, {cloneElement, Component, PropTypes, Text, View, TouchableHighlight} from 'react-native'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'

const Touch = TouchableHighlight

const QueryForTimetrackServer = ({token, onTimetrackError, onSuccess, logout}) => {
  const options = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id_token: token})
  }

  fetch('http://rp3.redpelicans.com:7011/login', options)
  .then(res => res.text())
  .then(res => {
    const user = JSON.parse(res).user
    onSuccess(user, logout)
  })
  .catch(err => { onTimetrackError(err) })

  return (<View/>)
}

QueryForTimetrackServer.propTypes = {
  token: PropTypes.string.isRequired,
  onTimetrackError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export class LoginTimetrack extends Component {
  static propTypes = {
    webClientId: PropTypes.string.isRequired,
    onGoogleError: PropTypes.func.isRequired, // merge into one onError (with error type)
    onTimetrackError: PropTypes.func.isRequired, // merge into one onError (with error type)
    onSuccess: PropTypes.func.isRequired,
    RenderLoading: PropTypes.func, //stateless component
  };

  state = {};

  componentDidMount(){
    const {webCLientId} = this.props
    GoogleSignin.configure({
      webClientId: this.props.webClientId,
    })
    GoogleSignin.currentUserAsync().then(user => {
      this.setState({user: user})
    }).done()
  }

  _login() {
    const {onGoogleError} = this.props
    GoogleSignin.signIn()
    .then(user => {
      this.setState({user: user})
    })
    .catch(err => { onGoogleError(err) })
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
    const {onTimetrackError, onSuccess, RenderLoading} = this.props
    if (this.state.user) {
      return (
        <QueryForTimetrackServer
          token={this.state.user.idToken}
          logout={this._logout}
          onTimetrackError={onTimetrackError}
          onSuccess={onSuccess}
        />
      )
    }
    else if (this.state.user === null) {
      return (
        <GoogleSigninButton
          style={{width: 312, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {this._login()}}
        />
      )
    }
    else if (RenderLoading)
      return <RenderLoading />
    else
      return <View/>
  }
}
