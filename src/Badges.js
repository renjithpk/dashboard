import React, { useEffect, useState } from 'react';
import { resolveValue } from './Utils.js'
import './Badges.css'
// TextBadge component
const TextBadge = ({ name, color, info, onClick }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await resolveValue(name);
        setDisplayText(result);
      } catch (error) {
        console.error('Error fetching data for TextBadge:', error.message);
      }
    };

    fetchData();
  }, [name]);

  return (
    <button
      className="badge-container text-badge" // Use clickable-badge and badge-container classes
      style={{ backgroundColor: color }}
      onClick={onClick}
      title={info}
    >
      {displayText}
    </button>
  );
};

// ImageBadge component
const ImageBadge = ({ imageSrc, color, info, onClick }) => (
  <button
    className="badge-container image-badge" // Use clickable-badge and badge-container classes
    style={{ backgroundColor: color }}
    onClick={onClick}
    title={info}
  >
    {imageSrc && <img className="image-badge-image" src={process.env.PUBLIC_URL + '/' + imageSrc} alt="no img" />}
  </button>
);

// HybridBadge component
const HybridBadge = ({ name, imageSrc, color, info, onClick }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await resolveValue(name);
        setDisplayText(result);
      } catch (error) {
        console.error('Error fetching data for HybridBadge:', error.message);
      }
    };

    fetchData();
  }, [name]);

  return (
    <button
      className="badge-container hybrid-badge" // Use clickable-badge and badge-container classes
      style={{ backgroundColor: color }}
      onClick={onClick}
      title={info}
    >
      {imageSrc && (
        <img
          className="hybrid-badge-image"
          src={process.env.PUBLIC_URL + '/' + imageSrc}
          alt="no img"
        />
      )}
      {displayText && <span>{displayText}</span>}
    </button>
  );
};

export { TextBadge, ImageBadge, HybridBadge };