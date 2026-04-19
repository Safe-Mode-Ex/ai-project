module.exports = {
  extends: ['htmlacademy/react'],
  env: {
    es2024: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: '19.0',
    },
  },
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'check-file/filename-naming-convention': 'off',
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/components/**/': 'PASCAL_CASE',
      },
    ],
  },
};
