function getGames() {
  return fetch("api/v1/games")
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchGames() {
  return dispatch => {
    dispatch(fetchGamesBegin());
    return getGames()
      .then(json => {
        console.log(json)
        dispatch(fetchGamesSuccess(json));
        return json.games;
      })
      .catch(error =>
        dispatch(fetchGamesFailure(error))
      );
  };
}

function addNewGame(name, description, servers, platform) {
    return fetch( '/api/v1/games', { game: {name, description, servers, platform} })
      .then(handleErrors)
      .then(res => res.json());
}

export function postNewGame(game) {
  return dispatch => {
    dispatch(postGameBegin());
    return addNewGame(game)
      .then(json => {
        console.log(json)
        dispatch(postGameSuccess(json));
        return json.games;
      })
      .catch(error =>
        dispatch(postGameFailure(error))
      );
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_GAMES_BEGIN = "FETCH_GAMES_BEGIN";
export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";
export const FETCH_GAMES_FAILURE = "FETCH_GAMES_FAILURE";

export const fetchGamesBegin = () => ({
  type: FETCH_GAMES_BEGIN
});

export const fetchGamesSuccess = games => ({
  type: FETCH_GAMES_SUCCESS,
  payload: { games }
});

export const fetchGamesFailure = error => ({
  type: FETCH_GAMES_FAILURE,
  payload: { error }
});

// [C]reate, POST NEW GAME

export const POST_GAME_BEGIN = "POST_GAME_BEGIN";
export const POST_GAME_SUCCESS = "POST_GAME_SUCCESS";
export const POST_GAME_FAILURE = "POST_GAME_FAILURE";

export const postGameBegin = (game) => ({
  type: POST_GAME_BEGIN,
  payload: {game}
});

export const postGameSuccess = game => ({
  type: POST_GAME_SUCCESS,
  payload: { game }
});

export const postGameFailure = error => ({
  type: POST_GAME_FAILURE,
  payload: { error }
});
