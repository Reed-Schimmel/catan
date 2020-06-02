import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';

const config = {
  "width": 1000,
  "height": 1000,
  "layout": { "width": 8, "height": 8, "flat": false, "spacing": 1.02 },
  "origin": { "x": 0, "y": 0 },
  "map": "hexagon",
  "mapProps": [3],
}

const layout = config.layout;
const size = { x: 7, y: 7 };

const generator = GridGenerator.getGenerator(config.map);
const hexagons = generator.apply(this, config.mapProps);

const titleResources = [
  ...Array(4).fill('pasture'),
  ...Array(4).fill('forest'),
  ...Array(4).fill('field'),
  ...Array(3).fill('hill'),
  ...Array(3).fill('mountain'),
  'desert',
]
/** https://boardgamegeek.com/thread/324667/counts-components-settlers-catan-4th-edition
One x "2" (B:*).
Two x "3" (D, Q:**).
Two x "4" (J, N:***).
Two x "5" (A, O:****).
Two x "6" (C, P:*****).
Two x "8" (E, K:*****).
Two x "9" (G, M:****).
Two x "10" (F, L:***).
Two x "11" (I, R:**).
One x "12" (H:*).
*/

const titleNumbers = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];

export default (props) => {
  const [state, setState] = useState({
    players: [],
    devCards: [],
    robber: undefined // [q, r, s]
  });
  
  return (
    <div className="App">
      <HexGrid width={config.width} height={config.height}>
        <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
          {
            // note: key must be unique between re-renders.
            // using config.mapProps+i makes a new key when the goal template chnages.
            hexagons.map((hex, i) => (
              <Hexagon key={config.mapProps + i} q={hex.q} r={hex.r} s={hex.s} >
                <Text>{HexUtils.getID(hex)}</Text>
                {/* <Pattern id={HexUtils.getID(hex)} link="http://lorempixel.com/400/400/cats/1/" /> */}
              </Hexagon>
            ))
          }
        </Layout>
      </HexGrid>
    </div>
  );
}
