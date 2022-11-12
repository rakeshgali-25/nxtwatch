import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {MdWhatshot} from 'react-icons/md'
import Header from '../Header'
import SideBar from '../SideBar'
import NxtWatchBanner from '../NxtWatchBanner'
import VideoItem from '../VideoItem'
import TrendingItem from '../TrendingItem'
import NxtWatchContext from '../../context/NxtWatchContext'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SavedVideos extends Component {
  state = {
    savedList: [],

    apiStatus: apiConstants.initial,
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    console.log('retry')
    this.getTheData()
  }

  renderSavedBanner = () => (
    <div className="trending-banner">
      <div className="icon-container">
        <MdWhatshot className="trending-icon" />
      </div>
      <h1 className="trending">Saved Videos</h1>
    </div>
  )

  renderTheVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideos} = value
        console.log(savedVideos)
        if (savedVideos.length !== 0) {
          return (
            <ul className="un-saved-list">
              {savedVideos.map(each => (
                <TrendingItem each={each} key={each.id} />
              ))}
            </ul>
          )
        }
        return (
          <div className="no-videos-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no-videos"
              className="failure-image"
            />
            <h1>No saved videos found</h1>
            <p className="failure-para">
              You can save your videos while watching them
            </p>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return (
      <div className="home-container">
        <SideBar />
        <div className="display-saved-container">
          <Header />
          {this.renderSavedBanner()}
          <div className="below-saved-container">{this.renderTheVideos()}</div>
        </div>
      </div>
    )
  }
}

export default SavedVideos
