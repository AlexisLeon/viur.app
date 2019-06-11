'use strict';

import React, { Component } from 'react';

import { StyleSheet, Alert } from 'react-native';

import {
  ViroButton,
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroQuad,
  ViroVideo,
} from 'react-viro';

export class BusinessCard extends Component {
  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false
  }

  getNoTrackingUI(){
    const { initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      }/>
    )
  }

  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker target={"banca"}>
          <ViroNode key="video0">
            <ViroNode
              position={[0, -0.02, .1]}
              rotation={[-90, 0, 0]}
            >
              <ViroVideo
                source={require('./res/banca.mp4')}
                loop={true}
                // position={[0,2,-5]}
                scale={[.8, .6, 0]}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
        <ViroARImageMarker target={"construccion"}>
          <ViroNode key="video1">
            <ViroNode
              position={[0, -0.02, .1]}
              rotation={[-90, 0, 0]}
            >
              <ViroVideo
                source={require('./res/construccion.mp4')}
                loop={true}
                // position={[0,2,-5]}
                scale={[.8, .6, 0]}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
        <ViroARImageMarker target={"wall"}>
          <ViroNode key="video2">
            <ViroNode
              position={[0, -0.02, .1]}
              rotation={[-90, 0, 0]}
            >
              <ViroVideo
                source={require('./res/business_apps.mp4')}
                loop={true}
                // position={[0,2,-5]}
                scale={[.8, .6, 0]}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        { this.state.isTracking ? this.getARScene() : this.getNoTrackingUI() }
      </ViroARScene>
    );
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      if (!this.state.isTracking) {
        this.setState({ isTracking: true })
        Alert.alert('ready');
      }
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({ isTracking: false })
      Alert.alert('offline');
    }
  }

  _register = () => {
    Alert.alert('register');
  }
}

var styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: .5
  }
});

ViroARTrackingTargets.createTargets({
  "wall" : {
    source : require('./res/wall_marker.png'),
    orientation : "Up",
    physicalWidth : 0.05 // real world width in meters
  },
  "retail" : {
    source : require('./res/retail.jpg'),
    orientation : "Up",
    physicalWidth : 0.05 // real world width in meters
  },
  "banca" : {
    source : require('./res/banca.jpg'),
    orientation : "Up",
    physicalWidth : 0.05 // real world width in meters
  },
  "construccion" : {
    source : require('./res/construccion.jpg'),
    orientation : "Up",
    physicalWidth : 0.05 // real world width in meters
  }
});

ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)"
  }
});

ViroAnimations.registerAnimations({
  animateImage:{
    properties:{
      positionX: 0.05,
      opacity: 1.0
    },
      easing: "Bounce",
      duration: 500
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing: "Bounce",
    duration: 500
  }
});

module.exports = BusinessCard;
