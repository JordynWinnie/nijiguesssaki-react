import { useState } from "react";
import BackDrop from './backdrop.jpg'
const Home = () => {

    const [link, setLink] = useState('')
    const [error, setError] = useState('')
    const [playlistData, setPlaylistData] = useState(null)
    const TestLink = (link) => {
        setError('')
        setPlaylistData(null)
        if (!link) {
            setError('Please enter a link')
            return
        }

        if (!link.startsWith('https://open.spotify.com/playlist/')) {
            if (link.length !== 22) {
                setError("Invalid Spotify Id Detected")
                return
            }
        }

        let tempLink = link.replace('https://open.spotify.com/playlist/', '')
        tempLink = tempLink.slice(0, 22)

        fetch(`/api/getPlaylist?playlist_id=${tempLink}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(
                data => {
                    console.log(data)
                    setPlaylistData(data)
                }
            ).catch(
                err => {
                    setError(err)
                }
            )
    }
    return (<>
        <div className="bg-gray-500 relative bg-center h-full">
            <img src={playlistData && playlistData.images[0].url} alt="" className="mx-auto object-fill"></img>
            <div className="bg-black w-1/2 absolute top-1/4 left-1/4 rounded-lg p-4 object-center">
                <div className="h-4/6 flex flex-col ">
                    <p>Spotify Link:</p>
                    <input value={link} onChange={(e) => setLink(e.target.value)}></input>
                    <button className="bg-pink-500 btn" onClick={() => TestLink(link)}>Submit Link</button>
                    {error && <p>Error: {error}</p>}
                    {playlistData && (
                        <div className="playlist-data">
                            <h1>{playlistData.name} by {playlistData.owner.display_name}</h1>
                            <img src={playlistData.images[0].url} alt="" className="h-64" />
                        </div>
                    )}
                </div>
            </div>
        </div>





    </>);
}

export default Home;