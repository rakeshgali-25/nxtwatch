import './index.css'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd, MdPlaylistAddCheck} from 'react-icons/md'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'

import SideBar from '../SideBar'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {videoDetails: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getTheData()
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  getTheData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const apiUrl = ` https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      console.log(updatedData)
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getDiff = publishedAt => {
    const diff = formatDistanceToNow(new Date(publishedAt))
    return diff
  }

  renderSuccess = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {videoDetails} = this.state
        const {
          channel,
          description,
          id,
          publishedAt,
          thumbnailUrl,
          title,
          videoUrl,
          viewCount,
        } = videoDetails
        const {name, profileImageUrl, subscriberCount} = channel
        console.log(videoUrl)
        const difference = this.getDiff(publishedAt)
        const {onClickSaved, savedVideos} = value
        const saveClicked = () => {
          onClickSaved(id)
          console.log(savedVideos)
        }

        return (
          <div className="video-details">
            <ReactPlayer url={videoUrl} width="800px" height="600px" controls />
            <p className="video-title">{title}</p>
            <div className="views-container">
              <p className="para-left">
                {viewCount} views . {difference} ago
              </p>
              <div className="like-container">
                <p className="para">
                  <BiLike /> Like
                </p>
                <p className="para">
                  <BiDislike /> Dislike
                </p>
                <button type="button" onClick={saveClicked}>
                  <p className="para">
                    <MdPlaylistAdd /> Save
                  </p>
                </button>
              </div>
            </div>
            <hr className="line" />
            <div className="video-below-container">
              <img
                src={profileImageUrl}
                alt="channel"
                className="channel-icon"
              />
              <div className="para-container">
                <p className="title">{name}</p>
                <p className="details-para">{subscriberCount} subscribers</p>
                <p className="details-para">{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

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

  renderVideoDetails = () => {
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
          {this.renderVideoDetails()}
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
