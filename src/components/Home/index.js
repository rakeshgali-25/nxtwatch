import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import NxtWatchBanner from '../NxtWatchBanner'
import VideoItem from '../VideoItem'
import NxtWatchContext from '../../context/NxtWatchContext'

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

    if (response.ok === true) {
      this.setState({videosList: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickInto = () => {
    const {banner} = this.state
    this.setState(prevState => ({banner: !prevState.banner}))
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
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        const sdBg = lightTheme ? 'lightBg' : 'darkBg'

        return (
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              onChange={this.onChangeInput}
              placeholder="Search"
            />
            <div className={`search-icon ${sdBg}`}>
              <BsSearch onClick={this.onClickSearch} />
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSuccess = () => {
    const {videosList} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme} = value
          const homeBg = lightTheme ? 'light-home-bg' : 'dark-home-bg'
          return (
            <ul className={`un-list ${homeBg}`}>
              {videosList.map(each => (
                <VideoItem each={each} key={each.id} />
              ))}
            </ul>
          )
        }}
      </NxtWatchContext.Consumer>
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
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme} = value
          const homeBg = lightTheme ? 'light-home-bg' : 'dark-home-bg'
          return (
            <div className="home-container">
              <SideBar />
              <div className="display-container">
                <Header />
                {banner && <NxtWatchBanner onClickInto={this.onClickInto} />}
                <div className={`below-home-container ${homeBg}`}>
                  {this.renderSearchBar()}
                  {this.renderTheVideos()}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
