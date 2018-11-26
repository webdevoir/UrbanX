import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


class SignUpButton extends Component {
  render() {
    return (
      <Link to="/users/sign_up">
        <Button>
          Sign Up
        </Button>
      </Link>
    );
  }
}

export default SignUpButton;