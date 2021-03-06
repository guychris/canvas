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

import logger from "./../../../../utils/logger";
import utils from "./../conditions-utils.js";

function op() {
	return "contains";
}

function evaluate(paramInfo, param2Info, value, controller) {
	const unsupportedControls = ["checkbox", "numberfield", "passwordfield"];
	if (unsupportedControls.indexOf(paramInfo.control.controlType) < 0) {
		const dataType = typeof paramInfo.value;
		if (typeof param2Info !== "undefined") {
			switch (dataType) {
			case "undefined":
				return false;
			case "string":
				return paramInfo.value.indexOf(param2Info.value) >= 0;
			case "object":
				return paramInfo.value === null ? false : utils.searchInArray(paramInfo.value, param2Info.value, false);
			default:
				logger.warn("Ignoring condition operation 'contains' for parameter_ref " + paramInfo.param + " with input data type " + dataType);
				return true;
			}
		} else if (typeof value !== "undefined") {
			switch (dataType) {
			case "undefined":
				return false;
			case "string":
				return paramInfo.value.indexOf(value) >= 0;
			case "object":
				return paramInfo.value === null ? false : utils.searchInArray(paramInfo.value, value, false);
			default:
				logger.warn("Ignoring condition operation 'contains' for parameter_ref " + paramInfo.param + " with input data type " + dataType);
				return true;
			}
		}
		throw new Error("Insufficient parameter for condition operation contains");
	}
	logger.warn("Ignoring unsupported condition operation 'contains' for control type " + paramInfo.control.controlType);
	return true;
}

// Public Methods ------------------------------------------------------------->

module.exports.op = op;
module.exports.evaluate = evaluate;
