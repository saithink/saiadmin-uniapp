/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [
      require('tailwindcss-rem2px-preset').createPreset({
        // 32 就是 1rem = 32rpx
        fontSize: 32,
        // 转化的单位,可以转换变成 px / rpx
        unit: 'rpx'
      })
  ],
}

