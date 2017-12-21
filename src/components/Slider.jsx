import React, { Component } from 'react';
import classNames from 'classnames';

import './Slider.scss';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    const {blocks, hideWidth} = this.props;

    this.state = {
      blocks: blocks,
      switchHideWidth: hideWidth,
      touchStartPoint: 0,
      touchEndPoint: 0,
      currentStep: 0,
      blockSize: 0,
      stepSize: 0,
      visibleBlockCount: 0
    }

    this.resetVarsOnResize = this.resetVarsOnResize.bind(this);
    this.endSwitchTransform = this.endSwitchTransform.bind(this);
  }

  initialSwitchVars(switcher, visibleBlockCount) {
    this.resetExistDots(switcher);

    const {blocks} = this.state;

    let dots = document.createElement('div'),
      dotCount = Math.ceil(blocks.length / visibleBlockCount);

    for (let j = 0; j <= dotCount - 1; j++) {
      let dotElem = document.createElement('i');
      dotElem.className = j === 0 ? "fa fa-circle switcher__dot switcher__dot_active" : "fa fa-circle switcher__dot";
      dotElem.setAttribute("aria-hidden", "true");
      dots.appendChild(dotElem);
    }

    dots.className = 'switcher__dots';
    switcher.parentNode.appendChild(dots);

    this._dotsBlock = dots;
  }

  resetExistDots(switcher) {
    if (this._dotsBlock) { // if dots already exist, remove from refs

      switcher.parentNode.removeChild(this._dotsBlock);
      this.setState({
        currentStep: 0
      });
    }
    return;
  }

  resetVarsOnResize() {
    const {switchHideWidth, currentStep, visibleBlockCount} = this.state;

    let blockSizeTemp = this._calcBlockOffset(this._switcher.childNodes[0]),
      switcherSize = this._switcher.offsetWidth,
      visibleBlockCountTemp = Math.floor(switcherSize / blockSizeTemp), // 12 - margin around the book block (6-left, 6-right)
      stepSizeTemp = blockSizeTemp * visibleBlockCountTemp,
      switcherStartTransform = -(stepSizeTemp * currentStep);

    this.setState({
      stepSize: stepSizeTemp,
      visibleBlockCount: visibleBlockCountTemp,
      blockSize: blockSizeTemp
    });

    if (visibleBlockCount !== visibleBlockCountTemp && visibleBlockCountTemp !== 0) { // reCreate dots, when the window can holds more books
      this.initialSwitchVars(this._switcher, visibleBlockCountTemp);
    }

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
      theta = switcherStartTransform + directMove;

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

    if (isMark) this._markDots(thetaR / -stepSize); // calc next position of active dot

    this._switcher.style.transform = 'translate(' + thetaR + 'px, 0) translateZ(0)';
    this._switcher.style.transition = 'transform .' + delay + 's ease-out';
  }

  _markDots(nextDot) {
    const {currentStep} = this.state;

    let activeDot = this._dotsBlock.childNodes; // for dot mark active book

    activeDot[currentStep].className = 'fa fa-circle switcher__dot'; // make current dot inActive
    activeDot[nextDot].className += ' switcher__dot_active'; // make next dot Active
    this.setState({
      currentStep: nextDot
    }); // current = next;
  }

  componentDidMount() {
    if (!this._switcher) return

    this.resetVarsOnResize(); // from switch-book.js create dots equile count of books in category

    this._sliderBlock.addEventListener('touchmove', (event) => this.getSwitchPos(event), false);
    this._sliderBlock.addEventListener('touchstart', (event) => this.getSwitchPos(event), false);
    this._sliderBlock.addEventListener('touchend', (event) => this.getSwitchPos(event), false);
  }

  componentWillMount() {
    window && window.addEventListener("resize", this.resetVarsOnResize, false);
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
        <ControlBtnView transformFunc={ this.endSwitchTransform }
          btnDirect={ 1 }
          currentSwitchPos={ currentStep }
          endSwitchPos={ endOfSwitch } />
        <ControlBtnView transformFunc={ this.endSwitchTransform }
          btnDirect={ -1 }
          currentSwitchPos={ currentStep }
          endSwitchPos={ endOfSwitch } />
      </div>
      );
  }
}

const ControlBtnView = ({transformFunc, btnDirect, currentSwitchPos, endSwitchPos}) => {
  let btnView;

  if ((currentSwitchPos === endSwitchPos && btnDirect === -1) || (currentSwitchPos === 0 && btnDirect === 1)) {
    btnView = false
  } else {
    btnView = true
  }

  let btnClass = classNames('switcher__button', {
    'switcher__button_hide': !btnView
  }, {
    'btn-prev': btnDirect === 1,
    'btn-next': btnDirect === -1
  });

  return (
    <div className={ btnClass } onClick={ (directTransform) => transformFunc(btnDirect) }></div>
    );
}