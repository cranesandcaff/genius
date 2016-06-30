const React = require('react');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;

const LoginForm = React.createClass({
  getInitialState() {
    return {
      username: "",
      password: "",
      errors: {}
    };
  },

  componentDidMount(){
    this.sessionListener = SessionStore.addListener(this._sessionChanged);
    this.errorListener = ErrorStore.addListener(this._errorsChanged);
    this.formName = "login";
  },

  componentWillUnmount(){
    this.sessionListener.remove();
    this.errorListener.remove();
  },

  _sessionChanged(){
    const user = SessionStore.currentUser();
    if (user.username) {
      hashHistory.push("/");
    }
  },

  _errorsChanged(){
    this.setState({ errors: ErrorStore.formErrors("login") });
  },

  handleUsernameChange(e){
    this.setState({ username: e.target.value });
  },

  handlePasswordChange(e){
    this.setState({ password: e.target.value });
  },

  handleSubmit(e){
    e.preventDefault();
    const user = this.state;
    SessionActions.login(user, this.formName);
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p className="form-error">{this.state.errors.errors}</p>
        <label>Username:
          <input type="text"
                 value={this.state.username}
                 onChange={this.handleUsernameChange}>
          </input>
        </label>

        <label>Password:
          <input type="password"
                 value={this.state.password}
                 onChange={this.handlePasswordChange}>
          </input>
        </label>

        <input value="Login"
               type="submit">
        </input>
      </form>
    );
  }
});

module.exports = LoginForm;
