import {Component} from 'react'
import {BsMoon} from 'react-icons/bs'
import {BiSun} from 'react-icons/bi'

import {
  LogoutButton,
  HeaderContainer,
  CompanyImage,
  Profile,
  Icon,
  RightContainer,
} from './styledComponents'

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <RightContainer>
          <Icon>
            <BsMoon />
          </Icon>

          <Profile
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="profile"
          />

          <LogoutButton>Logout</LogoutButton>
        </RightContainer>
      </HeaderContainer>
    )
  }
}

export default Header
