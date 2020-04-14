/*
 * Copyright 2017-2020 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SVG from "react-inlinesvg";

import ArrangeHorizontally from "./../../assets/images/arrange_horizontally.svg";
import ArrangeVertically from "./../../assets/images/arrange_vertically.svg";
import Double from "./../../assets/images/double.svg";
import Integer from "./../../assets/images/integer.svg";
import StringIcon from "./../../assets/images/string.svg";
import NotificationCounterIcon from "./../../assets/images/notification_counter_icon.svg";
import PaletteClose from "./../../assets/images/palette/palette_close.svg";
import PaletteOpen from "./../../assets/images/palette/palette_open.svg";
import ZoomToFit from "./../../assets/images/zoom_to_fit.svg";

import WarningFilled16 from "@carbon/icons-react/es/warning--filled/16";
import ErrorFilled16 from "@carbon/icons-react/es/error--filled/16";
import CheckmarkFilled16 from "@carbon/icons-react/es/checkmark--filled/16";
import InformationFilled16 from "@carbon/icons-react/es/information--filled/16";
import Information16 from "@carbon/icons-react/es/information/16";

import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import ChevronUp16 from "@carbon/icons-react/es/chevron--up/16";
import ChevronLeft16 from "@carbon/icons-react/es/chevron--left/16";
import ChevronRight16 from "@carbon/icons-react/es/chevron--right/16";

import OverflowMenuVertical16 from "@carbon/icons-react/es/overflow-menu--vertical/16";
import AddAlt16 from "@carbon/icons-react/es/add--alt/16";
import Settings16 from "@carbon/icons-react/es/settings/16";
import Search16 from "@carbon/icons-react/es/search/16";
import Warning16 from "@carbon/icons-react/es/warning/16";
import Edit16 from "@carbon/icons-react/es/edit/16";

import StopFilledAlt16 from "@carbon/icons-react/es/stop--filled--alt/16";
import Play16 from "@carbon/icons-react/es/play/16";
import Undo16 from "@carbon/icons-react/es/undo/16";
import Redo16 from "@carbon/icons-react/es/redo/16";
import Cut16 from "@carbon/icons-react/es/cut/16";
import Copy16 from "@carbon/icons-react/es/copy/16";
import Paste16 from "@carbon/icons-react/es/paste/16";
import AddComment16 from "@carbon/icons-react/es/add-comment/16";
import Delete16 from "@carbon/icons-react/es/delete/16";

import ZoomIn16 from "@carbon/icons-react/es/zoom--in/16";
import ZoomOut16 from "@carbon/icons-react/es/zoom--out/16";

import CircleDash16 from "@carbon/icons-react/es/circle-dash/16";
import RulerAlt16 from "@carbon/icons-react/es/ruler--alt/16";
import ListNumbered16 from "@carbon/icons-react/es/list--numbered/16";
import ListBulleted16 from "@carbon/icons-react/es/list--bulleted/16";
import Flag16 from "@carbon/icons-react/es/flag/16";
import ChartVennDiagram16 from "@carbon/icons-react/es/chart--venn-diagram/16";

import Calendar16 from "@carbon/icons-react/es/calendar/16";
import Time16 from "@carbon/icons-react/es/time/16";
import EventSchedule16 from "@carbon/icons-react/es/event--schedule/16";

import { ERROR, WARNING, INFO, SUCCESS, CANVAS_CARBON_ICONS, CONTEXT_MENU_CARBON_ICONS, TOOLBAR_ACTIONS } from "../common-canvas/constants/canvas-constants";
import { CONDITION_MESSAGE_TYPE, CARBON_ICONS, DATA_TYPE } from "../common-properties/constants/constants";

const iconClassName = "properties-icon";

export default class Icon extends React.Component {
	constructor() {
		super();
		this.canvasIcons = {
			arrangeHorizontally: ArrangeHorizontally,
			arrangeVertically: ArrangeVertically,
			double: Double,
			integer: Integer,
			string: StringIcon,
			notificationCounterIcon: NotificationCounterIcon,
			paletteClose: PaletteClose,
			paletteOpen: PaletteOpen,
			zoomToFit: ZoomToFit
		};
	}

	getCarbonIcon(type, customClassName) {
		const className = iconClassName + " " + customClassName;
		switch (type) {
		case (ERROR):
		case (CONDITION_MESSAGE_TYPE.ERROR):
			return <ErrorFilled16 className={classNames("canvas-state-icon-error", className)} disabled={this.props.disabled} />;
		case (WARNING):
		case (CONDITION_MESSAGE_TYPE.WARNING):
			return <WarningFilled16 className={classNames("canvas-state-icon-warning", className)} disabled={this.props.disabled} />;
		case (SUCCESS):
		case (CONDITION_MESSAGE_TYPE.SUCCESS):
			return <CheckmarkFilled16 className={classNames("canvas-state-icon-success", className)} disabled={this.props.disabled} />;
		case (CONDITION_MESSAGE_TYPE.INFO):
			return <InformationFilled16 className={classNames("canvas-state-icon-info", className)} disabled={this.props.disabled} />;

		case (INFO):
		case (CARBON_ICONS.INFORMATION):
			return <Information16 className={classNames("canvas-state-icon-information-hollow", className)} disabled={this.props.disabled} />;
		case (CARBON_ICONS.CHEVRONARROWS.UP):
			return <ChevronUp16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.CHEVRONARROWS.DOWN):
			return <ChevronDown16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.CHEVRONARROWS.LEFT):
			return <ChevronLeft16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.CHEVRONARROWS.RIGHT):
			return <ChevronRight16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.ADD):
			return <AddAlt16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.SETTINGS):
			return <Settings16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.EDIT):
			return <Edit16 className={className} disabled={this.props.disabled} />;

		case (CANVAS_CARBON_ICONS.OVERFLOWMENU):
			return <OverflowMenuVertical16 className={className} disabled={this.props.disabled} />;
		case (CANVAS_CARBON_ICONS.SEARCH):
			return <Search16 className={className} disabled={this.props.disabled} />;
		case (CANVAS_CARBON_ICONS.WARNING_UNFILLED):
			return <Warning16 className={className} disabled={this.props.disabled} />;

		case (CONTEXT_MENU_CARBON_ICONS.CHEVRONARROWS.RIGHT):
			return <ChevronRight16 className={className} disabled={this.props.disabled} />;

		case (TOOLBAR_ACTIONS.TOOLBAR_STOP):
			return <StopFilledAlt16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_RUN):
			return <Play16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_UNDO):
			return <Undo16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_REDO):
			return <Redo16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_CUT):
			return <Cut16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_COPY):
			return <Copy16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_PASTE):
			return <Paste16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_CREATE_AUTO_COMMENT):
			return <AddComment16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_DELETE_SELECTED_OBJECTS):
			return <Delete16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_ZOOM_IN):
			return <ZoomIn16 className={className} disabled={this.props.disabled} />;
		case (TOOLBAR_ACTIONS.TOOLBAR_ZOOM_OUT):
			return <ZoomOut16 className={className} disabled={this.props.disabled} />;

		case (CARBON_ICONS.MEASUREMENTS.EMPTY):
			return <CircleDash16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.MEASUREMENTS.SCALE):
			return <RulerAlt16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.MEASUREMENTS.ORDINAL):
			return <ListNumbered16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.MEASUREMENTS.NOMINAL):
			return <ListBulleted16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.MEASUREMENTS.FLAG):
			return <Flag16 className={className} disabled={this.props.disabled} />;
		case (CARBON_ICONS.MEASUREMENTS.DISCRETE):
			return <ChartVennDiagram16 className={className} disabled={this.props.disabled} />;

		case (DATA_TYPE.DATE):
			return <Calendar16 className={className} disabled={this.props.disabled} />;
		case (DATA_TYPE.TIME):
			return <Time16 className={className} disabled={this.props.disabled} />;
		case (DATA_TYPE.TIMESTAMP):
			return <EventSchedule16 className={className} disabled={this.props.disabled} />;

		default: return null;
		}
	}

	getCanvasIcon(type) {
		return this.canvasIcons[type];
	}

	render() {
		let icon = this.getCarbonIcon(this.props.type, this.props.className);
		if (!icon) {
			icon = this.getCanvasIcon(this.props.type);
			if (typeof icon !== "undefined") {
				icon = <SVG src={icon} className={classNames("canvas-icon", iconClassName, this.props.className)} disabled={this.props.disabled} />;
			} else {
				icon = <div />;
			}
		}
		return icon;
	}
}

Icon.defaultProps = {
	className: "",
	disabled: false
};

Icon.propTypes = {
	type: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool
};
