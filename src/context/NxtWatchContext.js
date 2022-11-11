import React from 'react'

const NxtWatchContext = React.createContext({
  savedVideos: [],
  lightTheme: true,
  onClickSaved: () => {},
  onClickTheme: () => {},
  onClickSaveButton: () => {},
})

export default NxtWatchContext
