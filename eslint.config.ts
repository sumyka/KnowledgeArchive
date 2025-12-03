import tseslint from 'typescript-eslint';
import { fixupConfigRules } from '@eslint/compat';
import eslint from '@eslint/js';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,

	// Next.js 用ルール
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			// '@next/next/no-duplicate-scoped-css': 'warn', <- 誤検知が多いため無効化
			'@next/next/no-html-link-for-pages': [
				'error',
				'src/client/src/app',
			],
			'@next/next/no-img-element': 'warn',
		},
	},

	// React 用ルール
	fixupConfigRules({
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin as any,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/prop-types': 'off',
			'react/self-closing-comp': 'error',

			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			'react/jsx-filename-extension': [
				'error',
				{ extensions: ['.jsx', '.tsx'] },
			],
		},
	}),

	// グローバル変数設定
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},

	prettierConfig
);
