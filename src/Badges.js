import React, { useEffect, useState } from 'react';
import { resolveValue } from './Utils.js';
import './Badges.css';

const withBadgeData = (WrappedComponent) => {
  return function WithBadgeData(props) {
    const [resolvedList, setResolvedList] = useState([]);
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const displayTextValue = await resolveValue(props.badge.name);
          setDisplayText(displayTextValue);

          const resolvedValues = await Promise.all(
            props.badge.items.map(async (item) => {
              const { name, ...rest } = item;
              const resolvedValue = await resolveValue(name);
              return { name: resolvedValue, ...rest };
            })
          );
          setResolvedList(resolvedValues);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [props.badge.items, props.badge.name]);

    return <WrappedComponent {...props} resolvedList={resolvedList} displayText={displayText} />;
  };
};

// TextBadge component with HOC
const TextBadge = withBadgeData(({ badge, onClick, resolvedList, displayText }) => {
  return (
    <button
      className="badge-container text-badge"
      style={{ backgroundColor: badge.color }}
      onClick={(event) => onClick(event, { items: resolvedList, link: badge.link })}
      title={badge.info}
    >
      {displayText}
    </button>
  );
});

// ImageBadge component with HOC
const ImageBadge = withBadgeData(({ badge, onClick, resolvedList, displayText }) => (
  <button
    className="badge-container image-badge"
    style={{ backgroundColor: badge.color }}
    onClick={(event) => onClick(event, { items: resolvedList, link: badge.link })}
    title={badge.info}
  >
    {badge.image && <img className="image-badge-image" src={process.env.PUBLIC_URL + '/' + badge.image} alt="no img" />}
  </button>
));

// HybridBadge component with HOC
const HybridBadge = withBadgeData(({ badge, onClick, resolvedList, displayText }) => {
  return (
    <button
      className="badge-container hybrid-badge"
      style={{ backgroundColor: badge.color }}
      onClick={(event) => onClick(event, { items: resolvedList, link: badge.link })}
      title={badge.info}
    >
      {badge.image && (
        <img
          className="hybrid-badge-image"
          src={process.env.PUBLIC_URL + '/' + badge.image}
          alt="no img"
        />
      )}
      {displayText && <span>{displayText}</span>}
    </button>
  );
});

export { TextBadge, ImageBadge, HybridBadge };
