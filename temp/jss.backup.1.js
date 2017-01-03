var jss1 = new function jss1() {
	var self = this;

	self.validateRoot = function validateRoot(value) {
		if (
			!value
			|| typeof(value) !== 'object'
			|| (Object.keys(value).length === 0 && value.constructor === Object)
		) {
			throw new Error('Invalid root node to conversion. Root node => key: ' + key +	', value: ' + value);
		}

		return true;
	};

	self.validateMiddle = function validateMiddle(key, value) {
		if (
			!key
			|| typeof(key) !== 'string'
		) {
			throw new Error('Invalid middle node to conversion. Middle node => key: ' + key +	', value: ' + value);
		}

		if (
			!value
			|| typeof(value) !== 'object'
			|| (Object.keys(value).length === 0 && value.constructor === Object)
		) {
			throw new Error('Invalid middle node to conversion. Middle node => key: ' + key +	', value: ' + value);
		}

		return true;	
	};

	self.validateLeaf = function validateLeaf(key, value) {
		if (
			!key
			|| typeof(key) !== 'string'
		) {
			throw new Error('Invalid leaf node to conversion. Leaf node => key: ' + key +	', value: ' + value);
		}

		if (
			!value
			|| (
				typeof(value) !== 'string'
				&& typeof(value) !== 'integer'
			)
		) {
			throw new Error('Invalid leaf node to conversion. Leaf node => key: ' + key +	', value: ' + value);
		}

		return true;
	};

	self.convert = function convert(value) {
		if (self.validateRoot(value)) {
			var output = '';
			var subKeys = Object.keys(value);
			var lastKey = subKeys[subKeys.length - 1];

			for (var subKey in value) {
				var subValue = value[subKey];
				output += self.convertMiddle(subKey, subValue, 0);

				if (subKey != lastKey) {
					output += '\n\n';
				}
			}

			return output;
		}
	};

	self.convertMiddle = function converMiddle(key, value, level) {
		if (self.validateMiddle(key, value)) {
			if (typeof(level) === 'undefined') {
				level = 0;
			}

			var output = '';
			var subKeys = Object.keys(value);
			var lastKey = subKeys[subKeys.length - 1];
			
			for (var subKey in value) {
				var subValue = value[subKey];
				if (
					typeof(subValue) === 'object'
				) {
					var subIdentation = new Array(level).join(' ');
					output += self.convertMiddle(subKey, subValue, level + 1);
				} else {
					output += self.convertLeaf(subKey, subValue, level + 1);
				}

				if (subKey != lastKey) {
					output += '\n';
				}
			}

			var identation = new Array(level + 1).join(' ');

			output = identation + key + ' {\n' + output + '\n' + identation + '}';

			return output;
		}
	};

	self.convertLeaf = function convertLeaf(key, value, level) {
		if (self.validateLeaf(key, value)) {
			if (typeof(level) === 'undefined') {
				level = 1;
			}

			var identation = new Array(level + 1).join(' ');

			return identation + key + ' : ' + value + ';';
		}
	};
};

var css1 = {
	'*': {
		'display' : 'inline-block',
		'box-sizing' : 'border-box'
	},
	'@media all' : {
		'div' : {
			'display' : 'inline-block',
			'font-size' : '1.1em'
		}
	}
};

var css2 = {
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

console.log(jss1.convert(css1));
console.log(jss1.convert(css2));

var jss2 = new function jss2() {
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
		return '{' +
			value
				.replace(/{/g, ':{')
				.replace(/}/g, '},')
				.replace(/;/g, ',')
			+ '}'
		;	
	}
}

console.log('js', JSON.stringify(css2));
console.log('js2css', jss2.toCss(css2));
console.log('css2js', jss2.toJs(jss2.toCss(css2)));