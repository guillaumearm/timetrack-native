import React from 'react-native'
import {List} from '../widgets'

const companies = require('../../data/companies')

export default () => {
  return <List entities={companies} toString={(x) => x.name}/>
}
