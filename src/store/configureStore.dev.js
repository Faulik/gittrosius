import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from 'reducers';
import rootSaga from 'sagas'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    )
  );
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers').default)
    );
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store;
}
