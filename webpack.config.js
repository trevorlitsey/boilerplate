const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'entry.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[hash].bundle.js',
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	mode: process.env.NODE_ENV || 'development',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		host: '0.0.0.0',
		port: 8080,
		hot: true,
		inline: true,
		historyApiFallback: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(['public/*.js', 'public/*.html']),
		new HtmlWebpackPlugin({
			template: './templates/index.html',
			title: 'Boilerplate Boilerplate',
		}),
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
				]
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "postcss-loader" },
					{ loader: "sass-loader" },
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
						},
					},
				],
			}
		]
	}
};