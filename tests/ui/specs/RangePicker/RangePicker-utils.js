// Utility methods for testing

const extractValue = (rangePicker) => {
	return parseInt(rangePicker.selectedItem(rangePicker.self).getText());
};

module.exports = {
	extractValue
};
