import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import Tile from './Tile';
import ContextMenu from './ContextMenu';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [contextMenuItems, setContextMenuItems] = useState([]);
  const [contextMenuStyles, setContextMenuStyles] = useState(null);
  const [isDependencyView, setIsDependencyView] = useState(false);


  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('/data.yaml');
        const parsedData = yaml.safeLoad(response.data);
    
        // Add isHighlighted property to each tile
        const dataWithInitialHighlight = parsedData.map((group) => ({
          ...group,
          tiles: group.tiles.map((tile) => ({
            ...tile,
            isDependencyView: false,
          })),
        }));
    
        setData(dataWithInitialHighlight);
      } catch (error) {
        console.error('Error loading or parsing data:', error);
      }
    };
    loadData();
  }, []);

  // Attach the click event listener to the entire app
  useEffect(() => {
    // console.log(`attach handleAppClick`)
    document.addEventListener('click', globalClickHandler);
    // Clean up the event listener on component unmount
    return () => {
      // console.log(`remove handleAppClick`)
      document.removeEventListener('click', globalClickHandler);
    };
  }, [showMenu, isDependencyView]);

  const handleTileMenuClick = (items, e, styles) => {
    console.log(`handleTileMenuClick`)
    setShowMenu(true);
    setContextMenuItems(items);
    setContextMenuStyles(styles);
    return true
  };

  const handleContextMenuSelection = (item) => {
    console.log(`handleContextMenuSelection: item ${item.name}`)
    setShowMenu(false);
    return true;
  }

  const globalClickHandler = () => {
    console.log(`globalClickHandler isDependencyView: ${isDependencyView}, showMenu: ${showMenu}, `)
    if (showMenu) {
      // Close the context menu
      setShowMenu(false);
    }else if (isDependencyView) {
      // Reset isDependencyView for all tiles
      setData((prevData) => {
        const newData = prevData.map((group) => ({
          ...group,
          tiles: group.tiles.map((tile) => ({
            ...tile,
            isDependencyView: false,
          })),
        }));
        return newData;
      });
      setIsDependencyView(false);
    }
  };
  
  const handleHighlightDependents = (clickedTile) => {
    console.log(`handleHighlightDependents`)
    if (isDependencyView) {
      return false;
    }
  
    // Update the state based on the clicked tile and highlighting status
    setData((prevData) => {
      const newData = prevData.map((group) => {
        return {
          ...group,
          tiles: group.tiles.map((tile) => {
            const dependencyType = clickedTile.backends?.includes(tile.name)?
              'backend' : clickedTile.consumers?.includes(tile.name)?
                'consumer' : tile.name == clickedTile.name?
                  'self': 'none'
            const updatedTile = {
              ...tile,
              dependencyType: dependencyType,
              isDependencyView: true
            };
  
            if (updatedTile.dependencyType !== 'none') {
              console.log(
                `${clickedTile.name}'s ${updatedTile.dependencyType} is ${tile.name}`
              );
            }
            return updatedTile;
          }),
        };
      });
      return newData;
    });
  
    // Toggle the dependency view mode
    setIsDependencyView(true);
    return true
  };
  
  
  
  return (
    <div className="app-container">
      {data.map((group, groupIndex) => (
        <div key={groupIndex} className="group-container">
          <h2>{group.group}</h2>
          <div className="grid">
            {group.tiles.map((tile, tileIndex) => (
              <Tile
                key={tileIndex}
                data={tile}
                style={{ borderColor: group.color }}
                onContextMenu={(items, e, styles) => handleTileMenuClick(items, e, styles)}
                onTileClick={(isHighlighted) => handleHighlightDependents(tile, isHighlighted)}
              />
            ))}
          </div>
        </div>
      ))}
      {showMenu && (
        <ContextMenu
          items={contextMenuItems}
          onMenuSelection={handleContextMenuSelection}
          styles={contextMenuStyles}
        />
      )}
    </div>
  );
};

export default App;
