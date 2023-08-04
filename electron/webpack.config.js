const path = require('path')
const webpack = require('webpack')

const MODE = "development";
//const MODE = "production";

const prod = MODE === 'production';

module.exports = {
	mode: MODE,
	context: path.resolve(__dirname, '.'),
    entry: {
		renderer: 'renderer.js',
		electron: 'electron.js',
		password: 'password.js'
	},
    output: {
        path: path.resolve(__dirname, 'dist'),
        //publicPath: '/manage/dist/',
        filename: '[name].js'
    },
    devtool: false,
	watchOptions: {
		ignored: [ 'node_modules', 'public', 'dist', 'config', 'client', 'release' ]
	},
	module: {
        rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod
					}
				}
			},
			{
				test: /\.css/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{	//	https://stackoverflow.com/questions/68468150/webpack-custom-font-loading-resulted-ots-parsing-error-invalid-sfntversion
				test: /\.woff(2)?(\?v=[0-9]\.[0-9])?$/,
				type: 'asset/resource',
    			dependency: { not: ['url'] }
			},
            {
				test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                  {loader: 'file-loader'}
				]
			},
			{
                test: /\.(ttf|eot|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                }]
            }
		]
    },
	resolve: {
		alias: {
			path: "path-browserify",
		},
		modules: [
			'node_modules',
			'front/javascripts',
			'libs'
		],
	}
}
