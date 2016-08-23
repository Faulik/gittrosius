// Keep this until this is fixed: https://github.com/reactjs/react-router/issues/2182
export default () => {
  console.error = (() => {
    const error = console.error;
    return function (exception) {
      (exception && typeof exception === 'string' && exception.match(/change <Router /))
      ? undefined
      : error.apply(console, arguments)
    }
  })()
};
