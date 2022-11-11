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
  state = {savedVideos: [], lightTheme: false}

  onClickSaved = () => {
    console.log('clicked')
  }

  onClickSaveButton = details => {
    const {savedVideos} = this.state

    this.setState({savedVideos: [...savedVideos, details]}, this.printSaved())
  }

  printSaved = () => {
    const {savedVideos} = this.state
    console.log(savedVideos)
  }

  onClickTheme = () => {
    const {lightTheme} = this.state

    this.setState({lightTheme: !lightTheme})
  }

  render() {
    const {savedVideos, lightTheme} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          savedVideos,
          lightTheme,
          onCLickSaved: this.onClickSaved,
          onClickTheme: this.onClickTheme,
          onClickSaveButton: this.onClickSaveButton,
        }}
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
