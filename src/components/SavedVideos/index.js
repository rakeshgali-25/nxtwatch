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

  componentDidMount() {
    this.getTheData()
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  getTheData = async () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideos} = value
        console.log(savedVideos)
        if (savedVideos !== []) {
          this.setState({
            savedList: savedVideos,
            apiStatus: apiConstants.success,
          })
        } else {
          this.setState({apiStatus: apiConstants.failure})
        }
      }}
    </NxtWatchContext.Consumer>
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

  renderSuccess = () => {
    const {savedList} = this.state
    console.log(savedList)
    return (
      <ul className="un-trending-list">
        {savedList.map(each => (
          <li>{each.name}</li>
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We are having some trouble to complete your request.
      </p>
      <p className="failure-para">Please try again</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderTheVideos = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      case 'INPROGRESS':
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <SideBar />
        <div className="display-container">
          <Header />
          {this.renderSavedBanner()}
          <div className="below-trending-container">
            {this.renderTheVideos()}
          </div>
        </div>
      </div>
    )
  }
}

export default SavedVideos
