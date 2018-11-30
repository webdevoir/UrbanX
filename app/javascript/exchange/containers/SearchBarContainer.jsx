import React, { Component } from 'react';
import _ from 'lodash'
import { Search, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { filterItems, searchItems } from '../actions/itemsActions';


class SearchBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: ''
    }

    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      value: ''
    })
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.title });
    this.props.filterItems('All', '', result.title)
  }

  handleSearchChange(e, { value }){
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      this.props.searchItems(this.state.value)

      this.setState({
        isLoading: false,
      })
    }, 300)
  }

  render() {
    const { isLoading, value } = this.state

    return (
      <Grid className="header-search-container">
        <Grid.Column>
          <Search
            className="header-search"
            loading={ isLoading }
            onResultSelect={ this.handleResultSelect }
            onSearchChange={ _.debounce(this.handleSearchChange, 500, { leading: true }) }
            results={ this.props.filtered_item_names_for_search }
            value={ value }
            fluid
            { ...this.props }
          />
        </Grid.Column>
      </Grid>
    )
  }
}

SearchBarContainer.propTypes = {
  filterItems: PropTypes.func.isRequired,
  searchItems: PropTypes.func.isRequired,
  filtered_item_names_for_search: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  filtered_item_names_for_search: state.items.filtered_item_names_for_search
});

export default connect(mapStateToProps, { filterItems, searchItems })(SearchBarContainer);
