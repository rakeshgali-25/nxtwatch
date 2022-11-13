import './App.css'

import {AiFillHome} from 'react-icons/ai'
import {MdWhatshot} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import NxtWatchContext from './context/NxtWatchContext'

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

class App extends Component {
  state = {savedVideos: [], lightTheme: true, activeId: sideBarItems[0].id}

  onClickSaveButton = details => {
    const {savedVideos} = this.state

    if (savedVideos.includes(details)) {
      console.log(details)
    } else {
      this.setState({savedVideos: [...savedVideos, details]}, this.printSaved())
    }
  }

  onClickSideBar = id => {
    this.setState({activeId: id})
  }

  printSaved = () => {
    const {savedVideos} = this.state
    console.log(savedVideos)
  }

  onClickTheme = () => {
    const {lightTheme} = this.state

    this.setState({lightTheme: !lightTheme})
  }

  render() {
    const {savedVideos, lightTheme, activeId} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          savedVideos,
          lightTheme,
          activeId,

          onClickSideBar: this.onClickSideBar,
          onClickTheme: this.onClickTheme,
          onClickSaveButton: this.onClickSaveButton,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <Route exact path="/savedvideos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
