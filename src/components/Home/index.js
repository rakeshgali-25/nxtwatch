import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import NxtWatchBanner from '../NxtWatchBanner'
import VideoItem from '../VideoItem'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    banner: true,
    videosList: [],
    searchInput: '',
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

  getTheData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

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
      this.setState({videosList: updatedData, apiStatus: apiConstants.success})
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

  renderSearchBar = () => (
    <div className="search-container">
      <input
        type="search"
        className="search-input"
        onChange={this.onChangeInput}
      />
      <div className="search-icon">
        <BsSearch onClick={this.onClickSearch} />
      </div>
    </div>
  )

  renderSuccess = () => {
    const {videosList} = this.state
    console.log(videosList)

    return (
      <ul className="un-list">
        {videosList.map(each => (
          <VideoItem each={each} key={each.id} />
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
    const {banner} = this.state
    return (
      <div className="home-container">
        <SideBar />
        <div className="display-container">
          <Header />
          {banner && <NxtWatchBanner onClickInto={this.onClickInto} />}
          <div className="below-home-container">
            {this.renderSearchBar()}
            {this.renderTheVideos()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
