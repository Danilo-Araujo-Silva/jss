var jss = new function jss() {
	var self = this;

	self.toCss = function toCss(value) {
		return JSON.stringify(value)
			.replace(/^[{]|[}]$/g, '')
			.replace(/:{/g, '{')
			.replace(/},/g, '}')
			.replace(/,/g, ';')
			.replace(/"/g, '')
		;
	};

	self.toJs = function toJs(value) {
		var output = value
			.replace(/([^{};]+:[^{};]+)/g, '"$1"')
			.replace(/([{}])([^{};]+)([{}])/g, '$1"$2"$3')
			.replace(/"([^@{},]*?):([^@{},]*?)"/g, '"$1":"$2"')
			.replace(/;/g, ',')
			.replace(/}/g, '},')
			.replace(/{/g, ':{')
			.replace(/^(.)/g, '{$1')
			.replace(/(.)$/g, '$1}')
			.replace(/},}/g, '}}')
		;

		return JSON.parse(output);
	}
}