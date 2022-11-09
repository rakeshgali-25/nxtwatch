import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'

class TrendingItem extends Component {
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
      <li className="list-trending-item">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="trending-thumbnail-image"
        />

        <div className="trending-para-container">
          <p className="channel-title">{title}</p>
          <p className="channel-para">{name}</p>
          <div>
            <p className="channel-para">
              {viewsCount} views . {difference}
            </p>
          </div>
        </div>
      </li>
    )
  }
}

export default TrendingItem
