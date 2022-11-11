import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdWhatshot} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {ListContainer, Item, CompanyImage} from './styledComponents'

import './index.css'

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <CompanyImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
        />
        <ListContainer>
          <Link to="/" className="link">
            <Item>
              <AiFillHome className="sidebar-icon" />
              <p>Home</p>
            </Item>
          </Link>
          <Link to="/trending" className="link">
            <Item>
              <MdWhatshot className="sidebar-icon" />
              <p>Trending</p>
            </Item>
          </Link>
          <Link to="/gaming" className="link">
            <Item>
              <SiYoutubegaming className="sidebar-icon" />
              <p>Gaming</p>
            </Item>
          </Link>
          <Link to="/savedvideos" className="link">
            <Item>
              <BiListPlus className="sidebar-icon" />
              <p>Saved Videos</p>
            </Item>
          </Link>
        </ListContainer>
        <div className="below-container">
          <p className="contact-us">CONTACT US</p>
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook"
              className="logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter"
              className="logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="linkedin"
              className="logo"
            />
          </div>
          <p className="para">
            Enjoy Now to see your channels and recommendations!
          </p>
        </div>
      </div>
    )
  }
}

export default SideBar
