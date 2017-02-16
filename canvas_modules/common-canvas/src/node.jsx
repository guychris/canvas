/****************************************************************
** IBM Confidential
**
** OCO Source Materials
**
** SPSS Modeler
**
** (c) Copyright IBM Corp. 2016
**
** The source code for this program is not published or otherwise
** divested of its trade secrets, irrespective of what has been
** deposited with the U.S. Copyright Office.
*****************************************************************/

import React from 'react'
import ReactDOM from 'react-dom'
import { ContextMenuLayer } from 'react-contextmenu'
import {DND_DATA_TEXT} from '../constants/common-constants.js';
import {Tooltip,OverlayTrigger} from 'react-bootstrap'

// export default class Node extends React.Component {
class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: false,
      showCircle:false
    };
    this.dragStart = this.dragStart.bind(this);
    //this.drag = this.drag.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.drop = this.drop.bind(this);

    this.linkDragStart = this.linkDragStart.bind(this);
    this.linkDragOver = this.linkDragOver.bind(this);
    this.linkDragEnd = this.linkDragEnd.bind(this);
    this.linkDrop = this.linkDrop.bind(this);

    this.nodeClicked = this.nodeClicked.bind(this);
    this.nodeDblClicked = this.nodeDblClicked.bind(this);
    this.showContext = this.showContext.bind(this);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnterInnerCircle = this.handleMouseEnterInnerCircle.bind(this);
  }


  handleMouseEnterInnerCircle(ev){
    this.setState({
      showCircle:false
    });
  }

  handleMouseLeave(ev){
    this.setState({
      showCircle:false
    });
    // console.log('handleMouseLeave');
  }

  handleMouseEnter(ev){
    this.setState({
      showCircle:true
    });
    // console.log('handleMouseEnter');
  }

  dragStart(ev) {
    // ev.preventDefault();
    ev.dataTransfer.effectAllowed = 'move';
    //console.log("Node.dragStart(): x=" + ev.clientX + ",y=" + ev.clientY + ", node.id=" + this.props.node.id );
    //var invImg = document.getElementById("invisibleDiv"); // defined in canvas.jsx
    //ev.dataTransfer.setDragImage(invImg, 0, 0);
    ev.dataTransfer.setData(DND_DATA_TEXT,
      JSON.stringify({
        operation: 'move',
        id: this.props.node.id,
        label: this.props.node.objectData.label
       }));
  }

  dragEnd(ev) {
    //console.log("Node.dragEnd(): x=" + ev.clientX + ",y=" + ev.clientY);
    //console.log(ev);
  }

  drop(ev) {
    //console.log("Node.drop()");
    //console.log(ev);
    //console.log(ev.dataTransfer.getData(DND_DATA_TEXT));
    this.props.nodeActionHandler('dropOnNode', ev);
  }

  contains(list, value) {
    for( var i = 0; i < list.length; ++i ) {
        if(list[i] === value)
          return true;
    }
    return false;
  }

  linkDragStart(connType, ev) {
    //console.log("Node.linkDragStart(): x=" + ev.clientX + ",y=" + ev.clientY + ", node.id=" + this.props.node.id );
    ev.dataTransfer.effectAllowed = 'link';

    //avoiding halo's ghost image when dragging
    let ghost = document.createElement("div");
    ghost.style.height="1px";
    ghost.style.width="1px";
    document.body.appendChild(ghost);
    ev.dataTransfer.setDragImage(ghost, 0, 0);


    ev.dataTransfer.setData(DND_DATA_TEXT,
      JSON.stringify({
        operation: 'link',
        id: this.props.node.id,
        label: this.props.node.objectData.label,
        connType: connType
       }));
  }

  linkDragOver(ev) {
    ev.preventDefault();
  }

  linkDragEnd(connType, ev) {
    console.log("Node.linkDragEnd()");
  }

  linkDrop(ev) {
    console.log("Node.linkDrop()");
    this.drop(ev);
  }

  nodeClicked(ev) {
    // console.log("Node.nodeClicked()");
    ev.stopPropagation();
    // node is already bound
    this.props.nodeActionHandler('selected', ev);
  }

  nodeDblClicked(ev) {
    //console.log("Node.nodeDblClicked()");
    //console.log(ev)
    ev.stopPropagation();
    this.props.nodeActionHandler('editNode', ev);
  }

  showContext(ev) {
    console.log("showContext()");
    console.log(ev);
    this.setState({ context: true });
  }

  render() {
    // console.log("Node.render()");
    // console.log(this.props.node);
    let zoom = this.props.uiconf.zoom;

    var nodeStyle = {
      position: 'absolute',
      top: Math.round(this.props.node.yPos * zoom),
      left: Math.round(this.props.node.xPos * zoom),
      width: this.props.uiconf.nodeWidth,
      height: this.props.uiconf.nodeHeight
    };

    var connInBtnStyle = {
      position: 'absolute',
      width: this.props.uiconf.connSize,
      height: this.props.uiconf.connSize,
      top: this.props.uiconf.connOffsets.top,
      left: this.props.uiconf.connOffsets.inLeft,
    };

    var connOutBtnStyle = {
      position: 'absolute',
      width: this.props.uiconf.connSize,
      height: this.props.uiconf.connSize,
      top: this.props.uiconf.connOffsets.top,
      right: this.props.uiconf.connOffsets.outRight,
    };

    var cacheStyle = {
      position: 'absolute',
      width: this.props.uiconf.connSize,
      height: this.props.uiconf.connSize,
      top: 0,
      right: this.props.uiconf.connOffsets.outRight,
      zIndex:1
    };

    var supernodeZoomInStyle = {
      position: 'absolute',
      width: this.props.uiconf.connSize,
      height: this.props.uiconf.connSize,
      top: 0,
      left: this.props.uiconf.connOffsets.inLeft,
      zIndex:1
    };

    let connectorImage = "/canvas/images/forward_32.svg";

    var connIn = null;
    if (this.props.node.inConnector) {
      connIn = <img
        src={connectorImage}
        ref='connIn'
        className="connector"
        style={connInBtnStyle}
        node={this.props.node}
        draggable="true"
        onDragStart={this.linkDragStart.bind(null, 'connIn')}
        onDragEnd={this.linkDragEnd.bind(null, 'connIn')}
        onDrop={this.linkDrop}
        onDragOver={this.linkDragOver}
        onClick={this.props.nodeActionHandler.bind(null, 'connIn')}
        />;
    }

    var connOut = null;
    if (this.props.node.outConnector) {
      connOut = <img
        src={connectorImage}
        ref='connOut'
        className="connector"
        style={connOutBtnStyle}
        node={this.props.node}
        draggable="true"
        onDragStart={this.linkDragStart.bind(null, 'connOut')}
        onDragEnd={this.linkDragEnd.bind(null, 'connOut')}
        onDrop={this.linkDrop}
        onDragOver={this.linkDragOver}
        onClick={this.props.nodeActionHandler.bind(null, 'connOut')}
        />;
    }

    var supernodeZoomIn = [];
    if (this.props.node.subDiagramId) {
      supernodeZoomIn = <img className="supernode-zoom-in" style={supernodeZoomInStyle} onClick={this.props.nodeActionHandler.bind(null, 'supernodeZoomIn')}/>;
    }

    var cache = [];
    if (this.props.node.cacheState != "disabled") {
      cache = <img className={"cache-" + this.props.node.cacheState} style={cacheStyle}/>;
    }

    var className = "canvas-node";
    if (this.props.selected) {
      className += " selected";
    }

    let labelStyle ={
      whiteSpace: 'nowrap',
      width: '5em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: this.props.uiconf.fontSize,
      display:'inline-block'
    };

    //TODO anything better to use as an id ?
    let labelWithTooltipView = <OverlayTrigger
      overlay={
        <Tooltip id={this.props.node.objectData.label}>
          {this.props.node.objectData.label}
        </Tooltip>
      }
      placement="top"
      delayShow={300}
      delayHide={150}
      >
      <div style={labelStyle}>
        {this.props.node.objectData.label}
      </div>
    </OverlayTrigger>;

  let cTop = Math.round(this.props.node.yPos * zoom) - (10 * zoom);
  let cLeft = Math.round(this.props.node.xPos * zoom) + (10 * zoom);
  let cWidth = (70 * zoom);
  let cHeight = cWidth;


  let cInnerTop = Math.round(this.props.node.yPos * zoom) - (zoom);
  let cInnerLeft = Math.round(this.props.node.xPos * zoom) + (20 * zoom);
  let cInnerWidth = (50 * zoom);
  let cInnerHeight = cInnerWidth;


  let paddingCircleStyle = {

        top: cTop,
        left: cLeft,
        width: cWidth,
        height: cHeight,
        border: `${ 8 * zoom}px solid white`,
        position: 'absolute',
        borderRadius: '50%',

        backgroundColor : 'white'

  };

  let circleStyle = (this.state.showCircle)
    ? {
        top: cTop,
        left: cLeft,
        width: cWidth,
        height: cHeight,
        border: `${ 7 * zoom}px solid #4178be`,
        position: 'absolute',
        borderRadius: '50%',
        zIndex:1,
        //backgroundColor : 'yellow'
    }
    : {
      top: cTop,
      left: cLeft,
      width: cWidth,
      height: cHeight,
      position: 'absolute',
      borderRadius: '50%',
      zIndex:1,
      //backgroundColor : 'yellow'
    };

    let innerCircleStyle =
       {
         top: cInnerTop,
         left: cInnerLeft,
         width: cInnerWidth,
         height: cInnerHeight,
         position: 'absolute',
         borderRadius: '50%',
         zIndex:1,
         //backgroundColor : 'red'
      };

    //console.log('ZOOM : '+zoom);
    //console.log('circleStyle :'+JSON.stringify(circleStyle));
    let circle = <div>

      <div
        className="padding-circle"
        style={paddingCircleStyle}
        >
      </div>
      <div
        className="node-circle"
        style={circleStyle}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref='connOut'
        node={this.props.node}
        draggable="true"
        onDragStart={this.linkDragStart.bind(null, 'connOut')}
        onDragEnd={this.linkDragEnd.bind(null, 'connOut')}
        onDrop={this.linkDrop}
        onDragOver={this.linkDragOver}
        onClick={this.props.nodeActionHandler.bind(null, 'connOut')}>
      </div>

      <div
        className="node-inner-circle"
        style={innerCircleStyle}
        onMouseEnter={this.handleMouseEnterInnerCircle}
        draggable="true"
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
        onDrop={this.drop}
        onContextMenu={this.props.onContextMenu}
        >
        <img
            src={this.props.node.iconpath} alt={this.props.label}
            width={this.props.uiconf.iconSize}
            height={this.props.uiconf.iconSize}
            onClick={this.nodeClicked}
            onDoubleClick={this.nodeDblClicked}
            />
      </div>
    </div>;

    //this is a placeholder div to keep the correct positioning of elements
    let nodeIconPlaceholderStyle = {
      minHeight: '1px',
      width: this.props.uiconf.iconSize,
      height: this.props.uiconf.iconSize
    };




    return (
      <div>
        {circle}
        <div
          className={className}
          style={nodeStyle}
          >
        <div>
          <div style={nodeIconPlaceholderStyle}/>
          {supernodeZoomIn}
          {cache}
        </div>
        <div style={{'textAlign':'center'}}>
          {labelWithTooltipView}
        </div>

      </div>
      </div>
    );
  }
}

Node.propTypes = {
  node: React.PropTypes.object,
  label: React.PropTypes.string,
  nodeActionHandler: React.PropTypes.func,
  onContextMenu: React.PropTypes.func,
  uiconf: React.PropTypes.object,
  selected: React.PropTypes.bool
};

export default Node;