import { Fragment, useEffect, useState } from 'react';

export const Svg = ({ svgId, svg: svgFromProps, getSvg }) => {
  const [svg, setSvg] = useState(svgFromProps);

  useEffect(() => {
    if (!svg) {
      getSvg(svgId)
        .then(setSvg)
        .catch(() => {
          setSvg(null);
        });
    }
  }, []);

  if (svg === null) {
    return (
      <Fragment>
        <div className="ui divider" />

        <div className="ui message">
          <div className="header">SVG Not Found</div>
          <p>This svg doesn't exist, try another one</p>
        </div>
      </Fragment>
    );
  }

  if (!svg) {
    return (
      <div className="loading-wrap">
        <div className="ui active loader inline" />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="ui large breadcrumb">
        <a className="section" href="/">
          Gallery
        </a>
        <i className="right chevron icon divider" />
        <div className="active section">{svg.id}</div>
      </div>

      <div className="ui divider" />

      <div className="svg">
        <div className="ui segment">
          <div className="content svg-wrap">
            <a href={svg.originalUrl}>
              <img src={svg.originalUrl} alt="SVG" />
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
