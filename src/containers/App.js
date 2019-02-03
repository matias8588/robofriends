import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardList from '../components/CardList.js'
import SearchBox from '../components/SearchBox.js'
import '../css/app.scss'
import Scroll from '../components/Scroll.js'
import ErrorBoundary from '../components/ErrorBoundary'
import { setSearchField, requestRobots } from '../actions'

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return { onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {

  componentDidMount () {
    this.props.onRequestRobots()
  }
  render () {
    const { searchField, onSearchChange, robots, isPending } = this.props
    const filteredRobot = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return isPending ? <h1>Cargando</h1>
      : (<div className='tc mt0'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobot} />
          </ErrorBoundary>
        </Scroll>
      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
