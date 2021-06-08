import { Fragment } from 'react';

export const NotFound = () => {
  return (
    <Fragment>
      <div className="ui divider" />

      <div className="ui message">
        <div className="header">Page Not Found</div>
        <p>This page doesn't exist, try another one</p>
      </div>
    </Fragment>
  );
};
