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

import {DND_DATA_TEXT} from '../../constants/common-constants.js'

class PaletteContentNode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.tempNodeCreated = false;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }

  onDragStart(ev) {
    ev.dataTransfer.setData(DND_DATA_TEXT,
      JSON.stringify({
        operation: 'createFromTemplate',
        typeId: this.props.nodeTemplate.typeId,
        label: this.props.nodeTemplate.label
      }));
    // Create a temp node and use it to display a drag image.
    //let tempNode = this.props.createTempNode(ev.target.id);
    //this.tempNodeCreated = true;
    //ev.dataTransfer.setDragImage(tempNode.obj, tempNode.xOffset, 0);
  }

  onDragOver(ev) {
    // Delete the temp node as soon as we start dragging the temp node's image.
    if (this.tempNodeCreated === true) {
      this.props.deleteTempNode();
      this.tempNodeCreated = false;
    }
  }

  render() {
    return (
      <div id={this.props.nodeTemplate.id}
           draggable="true"
           onDragStart={this.onDragStart}
           onDragOver={this.onDragOver}
           className="palette-grid-node-outer">
        <div className="palette-grid-node-inner">
          <div className="palette-grid-node-icon">
            <img className="node-icon" src={this.props.nodeTemplate.iconpath} alt={this.props.nodeTemplate.label}/>
          </div>
          <div className="palette-grid-node-text">
            {this.props.nodeTemplate.label}
          </div>
        </div>
      </div>
    );
  }
}

PaletteContentNode.propTypes = {
  nodeTemplate: React.PropTypes.object
};

export default PaletteContentNode;