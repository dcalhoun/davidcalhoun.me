const posts = require('./.posts/summary.json')

function addPostEntry (post) {
  this[`/writing/${post.base.replace(/\.json/g, '')}`] = {
    page: '/post',
    query: {
      slug: post.base.replace(/\.json/g, '')
    }
  }
}

module.exports = {
  exportPathMap: () => {
    const entries = {}

    Object.keys(posts.fileMap)
      .map(file => posts.fileMap[file])
      .forEach(addPostEntry.bind(entries))

    return Object.assign(
      {
        '/': { page: '/' },
        '/writing': { page: '/writing' }
      },
      entries
    )
  },
  webpack: config => {
    config.externals = config.externals || {}
    config.externals['styletron-server'] = 'styletron-server'

    config.module.rules.push({
      test: /\.css/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]'
      }
    }, {
      test: /\.css$/,
      loader: 'babel-loader!raw-loader'
    })
    return config
  }
}