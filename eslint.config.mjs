import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { config } from "typescript-eslint";

export default config(
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    ignores: ["node_modules", "build"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
);
