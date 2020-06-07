# Multi theming and theme switch with rsuite.

- use rsuite-dark.less and rsuite-light.less to import the rsuite themes.
- add customized variables in each theme.
- yarn build:rsuite will generate in dist/rsuite/rsuite-dark.min.css
- in component, example Demo.tsx, can inject the theme accordingly.

Since rsuite theming doesn't change much, and building takes time, we choose to not include it with hot reload.
If developer need to update it without restart UI, you can run following command to regenerate the rsuite files, hot loading will take it from there.

```
yarn build:rsuite
```
