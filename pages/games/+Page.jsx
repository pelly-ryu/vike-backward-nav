import {useEffect, useState} from "react";
import queryString from 'query-string';

export {Page}

const fakeGames = [
  {title: 'Zelda', platform: 'Switch'},
  {title: 'Mario', platform: 'Switch'},
  {title: 'Halo', platform: 'Xbox'},
  {title: 'Gears of War', platform: 'Xbox'},
]

const fetchGamesFromServer = (platform) => {
  return fakeGames.filter(x => {
    if (!platform) return true;
    return platform === x.platform
  })
}

function Page() {
  const [platform, setPlatform] = useState(null)
  const [games, setGames] = useState([])

  const onClick = (e) => {
    const url = queryString.stringifyUrl({
      url: window.location.pathname,
      query: e.target.checked ? {platform: 'Switch'} : {}
    }, {skipNull: true, skipEmptyString: true});
    if (e.target.checked) {
      setPlatform('Switch')
    } else {
      setPlatform(null)
    }
    history.pushState(null, "", url)
  }

  useEffect(()=> {
    setGames(fetchGamesFromServer(platform));
  }, [platform])

  useEffect(() => {
    const onPopState = () => {
      // Vike sets triggeredBy to 'vike' | 'browser' | 'user'
      const {triggeredBy} = window.history.state
      /* Same as:
      const { triggeredBy } = event.state
      */

      // Navigation triggered by Vike or the browser
      if (triggeredBy === 'vike' || triggeredBy === 'browser') {
        // Abort: let Vike handle the navigation
        console.log("Vike or browser triggered the navigation")
        return
      }

      // Navigation triggered by your history.pushState() call
      if (triggeredBy === 'user') {
        // Implement your navigation handling here
        console.log("User triggered the navigation")
        const urlParams = new URLSearchParams(window.location.search);
        const _platform = urlParams.get('platform');
        if (_platform) {
          setPlatform(_platform)
        } else {
          setPlatform(null)
        }
      }
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  return (
    <>
      <label>only switch<input type='checkbox' checked={Boolean(platform)} onChange={onClick}/></label>
      <ul>
        {games.map((game, i) =>
          <li key={i}>{game.platform} | {game.title}</li>
        )}
      </ul>
    </>
  )
}
