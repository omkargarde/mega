import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
// eslint-disable-next-line import/no-unresolved
import perfectionist from "eslint-plugin-perfectionist";
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "eslint/config";
import globals from "globals";
// eslint-disable-next-line import/no-unresolved
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["src/**/*.ts", "**/*.{ts}"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  importPlugin.flatConfigs.recommended,
  perfectionist.configs["recommended-natural"],
  eslintConfigPrettier,
]);
