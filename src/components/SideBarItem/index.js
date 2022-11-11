import './index.css'

import {Link} from 'react-router-dom'

const SideBarItem = props => {
  const {each, onClickIcon} = props
  const {path, id, icon, para} = each

  const itemClicked = () => {
    onClickIcon(id)
  }

  return (
    <Link to={path} className="link" onClick={itemClicked}>
      <li className="sidebar-list-item">
        {icon}
        <p>{para}</p>
      </li>
    </Link>
  )
}

export default SideBarItem
