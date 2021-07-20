// Utility methods for testing

const extractValue = (picker) => {
	return picker.selectedItem(picker.self).getText();
};

module.exports = {
	extractValue
};
