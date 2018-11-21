import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'

import UserProfileInfo from '../components/UserProfileInfo'
import ItemsListContainer from '../containers/ItemsListContainer'

class ProfileContentContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeTab: "My_Items" 
    }
  }

  handleOnClick(activeTab){
    console.log(activeTab);
    this.setState({
      activeTab:activeTab
    })
  }

  render() {
    console.log(this.props.viewingMyProfile)
      return (
        <div className="profile-content-container">
        <Grid columns={2} divided>
            <div class="ui pointing menu">
              <a class={`item ${this.state.activeTab == "My_Items"? "active" :""}`} onClick = {() => this.handleOnClick("My_Items")} >
                Items
              </a>
              <a class={`item ${this.state.activeTab == "My_Transactions"? "active" :""}`} onClick = {() => this.handleOnClick("My_Transactions")}>
                Transactions
              </a>
              <a class={`item ${this.state.activeTab == "My_Contacts"? "active" :""}`} onClick = {() => this.handleOnClick("My_Contacts")}>
                Contacts
              </a>
              <a class={`item ${this.state.activeTab == "Reviews"? "active" :""}`} onClick = {() => this.handleOnClick("Reviews")}>
                Reviews
              </a>
              <div class="right menu">
                <div class="item">
                  <div class="ui transparent icon input">
                    <input type="text" placeholder="Search..."/>
                    <i class="search link icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="ui segment">
            { this.state.activeTab == "My_Items"? <p> <ItemsListContainer /> </p>: null} 
            { this.state.activeTab == "My_Transactions"? <p> transactions </p>: null} 
            { this.state.activeTab == "My_Contacts"? <p> contact </p>: null} 
            { this.state.activeTab == "Reviews"? <p> reviewee_id </p>: null} 
            </div>
          </Grid>
        </div>
  );
}
}

export default ProfileContentContainer;