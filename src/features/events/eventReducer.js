import {
  CLEAR_COMMENTS,
  CLEAR_EVENTS,
  CLEAR_SELECTED_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  DISCARD_STATE,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  RETAIN_STATE,
  SET_FILTER,
  SET_START_DATE,
  UPDATE_EVENT,
} from './eventConstants';

const initialState = {
  events: [],
  moreEvents: true,
  comments: [],
  selectedEvent: null,
  lastVisible: null,
  filter: 'all',
  startDate: new Date(),
  retainState: false,
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== payload)],
      };
    case FETCH_EVENTS:
      return {
        ...state,
        events: [...state.events, ...payload.events],
        moreEvents: payload.moreEvents,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case LISTEN_TO_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: payload,
      };
    case CLEAR_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: null,
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        retainState: false,
        moreEvents: true,
        lastVisible: null,
      };
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        filter: payload,
      };
    case SET_START_DATE:
      console.log(payload);
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        startDate: payload,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    case DISCARD_STATE:
      return {
        ...state,
        retainState: false,
      };
    default:
      return state;
  }
}
