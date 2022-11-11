import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdWhatshot} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {ListContainer, Item, CompanyImage} from './styledComponents'
import SideBarItem from '../SideBarItem'

import './index.css'

const sideBarItems = [
  {
    id: 1,
    path: '/',
    icon: <AiFillHome className="sidebar-icon" />,
    para: 'Home',
    isActive: false,
  },
  {
    id: 2,
    path: '/trending',
    icon: <MdWhatshot className="sidebar-icon" />,
    para: 'Trending',
    isActive: false,
  },
  {
    id: 3,
    path: '/gaming',
    icon: <SiYoutubegaming className="sidebar-icon" />,
    para: 'Gaming',
    isActive: false,
  },
  {
    id: 4,
    path: '/savedvideos',
    icon: <BiListPlus className="sidebar-icon" />,
    para: 'Saved Videos',
    isActive: false,
  },
]

class SideBar extends Component {
  state = {sideBarList: sideBarItems}

  onClickIcon = id => {
    console.log(id)
  }

  render() {
    return (
      <div className="sidebar-container">
        <CompanyImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
        />
        <ListContainer>
          {sideBarItems.map(each => (
            <SideBarItem
              each={each}
              key={each.key}
              onClickIcon={this.onClickIcon}
            />
          ))}
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
