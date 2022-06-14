import { useEffect, useState } from "react";

const Home = () => {

    const [link, setLink] = useState('')
    const [error, setError] = useState('')
    const TestLink = (link) => {
        setError('')

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

        fetch('/api/getToken')
            .then(res => {
                return res.json()
            }).then(
                data => {
                    console.log(data)
                }
            )
    }
    return (<div className="home">
        <label>Spotify Link: </label>
        <input value={link} onChange={(e) => setLink(e.target.value)}></input>
        <button onClick={() => TestLink(link)}>Submit Link</button>
        {error && <p>Error: {error}</p>}
    </div>);
}

export default Home;