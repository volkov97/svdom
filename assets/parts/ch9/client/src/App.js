import { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import { useSvgs } from './hooks/useSvgs';
import { Home } from './pages/Home';
import { Logs } from './pages/Logs';
import { NotFound } from './pages/NotFound';
import { Svg } from './pages/Svg';

function App() {
  const [svgs, getSvgs, getSvg, createSvg, likeSvg, removeSvg] = useSvgs();

  useEffect(() => {
    getSvgs();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="ui header">
          <Link to="/">SVDOM</Link>

          <div className="header sub">Safe place for your SVGs</div>
        </h1>
      </div>

      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => (
            <Home
              svgs={svgs}
              onCreate={createSvg}
              onLike={likeSvg}
              onRemove={removeSvg}
            />
          )}
        />

        <Route
          path="/svg/:svgId"
          exact={true}
          render={({ match }) => {
            const { svgId } = match.params;
            const svg = Array.isArray(svgs)
              ? svgs.find((svg) => svg.id === svgId)
              : undefined;

            return <Svg svgId={svgId} svg={svg} getSvg={getSvg} />;
          }}
        />

        <Route path="/logs" component={Logs} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
