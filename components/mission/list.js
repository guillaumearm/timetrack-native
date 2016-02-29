import React from 'react-native'
import {List} from '../widgets'

const missions = require('../../data/missions')

export default () => {
  return <List entities={missions} toString={(x) => x.name}/>
}
