import React, {Text} from 'react-native'

export const Error = ({children}) => {
  return (<Text style={{color: "red"}}>{children}</Text>)
}
