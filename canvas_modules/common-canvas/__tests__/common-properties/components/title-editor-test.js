/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import TitleEditor from "../../../src/common-properties/components/title-editor";
import Controller from "../../../src/common-properties/properties-controller";
import { mount } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";

const controller = new Controller();
controller.setTitle("test title");
const form = {
	componentId: "test-id"
};
controller.setForm(form);
const appData = {
	nodeId: "node-id"
};
controller.setAppData(appData);

const helpClickHandler = sinon.spy();
const help = { data: "test-data" };

describe("title-editor renders correctly", () => {

	it("props should have been defined", () => {
		const wrapper = mount(
			<TitleEditor
				controller={controller}
				helpClickHandler={helpClickHandler}
				labelEditable
				help={help}
			/>
		);
		expect(wrapper.prop("controller")).to.equal(controller);
		expect(wrapper.prop("helpClickHandler")).to.equal(helpClickHandler);
		expect(wrapper.prop("labelEditable")).to.equal(true);
		expect(wrapper.prop("help")).to.eql(help);
	});
	it("test help button callback", (done) => {
		function callback(componentId, inData, inAppData) {
			expect(componentId).to.equal("test-id");
			expect(inData).to.equal("test-data");
			expect(inAppData).to.eql(appData);
			done();
		}
		const wrapper = mount(
			<TitleEditor
				controller={controller}
				helpClickHandler={callback}
				labelEditable
				help={help}
			/>
		);
		const helpButton = wrapper.find(".title-help-right-flyout-panel");
		expect(helpButton).to.have.length(1);
		helpButton.simulate("click");
	});
	it("test with no help", () => {
		const wrapper = mount(
			<TitleEditor
				controller={controller}
				helpClickHandler={helpClickHandler}
				labelEditable
			/>
		);
		expect(wrapper.find(".title-help-right-flyout-panel")).to.have.length(0);
	});
	it("test help button without a callback", () => {
		helpClickHandler.reset();
		const wrapper = mount(
			<TitleEditor
				controller={controller}
				labelEditable
				help={help}
			/>
		);
		const helpButton = wrapper.find(".title-help-right-flyout-panel");
		helpButton.simulate("click");
	});
	it("test edit link", () => {
		helpClickHandler.reset();
		const wrapper = mount(
			<TitleEditor
				controller={controller}
				labelEditable
				help={help}
			/>
		);
		const titleEdit = wrapper.find(".title-edit-right-flyout-panel");
		titleEdit.simulate("click");
		expect(wrapper.find("input").node).to.equal(document.activeElement);
	});
	it("test editing node title", () => {
		controller.setTitle("test title");
		helpClickHandler.reset();
		const wrapper = mount(
			<TitleEditor
				controller={controller}
				labelEditable
			/>
		);
		const input = wrapper.find("input");
		input.simulate("change", { target: { value: "My new title" } });
		expect("My new title").to.equal(controller.getTitle());
	});
	it("test label is readonly", () => {
		helpClickHandler.reset();
		const wrapper = mount(
			<TitleEditor
				controller={controller}
				labelEditable={false}
			/>
		);
		const input = wrapper.find("input");
		expect(input.prop("readOnly")).to.equal(true);
	});
});