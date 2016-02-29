import React from 'react-native'
import {List} from '../widgets'

const companies = require('../../data/people')

export default () => {
  return <List entities={companies} toString={(x) => x.firstName + " " + x.lastName}/>
}
