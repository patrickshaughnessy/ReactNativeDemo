import React from 'react'
import {
  View,
  Text,
  ListView,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import { Actions as NavigationActions } from 'react-native-router-flux'
import Actions from '../Actions/Creators'

// Styles
import styles from './Styles/LookupResultsStyle'

class LookupResults extends React.Component {

  constructor (props) {
    super(props)

    const dataObjects = this.props.results

    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }
  }

  _handlePress = (symbol) => {
    const { requestQuote } = this.props
    requestQuote(symbol)
    NavigationActions.detailView()
  }

  _renderRow = (rowData) => {
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => this._handlePress(rowData.Symbol)}>
          <Text style={styles.boldLabel}>{rowData.Symbol}</Text>
          <Text style={styles.label}>{rowData.Name}</Text>
          <Text style={styles.label}>{rowData.Exchange}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  componentWillReceiveProps (newProps) {
    if (newProps.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.results)
      })
    }
  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View style={styles.container}>
        {this._noRowData()
          ? <Text style={styles.emptyText}>No Results</Text>
            : <ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.lookup.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestQuote: (symbol) => dispatch(Actions.requestQuote(symbol))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookupResults)
