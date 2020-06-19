# Multi theming with tailwind

- tailwind.config.js - This is where we define customizations globaly.
- tailwind.css - theming variables
  As an example, app/Demo.tsx uses classname .theme-[theme] to scope the which style is used for its children component.

Since tailwind theming doesn't change often, and building takes time, we choose to not include it with hot reload.
If developer need to update it, you can either restart UI, or run following command to regenerate the css. Hot loading will take it from there.

```
yarn build:tailwind
```
