import { useCallback, useState } from 'react';
import * as api from '../dataSource/api';

export const useSvgs = () => {
  const [svgs, setSvgs] = useState({
    allSvgs: [],
    likedSvgs: [],
  });

  const getSvgs = useCallback(() => {
    api.getSvgs().then((svgs) => setSvgs(svgs));
  }, []);

  const getSvg = useCallback((svgId) => {
    return api.getSvg(svgId);
  }, []);

  const createSvg = useCallback(
    (content) => {
      api.createSvg(content).then((svg) => {
        console.log({ newSvg: svg });
        setSvgs({
          ...svgs,
          allSvgs: [...svgs.allSvgs, svg],
        });
      });
    },
    [svgs]
  );

  const likeSvg = useCallback(
    (svg, isLiked) => {
      api.likeSvg(svg.id, isLiked).then((svg) => {
        if (isLiked === true) {
          setSvgs({
            ...svgs,
            likedSvgs: svgs.likedSvgs.find((likedSvg) => likedSvg.id === svg.id)
              ? svgs.likedSvgs
              : [...svgs.likedSvgs, svg],
          });
        } else {
          setSvgs({
            ...svgs,
            likedSvgs: svgs.likedSvgs.filter(
              (likedSvg) => likedSvg.id !== svg.id
            ),
          });
        }
      });
    },
    [svgs]
  );

  const removeSvg = useCallback(
    (svgId) => {
      api.removeSvg(svgId).then((svg) => {
        setSvgs({
          likedSvgs: svgs.likedSvgs.filter((svg) => svg.id !== svgId),
          allSvgs: svgs.allSvgs.filter((svg) => svg.id !== svgId),
        });
      });
    },
    [svgs]
  );

  return [svgs, getSvgs, getSvg, createSvg, likeSvg, removeSvg];
};
