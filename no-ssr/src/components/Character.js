import React, { Component } from 'react'

class Character extends Component {
  componentDidMount() {
    if (this.fullImg && this.fullImg.complete) {
      this.props.handleLoad();
    }
  }
  
  render() {
    const { imgData, imgLoaded, handleLoad } = this.props;
    let placeholderClasses = 'placeholder';
    if (imgLoaded) {
      placeholderClasses += ' fadeOut';
    }
    return (
      <div className="hero-img">
        <img className="full" onLoad={handleLoad} src={imgData.src} ref={node => this.fullImg = node}/>
        <img className={placeholderClasses} src={imgData.placeholder} />
      </div>
    );
  }
};

export default Character;