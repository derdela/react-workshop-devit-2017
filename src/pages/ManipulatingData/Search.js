import React from 'react'
import PropTypes from 'prop-types'
import UserListContainer from './UserListContainer'
import users from './data'
import getSearchParams from './getSearchParams'
import './styles.css'

class Search extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    const params = getSearchParams(this.props.location.search)

    this.state = {
      search: params.search || ''
    }
  }

  componentDidUpdate (prevProps) {
    const prevParams = getSearchParams(prevProps.location.search)
    const params = getSearchParams(this.props.location.search)

    if (prevParams.search !== params.search) {
      this.setState({ search: params.search || '' })
    }
  }

  updateSearch = (value) => {
    const updateValue = value ? '?search=' + encodeURIComponent(value) : '?'

    this.context.router.history.push(updateValue)
  }

  handleChange = (event) => {
    this.setState({ search: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const params = getSearchParams(this.props.location.search)

    if (params.search !== this.state.search) {
      this.updateSearch(this.state.search)
    }
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='Form'>
          <label htmlFor='search' className='Label'>Search</label>

          <input
            type='search'
            name='search'
            id='search'
            onChange={this.handleChange}
            value={this.state.search}
            className='Input'
          />

          <button type='submit' className='Button'>
            Search
          </button>
        </form>

        <UserListContainer
          users={users}
          search={this.state.search}
        />
      </div>
    )
  }
}

export default Search
