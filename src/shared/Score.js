import React, { Component } from 'react';
import { signup, signin, updateScore, getScore } from '../browser/api';

const Message = ({user, score}) => {
  return (
    <React.Fragment>
      <h3 className="score__header">{`Streak: ${score}`}</h3>
      {user ? (
        <p className="score__message">Signed in as: <strong>{user.email}</strong></p>
      ) : (
        <p className="score__message">Sign up to save your streak</p>
      )}
    </React.Fragment>
  );
};

class Score extends Component {
  state = {
    token: undefined,
    user: undefined,
    emailInput: '',
    passwordInput: '',
    formVisible: false,
    isSigningUp: true,
  };
  componentDidMount() {
    if (localStorage.getItem('token')) {
      getScore()
        .then(({user}) => {
          this.props.updateScoreOnLogin(user.score);
          this.setState({
            token: localStorage.getItem('token'),
            user,
          });
        });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.score !== prevProps.score && this.state.token) {
      updateScore(this.props.score);
    }
  }
  resetForm() {
    this.setState({
      emailInput: '',
      passwordInput: '',
      formVisible: false,
    });
  }
  handleLoggedin = ({user, token}) => {
    localStorage.setItem('token', token);
    this.props.updateScoreOnLogin(user.score)
    this.setState({
      user,
      token,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { emailInput, passwordInput, isSigningUp } = this.state;
    this.resetForm();
    if (isSigningUp) {
      return signup(emailInput, passwordInput)
        .then(this.handleLoggedin);
    }
    return signin(emailInput, passwordInput)
      .then(this.handleLoggedin);
  }
  showForm = ({isSigningUp}) => {
    this.setState({
      formVisible: true,
      isSigningUp,
    });
  }
  hideForm = e => {
    e.preventDefault();
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
    const { user, emailInput, passwordInput, formVisible, isSigningUp, token } = this.state;
    return (
      <div className="score">
        <Message user={user} score={this.props.score} />
        {token ? null : (
          <React.Fragment>
            <form className={`${formVisible ? 'column-layout' : 'hidden'}`}>
              <input className="score__form-item" placeholder="email" type="email" value={emailInput} name="emailInput" onChange={this.updateField} />
              <input className="score__form-item" placeholder="password" type="password" value={passwordInput} name="passwordInput" onChange={this.updateField} />
              <div className="score__form-item">
                <button type="button" onClick={this.hideForm}>
                  <svg width="15" height="12" viewBox="0 0 492 492">
                    <path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
                      c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
                      L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
                      c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
                      c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
                      C492,219.198,479.172,207.418,464.344,207.418z"/>
                  </svg>
                </button>
                <button onClick={this.handleSubmit}>{isSigningUp ? 'Sign up' : 'Sign in'}</button>
              </div>
            </form> 
            <div>
              {formVisible ? null : (
                <React.Fragment>
                  <button onClick={() => this.showForm({isSigningUp: true})}>Sign up</button>
                  <button onClick={() => this.showForm({isSigningUp: false})}>Sign in</button>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
      
    );
  }
}

export default Score;