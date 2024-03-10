import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    userName: '',
    password: '',
    showSubmiterror: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmiterror: true, errorMsg})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onsubmitLogin = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userName, password, showSubmiterror, errorMsg} = this.state

    return (
      <div className="app-container">
        <div className="responsive-container">
          <form onSubmit={this.onsubmitLogin}>
            <div className="form">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                className="img"
                alt="website logo"
              />
              <label htmlFor="userName">UserName</label>
              <input
                type="text"
                placeholder="Username"
                id="userName"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="Password"
                onChange={this.onChangePassword}
              />
              <button type="submit" className="button">
                Login
              </button>
              {showSubmiterror && <p className="error-msg">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
