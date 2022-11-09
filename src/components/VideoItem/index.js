import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'

class VideoItem extends Component {
  getDiff = publishedAt => {
    const diff = formatDistanceToNow(new Date(publishedAt))
    return diff
  }

  render() {
    const {each} = this.props
    const {channel, id, publishedAt, viewsCount, title, thumbnailUrl} = each
    const {name, profileImageUrl} = channel
    const difference = this.getDiff(publishedAt)
    return (
      <li className="list-item">
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
        <div className="channel-container">
          <img src={profileImageUrl} alt="channel" className="channel-image" />
          <div>
            <p className="channel-para">{title}</p>
            <p className="channel-para">{name}</p>
            <div>
              <p className="channel-para">
                {viewsCount} views . {difference}
              </p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default VideoItem
