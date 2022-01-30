---
'@backstage/create-app': patch
---

Updated the version of `@testing-library/react` to `^12.1.2`. This brings with it breaking changes that can be seen [here](https://github.com/testing-library/react-testing-library/releases/tag/v12.0.0).

To apply this change to an existing app, make the following change to `packages/app/package.json`:

```diff
-    "@testing-library/react": "^10.4.1",
+    "@testing-library/react": "^12.1.2",
```

We also recommend applying the same version bump to all other packages in your project.
