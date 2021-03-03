const { IgnorePlugin } = require('webpack');

const config = {
    mode: 'production',
    entry: ["./src/main.js"],
    target: "node",
    plugins: [
		new IgnorePlugin({
			resourceRegExp: /^pg-native$/,
		}),
	],
}

module.exports = config;

