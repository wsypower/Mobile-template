{
  mode: 'development',
  context: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template',
  devtool: 'cheap-module-eval-source-map',
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/dist',
    filename: '[name].js',
    publicPath: '/',
    globalObject: '(typeof self !== \'undefined\' ? self : this)'
  },
  resolve: {
    symlinks: true,
    alias: {
      '@': '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src',
      vue$: 'vue/dist/vue.runtime.esm.js',
      types: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/types',
      '@style': '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/style',
      '@img': '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/assets/image',
      '@component': '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/components',
      '@views': '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/views',
      '@api': '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/api',
      '@mock': '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/mock'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm',
      '.ts',
      '.tsx'
    ],
    modules: [
      'node_modules',
      '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules',
      '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/_@vue_cli-plugin-typescript@3.12.1@@vue/cli-plugin-typescript/node_modules',
      '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/_@vue_cli-plugin-eslint@3.12.1@@vue/cli-plugin-eslint/node_modules',
      '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/_@vue_cli-plugin-babel@3.12.1@@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules',
      '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/.cache/vue-loader',
              cacheIdentifier: 'cfade34e'
            }
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
              cacheDirectory: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/.cache/vue-loader',
              cacheIdentifier: 'cfade34e'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        exclude: [
          '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/assets/svg'
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              {
                loader: 'raw-loader'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  prependData: '@import \'~@/style/core/core.scss\';'
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  prependData: '@import \'~@/style/core/core.scss\';'
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  prependData: '@import \'~@/style/core/core.scss\';'
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  prependData: '@import \'~@/style/core/core.scss\';'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  prependData: '@import \'~@/style/core/core.scss\'',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  prependData: '@import \'~@/style/core/core.scss\'',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  prependData: '@import \'~@/style/core/core.scss\'',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  prependData: '@import \'~@/style/core/core.scss\'',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack',
                  use: [
                    function () { /* omitted long function */ }
                  ],
                  'import': [
                    '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/assets/theme.custom'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack',
                  use: [
                    function () { /* omitted long function */ }
                  ],
                  'import': [
                    '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/assets/theme.custom'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack',
                  use: [
                    function () { /* omitted long function */ }
                  ],
                  'import': [
                    '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/assets/theme.custom'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack',
                  use: [
                    function () { /* omitted long function */ }
                  ],
                  'import': [
                    '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/assets/theme.custom'
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/.cache/babel-loader',
              cacheIdentifier: 'b0eb74c6'
            }
          },
          {
            loader: 'babel-loader'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/lib'
        ],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue',
                '.ts',
                '.tsx'
              ],
              cache: true,
              cacheIdentifier: '64710c0d',
              emitWarning: true,
              emitError: false,
              eslintPath: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/_eslint@5.16.0@eslint',
              formatter: function () { /* omitted long function */ }
            }
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/.cache/ts-loader',
              cacheIdentifier: '7dc9ece0'
            }
          },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/node_modules/.cache/ts-loader',
              cacheIdentifier: '7dc9ece0'
            }
          },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      },
      /* config.module.rule('icons') */
      {
        test: /\.svg$/,
        include: [
          '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/src/assets/svg'
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: '[name]'
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [
            /\.vue$/
          ],
          transpileOnly: true,
          getCustomTransformers: function () { /* omitted long function */ }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          VUE_APP_TITLE: '"天翼城管通"',
          VUE_APP_API: '"/dev/api/"',
          NODE_ENV: '"development"',
          VUE_APP_REPO: '"https://github.com/wsypower/control-admin"',
          VUE_APP_VERSION: '"0.1.0"',
          VUE_APP_BUILD_TIME: '"2019-12-11 20:06:00"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('hmr') */
    new HotModuleReplacementPlugin(),
    /* config.plugin('progress') */
    new ProgressPlugin(),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        templateParameters: function () { /* omitted long function */ },
        template: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/public/index.html'
      }
    ),
    /* config.plugin('addAssetHtml') */
    new AddAssetHtmlPlugin(
      [
        {
          filepath: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/dll/vendor.dll.js',
          outputPath: 'dll',
          publicPath: '/dll'
        }
      ]
    ),
    /* config.plugin('copy') */
    new CopyWebpackPlugin(
      [
        {
          from: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/public',
          to: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template/dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        vue: true,
        tslint: true,
        formatter: 'codeframe',
        checkSyntacticErrors: false
      }
    ),
    /* config.plugin('vendorDll') */
    new DllReferencePlugin(
      {
        context: '/Users/weiyafei/Documents/中国电信/wsy-cli/Mobile-template',
        manifest: {
          name: 'dll_vendor',
          content: {
            './node_modules/_axios@0.19.0@axios/lib/utils.js': {
              id: 0,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_webpack@4.41.2@webpack/buildin/global.js': {
              id: 1,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_process@0.11.10@process/browser.js': {
              id: 2,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/bind.js': {
              id: 3,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/buildURL.js': {
              id: 4,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/cancel/isCancel.js': {
              id: 5,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/defaults.js': {
              id: 6,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/adapters/xhr.js': {
              id: 7,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/core/createError.js': {
              id: 8,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/core/mergeConfig.js': {
              id: 9,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/cancel/Cancel.js': {
              id: 10,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_vue@2.6.10@vue/dist/vue.runtime.esm.js': {
              id: 12,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/_timers-browserify@2.0.11@timers-browserify/main.js': {
              id: 13,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js': {
              id: 14,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_vuex@3.1.2@vuex/dist/vuex.esm.js': {
              id: 15,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default',
                  'Store',
                  'install',
                  'mapState',
                  'mapMutations',
                  'mapGetters',
                  'mapActions',
                  'createNamespacedHelpers'
                ]
              }
            },
            './node_modules/_vue-router@3.1.3@vue-router/dist/vue-router.esm.js': {
              id: 16,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/_axios@0.19.0@axios/index.js': {
              id: 17,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/axios.js': {
              id: 18,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_is-buffer@2.0.4@is-buffer/index.js': {
              id: 19,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/core/Axios.js': {
              id: 20,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/core/InterceptorManager.js': {
              id: 21,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/core/dispatchRequest.js': {
              id: 22,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/core/transformData.js': {
              id: 23,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/normalizeHeaderName.js': {
              id: 24,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/core/settle.js': {
              id: 25,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/core/enhanceError.js': {
              id: 26,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/parseHeaders.js': {
              id: 27,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/isURLSameOrigin.js': {
              id: 28,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/cookies.js': {
              id: 29,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/isAbsoluteURL.js': {
              id: 30,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/combineURLs.js': {
              id: 31,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/cancel/CancelToken.js': {
              id: 32,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_axios@0.19.0@axios/lib/helpers/spread.js': {
              id: 33,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_dayjs@1.8.17@dayjs/dayjs.min.js': {
              id: 34,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_fastclick@1.0.6@fastclick/lib/fastclick.js': {
              id: 35,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/_js-cookie@2.2.1@js-cookie/src/js.cookie.js': {
              id: 36,
              buildMeta: {
                providedExports: true
              }
            }
          }
        }
      }
    )
  ],
  entry: {
    app: [
      './src/main.ts'
    ]
  }
}
