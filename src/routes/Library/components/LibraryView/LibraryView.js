import React, { PropTypes } from 'react'
import AppLayout from 'layouts/AppLayout'
import ArtistList from '../ArtistList'

const LibraryView = (props) => {
  return (
    <AppLayout title="Library">
      <ArtistList {...props}/>
    </AppLayout>
  )
}

LibraryView.propTypes = {
  artists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  queuedSongs: PropTypes.array.isRequired,
  // actions
  queueSong: PropTypes.func.isRequired,
  scrollArtists: PropTypes.func.isRequired,
}

export default LibraryView
