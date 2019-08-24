import {
  FETCH_GAMES_BEGIN,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
  FETCH_GAME_BEGIN,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAILURE,
  POST_GAME_BEGIN,
  POST_GAME_SUCCESS,
  POST_GAME_FAILURE,
  PUT_GAME_BEGIN,
  PUT_GAME_SUCCESS,
  PUT_GAME_FAILURE,
  DELETE_GAME_BEGIN,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE,
} from "./gameActions";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function gameReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_GAMES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_GAMES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.games
      };

    case FETCH_GAMES_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

      case FETCH_GAME_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };

      case FETCH_GAME_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          items: action.payload.game
        };

      case FETCH_GAME_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };

      case POST_GAME_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };

      case POST_GAME_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.game
        };

      case POST_GAME_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };

      case PUT_GAME_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };

      case PUT_GAME_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.game
        };

      case PUT_GAME_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };

      case DELETE_GAME_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };

      case DELETE_GAME_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.game
        };

      case DELETE_GAME_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };

      default:
      // ALWAYS have a default case in a reducer
        return state;
  }
}
