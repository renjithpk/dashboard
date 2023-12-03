import React, { useEffect, useState } from 'react';
import { resolveValue } from './Utils.js';
import './Badges.css';

// TextBadge component
const TextBadge = ({ badge, onClick }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await resolveValue(badge.name);
        setDisplayText(result);
      } catch (error) {
        console.error('Error fetching data for TextBadge:', error.message);
      }
    };

    fetchData();
  }, [badge.name]);

  return (
    <button
      className="badge-container text-badge" // Use clickable-badge and badge-container classes
      style={{ backgroundColor: badge.color }}
      onClick={(event) => onClick(event, { items: badge.items, link: badge.link })}
      title={badge.info}
    >
      {displayText}
    </button>
  );
};

// ImageBadge component
const ImageBadge = ({ badge, onClick }) => (
  <button
    className="badge-container image-badge" // Use clickable-badge and badge-container classes
    style={{ backgroundColor: badge.color }}
    onClick={(event) => onClick(event, { items: badge.items, link: badge.link })}
    title={badge.info}
  >
    {badge.image && <img className="image-badge-image" src={process.env.PUBLIC_URL + '/' + badge.image} alt="no img" />}
  </button>
);

// HybridBadge component
const HybridBadge = ({ badge, onClick }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await resolveValue(badge.name);
        setDisplayText(result);
      } catch (error) {
        console.error('Error fetching data for HybridBadge:', error.message);
      }
    };

    fetchData();
  }, [badge.name]);

  return (
    <button
      className="badge-container hybrid-badge" // Use clickable-badge and badge-container classes
      style={{ backgroundColor: badge.color }}
      onClick={(event) => onClick(event, { items: badge.items, link: badge.link })}
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
};

export { TextBadge, ImageBadge, HybridBadge };
