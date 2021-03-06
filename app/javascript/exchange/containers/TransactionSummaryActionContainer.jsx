import React, { Component } from 'react';
import { Button, Icon, Image, Form, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { updateTransaction, deleteTransaction } from '../actions/itemsActions' 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayFlash } from '../actions/flashActions';


class TransactionSummaryActionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      due_date: '',
      status: this.props.transaction.status,
      due_date_error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLend = this.handleLend.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
    console.log(this.state.due_date)
  }

  handleLend(e, transaction) {
  	if (this.state.due_date == '') {
  		this.setState({
  			due_date_error: true
  		});
  	}
  	else {
	    transaction.expiry_date = this.state.due_date;
	    transaction.status = 'lent';
	    this.props.updateTransaction(transaction, this.props.userProfileId, this.props.cur_status);
      this.displayMessage('Item lent.', 'positive');
	}
  }

  handleReturn(e, transaction) {
    transaction.status = 'completed';
    this.props.updateTransaction(transaction, this.props.userProfileId, this.props.cur_status);
    this.displayMessage('Item returned.', 'positive');

  }

  handleDelete(e, transaction) {
    this.props.deleteTransaction(transaction, this.props.userProfileId, this.props.cur_status);
    this.displayMessage('Request removed.', 'negative');
  }

  displayMessage(flash_message, pos_or_neg) {
    this.props.displayFlash(flash_message, true, pos_or_neg);
  }

  render() {
    let dueDateForm = null;
    let declineButton = null;
    let returnButton = null;
    let dueDateError = null;

    let due_date = this.state.due_date;

    if (this.props.transaction.status == 'pending' && this.props.transaction.lender_id == this.props.currentUserId) {
      let activeTransaction = this.props.filtered_transactions.find(
          (e) => e.status == 'lent' && e.lender_id == this.props.currentUserId && e.item_id == this.props.transaction.item_id);
      if (!activeTransaction) {
        dueDateForm = (
                      <Form className="new-item-form" onSubmit={ e => this.handleLend(e, this.props.transaction) }>
                        <Form.Field>
                          <label>Due Date</label>
                            <Form.Input type="date" placeholder="Due Date"
                             name="due_date" value={ due_date } onChange={ this.handleChange }/>
                        </Form.Field>

                        <Form.Button floated="right" content="Submit">
                          Lend
                        </Form.Button>
                      </Form>
                  );
      }

      declineButton = (
                        <Button floated="right" onClick={ e => this.handleDelete(e, this.props.transaction) }>
                          Decline
                        </Button>
                      );
    }
    else if (this.props.transaction.status == 'pending' && this.props.transaction.borrower_id == this.props.currentUserId) {
      declineButton = (
                        <Button floated="right" onClick={ e => this.handleDelete(e, this.props.transaction) }>
                          Cancel
                        </Button>
                      );
    }
    else if (this.props.transaction.status == 'lent' && this.props.transaction.lender_id == this.props.currentUserId) {
      returnButton = (
                      <Button floated="right" onClick={ e => this.handleReturn(e, this.props.transaction) }>
                        Returned
                      </Button>
                      );
    }

    if (this.state.due_date_error) {
    	dueDateError = (
    					<strong className="due_date_error">
    						Invalid date.
    					</strong>
    					);
    }

    return (
	    	<div>
	    		{dueDateError}
	    		{returnButton}
		        {dueDateForm}
		        {declineButton}
		    </div>
    		);
	}
}

TransactionSummaryActionContainer.propTypes = {
  updateTransaction: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  filtered_transactions: state.items.filtered_transactions,
  cur_status: state.items.cur_status,
  currentUserId: state.user.user_info.user_id,
  userProfileId: state.user.user_info.user_profile_id
});

export default connect(mapStateToProps, { updateTransaction, deleteTransaction, displayFlash })(TransactionSummaryActionContainer);