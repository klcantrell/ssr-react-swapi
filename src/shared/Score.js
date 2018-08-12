import React, { Component } from 'react';
import { signup, signin } from '../browser/api';

class Score extends Component {
  state = {
    token: undefined,
    user: undefined,
    emailInput: '',
    passwordInput: '',
    formVisible: false,
    isSigningUp: true,
  };
  resetForm() {
    this.setState({
      emailInput: '',
      passwordInput: '',
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { emailInput, passwordInput, isSigningUp } = this.state;
    this.resetForm();
    if (isSigningUp) {
      return signup(emailInput, passwordInput)
        .then(({user, token}) => {
          this.setState({
            user,
            token,
          })
        });
    }
    return signin(emailInput, passwordInput)
      .then(({user, token}) => {
        this.setState({
          user,
          token,
        })
      });
  }
  showForm = ({isSigningUp}) => {
    this.setState({
      formVisible: true,
      isSigningUp,
    });
  }
  hideForm = () => {
    this.setState({
      formVisible: false,
    });
  }
  updateField = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { user, emailInput, passwordInput, formVisible, isSigningUp } = this.state;
    return (
      <div className="score">
        <h3 className="score__header">{`Streak: ${(user && user.score) || '0'}`}</h3>
        <p className="score__message">Sign up to save your streak</p>
        <form style={formVisible ? { display: 'block' } : { display: 'none' }}>
          <input type="email" value={emailInput} name="emailInput" onChange={this.updateField} />
          <input type="password" value={passwordInput} name="passwordInput" onChange={this.updateField} />
          <button onClick={this.handleSubmit}>{isSigningUp ? 'Sign Up' : 'Sign In'}</button>
        </form> 
        <div>
          {formVisible ? (
            <button onClick={this.hideForm}>X</button>
          ) : (
            <React.Fragment>
              <button onClick={() => this.showForm({isSigningUp: true})}>Sign up</button>
              <button onClick={() => this.showForm({isSigningUp: false})}>Sign in</button>
            </React.Fragment>
          )}
        </div>
      </div>
      
    );
  }
}

export default Score;