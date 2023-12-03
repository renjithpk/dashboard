// Tile.js
import React, { useRef, useState } from 'react';
import { TextBadge, HybridBadge, ImageBadge } from './Badges';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Tile.css';

function calculateContextMenuPosition(position, menuIcon) {
  const menuIconRect = menuIcon.getBoundingClientRect();
  if (position === "topRight") {
    const posY = menuIconRect.top;
    return { right: window.innerWidth - menuIconRect.right + "px", top: posY + "px" };
  } else if (position === "topLeft") {
    const posX = menuIconRect.left;
    const posY = menuIconRect.top;
    return { left: posX + "px", top: posY + "px" };
  } else if (position === "bottomRight") {
    return { right: window.innerWidth - menuIconRect.right + "px", bottom: window.innerHeight - menuIconRect.bottom + "px" };
  } else if (position === "bottomLeft") {
    const posX = menuIconRect.left;
    return { left: posX + "px", bottom: window.innerHeight - menuIconRect.bottom + "px" };
  }
}

const Tile = ({ data, style, onContextMenu, onTileClick }) => {
  const menuIconRef = useRef(null);
  const openContextMenu = (e) => {
    e.stopPropagation();
    console.log(`Clicked on tile ${data.name}`);
    console.log(`Position clientX: ${e.clientX}, clientY: ${e.clientY}`);

    const menuIcon = menuIconRef.current;
    if (!menuIcon) {
      return;
    }

    const styles = calculateContextMenuPosition("topRight", menuIcon);

    onContextMenu(data.menu, e, styles);
  };

  const handleBadgeClick = (event, badgeData, position) => {
    event.stopPropagation();
    
    // Open button link in a new window if it's defined
    if (badgeData.link) {
      window.open(badgeData.link, '_blank');
    }
    // Add more handling if needed
  };

  const handleTileClick = (event) => {
    if (onTileClick) {
      if (onTileClick()) {
        event.stopPropagation();
      }
    }
  };

  return (
    <div
      className={`tile ${data.isDependencyView && data.dependencyType === 'none' ? 'disabled' : ''}`}
      style={style}
      onClick={handleTileClick}
    >
      <div className="tile-header">
        <h3>{data.name}</h3>
        <span>{data.isDependencyView && data.dependencyType !== 'none' ? `(${data.dependencyType})` : ''}</span>
        <i
          ref={menuIconRef}
          className="fas fa-bars tile-menu-icon"
          onClick={openContextMenu}
        />
      </div>
      {data.badges && (
        <div className="second-row">
          {data.badges.map((badge, badgeIndex) => {
            switch (badge.type) {
              case 'text-badge':
                return (
                  <TextBadge
                    key={badgeIndex}
                    name={badge.name}
                    color={badge.color}
                    info={badge.info}
                    onClick={(event) =>
                      handleBadgeClick(event, badge, 'topRight')
                    }
                  />
                );
              case 'hybrid-badge':
                return (
                  <HybridBadge
                    key={badgeIndex}
                    name={badge.name}
                    imageSrc={badge.image}
                    color={badge.color}
                    info={badge.info}
                    onClick={(event) =>
                      handleBadgeClick(event, badge, 'topRight')
                    }
                  />
                );
              case 'image-badge':
                return (
                  <ImageBadge
                    key={badgeIndex}
                    imageSrc={badge.image}
                    color={badge.color? badge.color: 'rgba(0, 0, 0, 0)'}
                    info={badge.info}
                    onClick={(event) =>
                      handleBadgeClick(event, badge, 'topRight')
                    }
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Tile;
