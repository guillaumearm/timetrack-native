import React, {Text, View} from 'react-native'

export default () =>
  <View style={styles.list}>
    <Text style={{color: "rgb(42,42,42)", fontSize: 42, alignSelf: "center"}}>PEOPLE</Text>
  </View>

const styles = {
    list: {
      flex: 0.9
    }
}
