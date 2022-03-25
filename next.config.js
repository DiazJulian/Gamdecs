module.exports = {
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dhehnqygp'
  },
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
