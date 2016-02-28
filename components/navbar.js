import React, {Component, Text, View, TouchableHighlight} from 'react-native'

const Touch = TouchableHighlight

class NavBar extends Component {
  componentWillMount() {
    this.setState({items : this.props.items.map((x, i) => {
      return {
        id: i,
        ...x,
        selected: (x.name === this.props.route.name) ? (true) : (false),
        onPress: () => {
          const selected = this.state.items[i].selected
          this.setState({items: this.state.items.map(y => {
            return (i === y.id) ? ({...y, selected: true}) : ({...y, selected: false})
          })})
          if (!selected) x.onPress(this.props.router)
        }
      }
    })})
  }

  render() {
    const elements = this.state.items.map(x => {
      return (
        <Touch key={x.id} onPress={x.onPress}>
          <View style={((x.selected) ? (styles.selectedElement) : (styles.element))}>
            <Text style={styles.text}>{x.title}</Text>
          </View>
        </Touch>
      )
    })

    return (
      <View style={styles.navbar}>
        {elements}
      </View>
    )
  }
}

export default NavBar

const styles = {
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 0.08,
    backgroundColor: 'black',
  },
  element: {
    padding: 22,
  },
  selectedElement: {
    backgroundColor: 'rgb(42, 42, 42)',
    padding: 22,
  },
  text: {
    color: "white",
  }
}
