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

var json1 = {
	'@media (max-width: 800px)': {
		'#all #comments': {
			'margin': '0px',
			'width': 'auto',
			'font-size' : '1.1rem'
		},
		'#all #buttons': {
			'padding': '5px 10px',
			'font-size' : '1.5rem'
		}
	},
	'#all #content': {
		'margin': '10% 5% 5% 10%',
		'width': 'auto'
	},
	'#menu': {
		'border-bottom': '1px solid #ffa500',
		'margin-bottom': '1.5rem',
		'font-size' : '1.1rem'
	}
};

var css1 = jss.toCss(json1);
var json2 = jss.toJs(css1);

console.log(JSON.stringify(json2));
console.log(JSON.stringify(json1) === JSON.stringify(json2));