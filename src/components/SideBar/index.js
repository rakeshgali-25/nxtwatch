import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdWhatshot} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {v4 as uuidv4} from 'uuid'
import {ListContainer, Item, CompanyImage} from './styledComponents'
import SideBarItem from '../SideBarItem'

import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'

const sideBarItems = [
  {
    id: 'HOME',
    path: '/',
    icon: <AiFillHome className="sidebar-icon" />,
    para: 'Home',
    isActive: true,
  },
  {
    id: 'TRENDING',
    path: '/trending',
    icon: <MdWhatshot className="sidebar-icon" />,
    para: 'Trending',
    isActive: false,
  },
  {
    id: 'GAMING',
    path: '/gaming',
    icon: <SiYoutubegaming className="sidebar-icon" />,
    para: 'Gaming',
    isActive: false,
  },
  {
    id: 'SAVEDVIDEOS',
    path: '/savedvideos',
    icon: <BiListPlus className="sidebar-icon" />,
    para: 'Saved Videos',
    isActive: false,
  },
]

class SideBar extends Component {
  state = {sideBarList: sideBarItems}

  onClickIcon = async id => {
    const {sideBarList} = this.state
    const updatedList = await sideBarList.map(each => {
      if (each.id === id) {
        return {...each, isActive: !each.isActive}
      }
      return {...each, isActive: false}
    })
    console.log(updatedList)
    this.setState({sideBarList: updatedList})
  }

  renderSidebar = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        console.log(lightTheme)
        const sdBg = lightTheme ? 'lightBg' : 'darkBg'
        const companyLogo = lightTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

        const para = lightTheme ? 'light-para' : 'dark-para'
        const {sideBarList} = this.state
        return (
          <div className={`sidebar-container ${sdBg}`}>
            <CompanyImage src={companyLogo} alt="logo" />
            <ListContainer>
              {sideBarList.map(each => (
                <SideBarItem
                  each={each}
                  key={each.key}
                  onClickIcon={this.onClickIcon}
                />
              ))}
            </ListContainer>
            <div className="below-container">
              <p className={`contact-us ${para}`}>CONTACT US</p>
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
              <p className={para}>
                Enjoy Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    const theme = this.renderSidebar()

    return <>{this.renderSidebar()}</>
  }
}
export default SideBar
