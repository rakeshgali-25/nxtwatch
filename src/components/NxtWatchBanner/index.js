import './index.css'
import {BsX} from 'react-icons/bs'

const NxtWatchBanner = props => {
  const {onClickInto} = props

  const onClickClose = () => {
    onClickInto()
  }

  return (
    <div className="banner-container">
      <div className="banner-container-left">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
          className="company-name"
        />
        <p className="para-banner">
          Buy Nxt Watch Premium prepaid plans with <br />
          UPI
        </p>
        <div>
          <button type="button" className="get-it-now">
            GET IT NOW
          </button>
        </div>
      </div>
      <div className="close-icon">
        <BsX onClick={onClickClose} />
      </div>
    </div>
  )
}

export default NxtWatchBanner
