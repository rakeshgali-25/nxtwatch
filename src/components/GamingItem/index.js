import './index.css'

const GamingItem = props => {
  const {each} = props
  const {id, thumbnailUrl, title, viewsCount} = each
  return (
    <li className="gaming-item">
      <img
        src={thumbnailUrl}
        alt="gaming-thumbnail"
        className="gaming-thumbnail"
      />
      <p className="game-title">{title}</p>
      <p className="game-para">{viewsCount} Watching Worldwide</p>
    </li>
  )
}

export default GamingItem
