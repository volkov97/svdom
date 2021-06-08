import { Link } from "react-router-dom";

export const SvgCard = ({ svg, isLiked, onLike, onRemove }) => {
  return (
    <div className="ui card">
      <div className="content svg-wrap">
        <a href={`/svg/${svg.id}`}>
          <img src={svg.originalUrl} alt="Svg" />
        </a>
      </div>
      <div className="extra content">
        <Link to={`/svg/${svg.id}`}>
          <button className="mini ui button">Open</button>
        </Link>
        <button
          className="mini ui button likeSvgButton icon"
          data-id={svg.id}
          data-like={String(isLiked)}
          onClick={() => onLike(svg, !isLiked)}
        >
          <i className={`heart icon ${isLiked ? 'red' : 'outline'}`}></i>
        </button>
        <button
          className="mini ui button right floated icon removeSvgButton"
          data-id={svg.id}
          type="button"
          onClick={() => onRemove(svg.id)}
        >
          <i className="trash icon"></i>
        </button>
      </div>
    </div>
  );
};
