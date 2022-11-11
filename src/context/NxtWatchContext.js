import React from 'react'

const NxtWatchContext = React.createContext({
  savedVideos: [],
  onClickSaved: () => {},
})

export default NxtWatchContext
