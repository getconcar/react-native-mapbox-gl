import React from 'react';
import {Text} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';
import Bubble from './common/Bubble';

class GetCenter extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      center: [],
    };

    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.getLat = this.getLat.bind(this);
    this.getLng = this.getLng.bind(this);
  }

  async onRegionDidChange() {
    const center = await this._map.getCenter();
    this.setState({center});
  }

  getLng() {
    const {center} = this.state;
    return center.length === 2 ? `Lng: ${center[0]}` : 'Not available';
  }

  getLat() {
    const {center} = this.state;
    return center.length === 2 ? `Lat: ${center[1]}` : 'Not available';
  }

  render() {
    return (
      <Page {...this.props}>
        <MapboxGL.MapView
          onRegionDidChange={this.onRegionDidChange}
          zoomLevel={9}
          ref={c => (this._map = c)}
          onPress={this.onPress}
          centerCoordinate={[-73.970895, 40.723279]}
          style={{flex: 1}}
        />

        <Bubble>
          <Text>Center</Text>
          <Text>{this.getLng()}</Text>
          <Text>{this.getLat()}</Text>
        </Bubble>
      </Page>
    );
  }
}

export default GetCenter;
