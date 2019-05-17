import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;

let routes = [
  {
    "path": "/index.html",
    "exact": true,
    "component": require('../index.js').default,
    "_title": "uploadweb",
    "_title_default": "uploadweb"
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index.js').default,
    "_title": "uploadweb",
    "_title_default": "uploadweb"
  },
  {
    "component": () => React.createElement(require('/Users/zt/Documents/rn/uploadweb/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "uploadweb",
    "_title_default": "uploadweb"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
