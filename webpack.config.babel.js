const AutoPrefixer       = require('autoprefixer');
const Webpack            = require('webpack');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const PathRewriterPlugin = require('webpack-path-rewriter');
const Path               = require('path');
const BrowserSyncPlugin  = require('browser-sync-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const packageInformation = require('./package.json');

module.exports = (function() {
	const PRODUCTION  = process.env.NODE_ENV === 'production';
	const LIVE_RELOAD = process.env.LIVE_RELOAD === 'true';

	const HASH_FILE   = PRODUCTION ? '[hash:8].[ext]' : '[name]-[hash:8].[ext]';
	const HASH_BUNDLE = PRODUCTION ? '[name]-[chunkhash:8]' : '[name]-dev';

	const ENTRY_POINTS = {
		'common'                               : Path.join(__dirname, 'src', 'app.entry.js'),
		'developer/dashboard/projects'         : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Projects.js'),
		'developer/dashboard/customer-ideas'   : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'CustomerIdeas.js'),
		'developer/dashboard/cloudcoins'       : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Cloudcoins.js'),
		'developer/dashboard/messages'         : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Messages.js'),
		'developer/dashboard/campaign-overview': Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'CampaignOverview.js'),
		'developer/dashboard/campaign-create'  : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'CampaignCreate.js'),
		'developer/dashboard/team'             : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Team.js'),
		'developer/dashboard/personas'         : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Personas.js'),
		'developer/dashboard/rewards'          : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Rewards.js'),
		'developer/dashboard/documents'        : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Documents.js'),
		'developer/dashboard/notifications'    : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Notifications.js'),
		'developer/dashboard/activities'       : Path.join(__dirname, 'src', 'js', 'developer', 'dashboard', 'Activities.js'),
		'user/dashboard/projects'              : Path.join(__dirname, 'src', 'js', 'user', 'dashboard', 'Projects.js'),
		'public/project'                       : Path.join(__dirname, 'src', 'js', 'public', 'Project.js'),
		'shared/loaders'                       : Path.join(__dirname, 'src', 'js', 'shared', 'Loaders.js')
	};

	function getBuildDate() {
		const date = new Date();

		return [date.getDate(), (date.getMonth() + 1), date.getFullYear()].join('-');
	}

	function getPlugins() {
		const result = [
			new Webpack.ProvidePlugin({
				'$'            : 'jquery',
				'jQuery'       : 'jquery',
				'window.jQuery': 'jquery',
				'window.Tether': 'tether',
				'cookieconsent': 'cookieconsent'
			}),

			new Webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': `"${process.env.NODE_ENV}"`
				},
				'PACKAGE': {
					'NAME'         : `"${packageInformation.name}"`,
					'DESCRIPTION'  : `"${packageInformation.description}"`,
					'VERSION'      : `"${packageInformation.version}"`,
					'AUTHOR'       : `"${packageInformation.author}"`,
					'CREATION_DATE': `"${new Date().getFullYear()}"`,
					'BUILD_DATE'   : `"${getBuildDate()}"`
				}
			}),

			new ExtractTextPlugin({
				filename : Path.join('css', `${HASH_BUNDLE}.css`),
				allChunks: true
			}),

			new Webpack.optimize.CommonsChunkPlugin({
				name     : 'common',
				minChunks: 2,
				filename : Path.join('js', `${HASH_BUNDLE}.js`)
			}),

			new PathRewriterPlugin({
				emitStats: false
			}),

			new WebpackShellPlugin({
				onBuildEnd  : ['npm run onbuild']
			})
		];

		if (LIVE_RELOAD) {
			result.push(
				new BrowserSyncPlugin(
					{
						host : 'localhost',
						port : 3000,
						proxy: 'http://localhost:8080/'
					},
					{
						reload: true
					}
				)
			);
		}

		return result;
	}

	function makeConfig() {
		return {
			context: Path.join(__dirname, 'src'),
			entry  : ENTRY_POINTS,
			output : {
				path    : 'dist',
				filename: Path.join('js', `${HASH_BUNDLE}.js`)
			},
			module: {
				rules: [
					{
						test   : /\.jsx?$/,
						exclude: /(node_modules)|(vendor)/,
						loader : 'babel',
						query  : {
							presets: ['es2015']
						}
					},
					{
						test  : /\.(php|html)$/,
						loader: PathRewriterPlugin.rewriteAndEmit({
							name: '[path][name].[ext]'
						})
					},
					{
						test  : /\.scss$/,
						loader: ExtractTextPlugin.extract({
							fallbackLoader: 'style',
							publicPath    : '../',
							loader        : [
								{
									loader: 'css',
									query : {
										importLoaders: 1
									}
								},
								{
									loader: 'postcss',
									query : {
										plugins() {
											return [
												new AutoPrefixer({
													browsers: ['last 2 versions']
												})
											];
										}
									}
								},
								'sass'
							]
						})
					},
					{
						test   : /\.(jpe?g|png|gif|svg)$/i,
						include: [
							Path.join(__dirname, 'src', 'img')
						],
						use: [
							{
								loader: 'file',
								query : {
									name: Path.join('img', HASH_FILE)
								}
							},
							{
								loader: 'image-webpack',
								query : {
									bypassOnDebug    : true,
									optimizationLevel: 7,
									interlaced       : false
								}
							}
						]
					}, {
						test  : /\.(woff2?)$/,
						loader: 'url',
						query : {
							limit   : 10000,
							mimetype: 'application/font-woff',
							name    : Path.join('fonts', HASH_FILE)
						}
					}, {
						test   : /\.(ttf|eot|svg)$/,
						exclude: [
							Path.join(__dirname, 'src', 'img')
						],
						loader: 'file',
						query : {
							name: Path.join('fonts', HASH_FILE)
						}
					}
				]
			},
			resolve: {
				modules: [
					Path.join(__dirname, 'src', 'js'),
					Path.join(__dirname, 'vendor', 'js'),
					Path.join(__dirname, 'node_modules')
				],
				extensions: ['.js', '.scss'],
				alias     : {}
			},

			plugins: getPlugins()

		};
	}

	return makeConfig();
})();
