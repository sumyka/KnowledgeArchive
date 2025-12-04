import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,

	// React Hooks（Flat Config 対応）
	reactHooksPlugin.configs.flat.recommended,

	// Next.js 用ルール
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			'@next/next': nextPlugin,
			react: reactPlugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			// '@next/next/no-duplicate-scoped-css': 'warn', <- エラーが発生するので一時的に無効化
			'@next/next/no-html-link-for-pages': [
				'error',
				'src/client/src/app',
			],
			'@next/next/no-img-element': 'warn',

			// React
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/prop-types': 'off',
			'react/self-closing-comp': 'error',
			'react/jsx-filename-extension': [
				'error',
				{ extensions: ['.jsx', '.tsx'] },
			],
		},
	},

	// グローバル変数
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},

	// Prettier
	prettierConfig
);
