

import * as L from 'leaflet';
export class test extends L.Control {
 
    override onAdd(map: L.Map): HTMLElement {
      const button = L.DomUtil.create('button', 'leaflet-control-button');
      button.innerHTML = 'Custom Button';
      button.title = 'Click me!';
      button.onclick = () => {
        // Handle button click event here
        console.log('Button clicked!');
      };
      return button;
    }
  
    override onRemove(map: L.Map): void {
      // Cleanup function when control is removed from map
    }
  }
  