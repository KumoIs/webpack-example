import React, { FC, useEffect } from 'react';
import { Scene, Zoom, Scale } from '@antv/l7';
import { DrillDownLayer } from '@antv/l7-district';
import { GaodeMap } from '@antv/l7-maps';

interface IProps {}
const Home: FC<IProps> = () => {
  useEffect(() => {
    const colors = ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'];
    const scene = new Scene({
      id: 'map',
      logoVisible: false,
      map: new GaodeMap({
        center: [116.2825, 39.9],
        pitch: 0,
        style: 'dark',
        zoom: 3,
        minZoom: 3,
        maxZoom: 10,
      }),
    });
    scene.on('loaded', () => {
      new DrillDownLayer(scene, {
        data: [],
        viewStart: 'Country',
        viewEnd: 'City',
        fill: {
          color: {
            field: 'NAME_CHN',
            values: colors,
          },
        },
        popup: {
          enable: true,
          Html: (props) => {
            return `<span>${props.NAME_CHN}</span>`;
          },
        },
      });
    });
    const zoomControl = new Zoom({
      position: 'topleft',
    });

    const scaleControl = new Scale({
      position: 'bottomleft',
    });

    scene.addControl(scaleControl);
    scene.addControl(zoomControl);
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%', position: 'relative' }} />;
};

export default Home;
