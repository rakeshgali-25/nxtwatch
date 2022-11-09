import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import NxtWatchContext from '../../context/NxtWatchContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    loginFail: false,
    theme: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = ErrorMsg => {
    console.log(ErrorMsg)
    this.setState({errorMsg: ErrorMsg, loginFail: true})
  }

  renderImage = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        console.log(lightTheme)

        if (lightTheme === true) {
          return (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="logo"
              className="company-logo"
            />
          )
        }
        return (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            alt="logo"
            className="company-logo"
          />
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderTheme = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        console.log(lightTheme)

        if (lightTheme === true) {
          return 'light'
        }
        return 'dark'
      }}
    </NxtWatchContext.Consumer>
  )

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showPassword,
      errorMsg,
      loginFail,
      theme,
    } = this.state

    const passwordType = showPassword ? 'text' : 'password'
    const ErrorMsg = loginFail && `*${errorMsg}`

    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <div className="image-container">{this.renderImage()}</div>
          <div className="label-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              placeholder="Username"
              className="input"
              onChange={this.onChangeUsername}
              value={username}
              type="text"
            />
          </div>
          <div className="label-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              placeholder="Password"
              className="input"
              onChange={this.onChangePassword}
              value={password}
              type={passwordType}
            />
          </div>
          <div className="show-password-container">
            <input
              type="checkbox"
              id="checkbox"
              value={showPassword}
              onChange={this.onChangeShowPassword}
            />
            <label htmlFor="checkbox" className="show-password">
              Show Password
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="error-msg">{ErrorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
