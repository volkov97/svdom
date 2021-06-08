import { Fragment, useCallback } from 'react';
import { SvgCard } from '../components/SvgCard';

export const Home = ({ svgs, onCreate, onLike, onRemove }) => {
  const onCreateNewSvg = useCallback(
    (e) => {
      e.preventDefault();

      const formElement = e.target;

      const formData = new FormData(formElement);

      const data = Object.fromEntries(formData);

      onCreate(data.content);

      formElement.reset();
    },
    [onCreate]
  );

  return (
    <Fragment>
      <div className="ui segment new-svg-form">
        <form
          className="ui form"
          id="newSvgForm"
          action="/api/svgs"
          method="POST"
          onSubmit={onCreateNewSvg}
        >
          <div className="field">
            <label>Insert your SVG code here</label>
            <textarea name="content" rows="2"></textarea>
          </div>
          <button className="ui tiny teal button" type="submit">
            Save
          </button>
        </form>
      </div>
      <div className="ui divider divider_big"></div>

      <div>
        <h3 className="ui header">Liked</h3>

        {svgs.likedSvgs.length ? (
          <div className="ui three cards">
            {svgs.likedSvgs.map((likedSvg) => (
              <SvgCard
                key={likedSvg.id}
                svg={likedSvg}
                isLiked={true}
                onLike={onLike}
                onRemove={onRemove}
              />
            ))}
          </div>
        ) : (
          <div className="ui message">
            <div className="header">No liked images</div>
            <p>Like some SVGs to view them here</p>
          </div>
        )}
      </div>

      <div className="ui divider" />

      <div>
        <h3 className="ui header">Uploaded</h3>

        {svgs.allSvgs.length ? (
          <div className="ui three cards">
            {svgs.allSvgs.map((svg) => {
              const isLiked = Array.isArray(svgs.likedSvgs)
                ? !!svgs.likedSvgs.find(
                    (likedSvg) => likedSvg.id === svg.id
                  )
                : false;

              return (
                <SvgCard
                  key={svg.id}
                  svg={svg}
                  isLiked={isLiked}
                  onLike={onLike}
                  onRemove={onRemove}
                />
              )
            })}
          </div>
        ) : (
          <div className="ui message">
            <div className="header">No uploaded images</div>
            <p>Upload some SVGs to view them here</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};
