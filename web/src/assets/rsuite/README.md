# Multi theming and theme switch with rsuite.

- Use rsuite-[theme].less and rsuite-light.less to import the rsuite themes.
- Add customized variables in each theme.
- `yarn build:rsuite` will generate in dist/rsuite/rsuite-[theme].min.css
- in component, example Demo.tsx, can inject the theme accordingly.

Since rsuite theming doesn't change much, and building takes time, we choose to not include it with hot reload.
If developer need to update it, you can either restart UI, or run following command to regenerate the rsuite css. Hot loading will take it from there.

```
yarn build:rsuite
```

list of variables refer to:
https://github.com/rsuite/rsuite/blob/master/src/styles/variables.less
