import React, { Component } from 'react';
import classNames from 'classnames';

import {ControlButtons} from './ControlButtons.jsx';
import './Slider.scss';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    const {hideWidth, blocks} = this.props;

    this.state = {
      blocks: [{
        ...blocks
      }],
      switchHideWidth: hideWidth,
      visibleBlockCount: 1,
      touchStartPoint: 0,
      touchEndPoint: 0,
      currentStep: 0,
      stepSize: 0
    }

    this.resetVarsOnResize = this.resetVarsOnResize.bind(this);
  }

  resetVarsOnResize() {
    const {switchHideWidth, currentStep} = this.state;

    let blockSizeTemp = this._calcBlockOffset(this._switcher.childNodes[0]), // calc book offset include margins from left and right
      switcherSize = this._switcher.offsetWidth,
      visibleBlockCountTemp = Math.floor(switcherSize / blockSizeTemp),
      stepSizeTemp = blockSizeTemp * visibleBlockCountTemp,
      switcherStartTransform = -(stepSizeTemp * currentStep);

    this.setState({
      stepSize: stepSizeTemp,
      visibleBlockCount: visibleBlockCountTemp
    });

    this._switcher.style = window.innerWidth > switchHideWidth ? 'transform: translate(0)' : 'transform: translate(' + switcherStartTransform + 'px, 0) translateZ(0)';
  }

  getSwitchPos(event) {
    const {switchHideWidth} = this.state;
    if (window.innerWidth > switchHideWidth) return;

    let pointAtEvent = event.changedTouches[0].clientX;

    if (event.type === 'touchstart') {
      this.setState({
        touchStartPoint: pointAtEvent
      });
    } else if (event.type === 'touchend') {
      this.setState({
        touchEndPoint: pointAtEvent
      });
      this.endSwitchTransform(this._getTransformDirection(pointAtEvent));
    } else {
      this.localSwitchTransform(pointAtEvent);
    }
  }

  localSwitchTransform(pointAtEvent) {
    const {switchHideWidth} = this.state;
    if (window.innerWidth > switchHideWidth) return;

    const {touchStartPoint, currentStep, stepSize} = this.state;

    let directMove = pointAtEvent - touchStartPoint, // local switch coordinates, while touch is move
      switcherStartTransform = -(stepSize * currentStep), // position with which the switch is start
      theta = switcherStartTransform + directMove; // summary calc of switch size based on current transform and direction

    this._confirmSwitchTransform(0, theta);
  }

  endSwitchTransform(directTransform) {
    const {currentStep, stepSize} = this.state;

    let switcherStartTransform = -(stepSize * currentStep), // position with which the switch is start
      theta = switcherStartTransform + stepSize * directTransform; // summary calc of switch size based on current transform, step size and direction
    this._confirmSwitchTransform(4, theta, true);
  }

  _calcBlockOffset(block) {
    let margins = parseInt(getComputedStyle(block).marginRight, 10) + parseInt(getComputedStyle(block).marginLeft, 10),
      bOffset = block.offsetWidth + margins;

    return bOffset;
  }

  _getTransformDirection(touchEndPoint) {
    const {touchStartPoint} = this.state;

    return (touchStartPoint - touchEndPoint) === 0 ? 0 : (touchStartPoint - touchEndPoint) > 0 ? -1 : 1; // calc the direction based on start and end touch position
  }

  _checkTheta(theta) {
    const {stepSize, visibleBlockCount} = this.state;

    let thetaT = theta,
      maxBooksOffset = stepSize * (Math.ceil(this._switcher.children.length / visibleBlockCount) - 1) * -1;

    // if we reach the end or the start of switch position.
    // TODO change this mechanism on carusel
    if (theta <= (maxBooksOffset - stepSize)) {
      thetaT = stepSize * (Math.ceil(this._switcher.children.length / visibleBlockCount) - 1) * -1;
    } else if (theta >= stepSize) {
      thetaT = 0;
    }

    return thetaT;
  }

  _confirmSwitchTransform(delay, theta, isMark) {
    const {stepSize} = this.state;

    let thetaR = this._checkTheta(theta);

    if (isMark) {
      let currentStep = thetaR / -stepSize; // calc next position of active dot
      this.setState({
        currentStep: currentStep
      }); // current = next;
    }

    this._switcher.style.transform = 'translate(' + thetaR + 'px, 0) translateZ(0)';
    this._switcher.style.transition = 'transform .' + delay + 's ease-out';
  }

  componentWillMount() {
    window && window.addEventListener("resize", this.resetVarsOnResize, false);
  }

  componentDidMount() {
    this.resetVarsOnResize();

    this._sliderBlock.addEventListener('touchmove', (event) => this.getSwitchPos(event), false);
    this._sliderBlock.addEventListener('touchstart', (event) => this.getSwitchPos(event), false);
    this._sliderBlock.addEventListener('touchend', (event) => this.getSwitchPos(event), false);
  }

  componentWillUnmount() {
    window && window.removeEventListener("resize", this.resetVarsOnResize, false);
  }

  render() {
    const {currentStep, visibleBlockCount} = this.state;
    const {blocks} = this.props;

    let endOfSwitch = Math.floor((blocks.length - 1) / visibleBlockCount);

    return (
      <div ref={ (div) => {
             this._sliderBlock = div;
           } } className="Slider">
        <div ref={ (div) => {
                     this._switcher = div;
                   } } className="switcher">
          { blocks }
        </div>
        <Dots dotCount={ endOfSwitch + 1 } currentStep={ currentStep } />
        <ControlButtons transformFunc={ (directTransform) => this.endSwitchTransform(1) }
          btnDirect={ 1 }
          btnSubClass="switcher__button"
          currentSwitchPos={ currentStep }
          endSwitchPos={ endOfSwitch } />
        <ControlButtons transformFunc={ (directTransform) => this.endSwitchTransform(-1) }
          btnDirect={ -1 }
          btnSubClass="switcher__button"
          currentSwitchPos={ currentStep }
          endSwitchPos={ endOfSwitch } />
      </div>
      );
  }
}

const Dots = ({dotCount, currentStep}) => {
  let content = [];


  for (let i = dotCount - 1; i >= 0; i--) {
    content[i] = (
      <i className={ classNames('fa fa-circle switcher__dot', {
                 'switcher__dot_active': i === currentStep
               }) } key={ i } aria-hidden='true'></i>
    );
  }

  return (
    <div className="switcher__dots">
      { content }
    </div>
    );
}