Feature: StructureListEditorControl

	** Make sure the test harness is running and listening to http://localhost:3001 ***

	As a human
	I want to test a common-properties structurelisteditor control

	Scenario: Test of subpanel editing of selectcolumns in a structurelisteditor
		Then I resize the window size to 1400 width and 800 height

		Given I am on the test harness
		Given I have toggled the app side common-properties panel
		Then I have selected the "Flyout" properties container type
		Given I have uploaded common-properties file "selectcolumns_paramDef.json" of type "parameterDefs"

		Then I open the "Table" category
		Then I open the "Configure Fields in Sub-panel" summary link in the "Table" category
		Then I click the "Add" button on the "structurelist_sub_panel" table
		Then I click the subpanel button in control "structurelist_sub_panel" in row "0"
		Then I click the "Add" button on the "fields2" table
		Then I select field "Na" with data type "double" in the field picker panel "Select Fields for Select Columns"
		Then I click on the field picker "apply" button

		# Verify two rows are in selectColumns
		Then I verify the selectColumns table "fields2" contains "BP" at index 0 in panel "structurelist_sub_panel_info"
		Then I verify the selectColumns table "fields2" contains "Na" at index 1 in panel "structurelist_sub_panel_info"

		# Go back into field picker and verify the two options are still selected
		Then I click the "Add" button on the "fields2" table
		Then I verify field "BP" with data type "string" is selected in the field picker panel "Select Fields for Select Columns"
		Then I verify field "Na" with data type "double" is selected in the field picker panel "Select Fields for Select Columns"
		Then I click on the field picker "cancel" button

		# Verify the string array in structurelisteditor table
		Then I click on the "structurelist_sub_panel_info" panel OK button
		Then I verify the StructureListEditor table "structurelist_sub_panel" contains "BP, Na" at row 0 col 0

	Scenario: Test the feature to have tables use the available vertical space
		Then I resize the window size to 1400 width and 800 height

		Given I am on the test harness
		Given I have toggled the app side common-properties panel
		Then I have selected the "Flyout" properties container type
		Given I have uploaded common-properties file "selectcolumns_paramDef.json" of type "parameterDefs"
		Then I open the "Table" category
		Then I open the "Configure Fields in Sub-panel" summary link in the "Table" category
		Then I verify the table "structurelist_sub_panel" is of height "501px"
