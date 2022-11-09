import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {Loader} from 'react-loader-spinner'
import {MdWhatshot} from 'react-icons/md'
import Header from '../Header'
import SideBar from '../SideBar'
import NxtWatchBanner from '../NxtWatchBanner'
import VideoItem from '../VideoItem'
import TrendingItem from '../TrendingItem'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingList: [],

    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getTheData()
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getTheData = async () => {
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = ` https://apis.ccbp.in/videos/trending`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.videos.map(each => ({
      id: each.id,
      title: each.title,
      publishedAt: each.published_at,
      thumbnailUrl: each.thumbnail_url,
      viewCount: each.view_count,
      channel: {
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      },
    }))
    console.log(updatedData)
    if (response.ok === true) {
      this.setState({
        trendingList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickInto = () => {
    const {banner} = this.state
    this.setState(prevState => ({banner: !prevState.banner}))
    console.log(banner)
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getTheData)
  }

  onClickRetry = () => {
    console.log('retry')
    this.getTheData()
  }

  renderTrendingBanner = () => (
    <div className="trending-banner">
      <div className="icon-container">
        <MdWhatshot className="trending-icon" />
      </div>
      <h1 className="trending">Trending</h1>
    </div>
  )

  renderSuccess = () => {
    const {trendingList} = this.state
    console.log(trendingList)

    return (
      <ul className="un-trending-list">
        {trendingList.map(each => (
          <TrendingItem each={each} key={each.id} />
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
          {this.renderTrendingBanner()}
          <div className="below-trending-container">
            {this.renderTheVideos()}
          </div>
        </div>
      </div>
    )
  }
}

export default Trending
