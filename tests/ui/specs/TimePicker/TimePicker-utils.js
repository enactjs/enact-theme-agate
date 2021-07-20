// Utility methods for testing
const extractValues = (picker) => {
	const hour = parseInt(picker.selectedItem(picker.hour).getText());
	const minute = parseInt(picker.selectedItem(picker.minute).getText());
	const meridiem = picker.meridiem.isExisting() ? picker.selectedItem(picker.meridiem).getText() : null;

	return {hour, minute, meridiem};
};

module.exports = {
	extractValues
};
