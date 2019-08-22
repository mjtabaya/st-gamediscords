function getGames() {
  return fetch("api/v1/games")
    .then(handleErrors)
    .then(res => res.json());
}

function fakeGetGames() {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          games: [
            {
              id: 0,
              name: "Pokemon"
            },
            {
              id: 1,
              name: "Digimon"
            }
          ]
        }),
      1000
    );
  });
}

export function fetchGames() {
  return dispatch => {
    dispatch(fetchGamesBegin());
    return getGames()
      .then(json => {
        console.log("--You are-z-")
        console.log(json)
        console.log("^^ here ^^")
        dispatch(fetchGamesSuccess(json));
        return json.games;
      })
      .catch(error =>
        dispatch(fetchGamesFailure(error))
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
