---
'@backstage/cli': patch
---

To accommodate the move to Jest 27, the plugin template has been updated to use `@testing-library/react` version `^12.1.2` by default. To update existing plugins, switch out the version query in your plugins accordingly.
