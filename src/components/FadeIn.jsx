import React, {Component} from 'react';

import './FadeIn.scss';

export default class FadeIn extends Component {

  componentDidMount() {
    window.setTimeout(() => {
      this._otherPage.className = "transition-item transition-item_show";
    }, 1000 / 60);
  }

  render() {
    return (
      <div ref={ (div) => {
             this._otherPage = div
           } } className="transition-item">
        { this.props.children }
      </div>
    )
  }
}