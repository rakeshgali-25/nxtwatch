import {Component} from 'react'
import {BsMoon} from 'react-icons/bs'
import {BiSun} from 'react-icons/bi'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

import {
  LightLogoutButton,
  DarkLogoutButton,
  HeaderContainer,
  CompanyImage,
  Profile,
  Icon,
  RightContainer,
} from './styledComponents'

class Header extends Component {
  render() {
    return (
      <NxtWatchContext>
        {value => {
          const {lightTheme, onClickTheme} = value

          const themeClicked = () => {
            onClickTheme()
            console.log(lightTheme)
          }

          const themeIcon = lightTheme ? <BsMoon /> : <BiSun />
          const bgColor = lightTheme ? '#ffffff' : '#231f20'
          return (
            <HeaderContainer color={bgColor}>
              <RightContainer>
                <button type="button" onClick={themeClicked}>
                  <Icon>{themeIcon}</Icon>
                </button>
                <Profile
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile"
                />

                {lightTheme ? (
                  <LightLogoutButton>Logout</LightLogoutButton>
                ) : (
                  <DarkLogoutButton>Logout</DarkLogoutButton>
                )}
              </RightContainer>
            </HeaderContainer>
          )
        }}
      </NxtWatchContext>
    )
  }
}

export default Header
