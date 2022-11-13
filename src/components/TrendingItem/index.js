import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

class TrendingItem extends Component {
  getDiff = publishedAt => {
    const diff = formatDistanceToNow(new Date(publishedAt))
    return diff
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {each} = this.props

          const {
            channel,
            id,
            publishedAt,
            viewCount,
            title,
            thumbnailUrl,
          } = each
          const {name, profileImageUrl} = channel
          const difference = this.getDiff(publishedAt)
          const {lightTheme} = value
          const channelTitle = lightTheme
            ? 'channel-light-name'
            : 'channel-dark-name'

          const channelPara = lightTheme
            ? 'channel-light-para'
            : 'channel-dark-para'

          return (
            <Link to={`/videos/${id}`} className="list-trending-item">
              <img
                src={thumbnailUrl}
                alt="thumbnail"
                className="trending-thumbnail-image"
              />

              <div className="trending-para-container">
                <p className={channelTitle}>{title}</p>
                <p className={channelPara}>{name}</p>
                <div>
                  <p className={channelPara}>
                    {viewCount} views . {difference}
                  </p>
                </div>
              </div>
            </Link>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default TrendingItem
