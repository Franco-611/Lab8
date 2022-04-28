export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer:{
    static: {
        directory: 'dist',
    },
    compress: true,
    port: 9000
  },
  module:{
      rules:[{
          test: /\.jsx?$/,
          use: ['babel-loader']
      },
      {
        test: /.(png|jpg|gif|svg|mp3)$/,
        use: [{ loader: 'file-loader' }],
      },
    ]
  }

} 