module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [ 
            'module-resolver',
            {
                extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
                alias: {
                    '@src': './src',
                    '@screens': './src/screens',
                    '@components': './src/components',
                    '@utilities': './src/utilities',
                    '@actions': './src/actions',
                    '@hooks': './src/hooks'
                } 
            },
        ],
        'react-native-reanimated/plugin',
    ]
};