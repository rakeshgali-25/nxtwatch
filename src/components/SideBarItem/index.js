import './index.css'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

const SideBarItem = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {each, onClickIcon} = props
      const {path, id, icon, para, isActive} = each

      const itemClicked = () => {
        onClickIcon(id)
      }

      const {lightTheme} = value
      const paraStyle = lightTheme ? 'light-item' : 'dark-item'
      let active
      const itemIcon = isActive ? 'active-icon' : ''
      if (isActive === true) {
        if (lightTheme === true) {
          active = 'light-active'
        } else {
          active = 'dark-active'
        }
      }

      const icon2 = lightTheme ? 'light-icon' : 'dark-icon'

      return (
        <Link to={path} className="link" onClick={itemClicked}>
          <li className={`sidebar-list-item ${active}`}>
            <div className={`${icon2} ${itemIcon}`}>{icon}</div>
            <p className={paraStyle}>{para}</p>
          </li>
        </Link>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SideBarItem
