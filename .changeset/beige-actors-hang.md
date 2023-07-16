---
"@soluble/dsn-parser": patch
---

Give precedence to esm

Ensure the "module" condition comes before the "require" condition. Due to the way conditions are matched top-to-bottom,
the "module" condition (used in bundler contexts only) must come before a "require" condition,
so it has the opportunity to take precedence.

See [publint](https://publint.dev/rules#exports_module_should_precede_require)
