import './App.css'
import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import NxtWatchContext from './context/NxtWatchContext'

class App extends Component {
  state = {savedVideos: []}

  onClickSaved = id => {
    console.log(id)
  }

  render() {
    const {savedVideos} = this.state
    return (
      <NxtWatchContext.Provider
        value={{savedVideos, onCLickSaved: this.onClickSaved}}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <Route exact path="/savedvideos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
