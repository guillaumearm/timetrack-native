import React, {Text, View, ListView, TouchableHighlight} from 'react-native'
const companies = require('../../data/companies')

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
const dataSource = ds.cloneWithRows(companies)

const Touch = TouchableHighlight

export default () =>
  <View style={styles.list}>
    <ListView
      dataSource={dataSource}
      renderRow={x => {
        return (
          <Touch underlayColor="white" style={{}}>
            <View style={styles.element}>
              <Text style={styles.text}>{x.name}</Text>
            </View>
          </Touch>
        )}}
    />
</View>

const styles = {
    list: {
      flex: 0.9,
    },
    element: {
      alignItems: "center",
      paddingTop: 22,
      paddingBottom: 22,
      borderBottomWidth: 1,
    },
    text: {
      color: "rgb(42, 42, 42)",
      fontSize: 32,
    }
}
