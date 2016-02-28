import React, {PropTypes, Text, View} from 'react-native'

export const Error = ({children}) => {
  return (<Text style={{color: "red"}}>{children}</Text>)
}
Error.propTypes = {
  children: PropTypes.string,
}

export const ConsoleWarn = (props) => {
  console.warn(props.children)
  return (<View/>)
}

export const ConsoleLog = (props) => {
  console.log(props.children)
  return (<View/>)
}
