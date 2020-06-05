<!-- README.md -->

# React Webpack Typescript Starter

> Bellhop UI, POC for 2020 Q2.

## Techstack

- **[React](https://facebook.github.io/react/)** (16.x)
- **[Webpack](https://webpack.js.org/)** (4.x)
- **[Typescript](https://www.typescriptlang.org/)** (3.x)
- **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** using [React Hot Loader](https://github.com/gaearon/react-hot-loader) (4.x)
- [Babel](http://babeljs.io/) (7.x)
- [SASS](http://sass-lang.com/)
- [Jest](https://facebook.github.io/jest/) - Testing framework for React applications
- Production build script
- Image loading/minification using [Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader)
- Typescript compiling using [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader) (5.x)
- Code quality (linting) for Typescript.
- Documentation Storybook with chromatic.com
- Testing implemented with Jest, Storybook

## Installation

1. Clone/download repo
2. `yarn install` (or `npm install` for npm)

## Usage

**Development**

`yarn run start-dev`

- Build app continuously (HMR enabled)
- App serves @ https://localhost:2003

**Production**

`yarn run start-prod`

- Build app once (HMR disabled) to `/dist/`
- App serves @ https://localhost:2003

---

**All commands**

| Command               | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `yarn run start-dev`  | Build app continuously (HMR enabled) and serve @ `http://localhost:2003`      |
| `yarn run start-prod` | Build app once (HMR disabled) to `/dist/` and serve @ `http://localhost:2003` |
| `yarn run build`      | Build app to `/dist/`                                                         |
| `yarn run test`       | Run tests                                                                     |
| `yarn run lint`       | Run Typescript linter                                                         |
| `yarn run lint --fix` | Run Typescript linter and fix issues                                          |
| `yarn run start`      | (alias of `yarn run start-dev`)                                               |

|

## storybook

- start storybook with webpack hot reload while writing stories

  `yarn storybook --debug-webpack`

- browser url to https://localhost:2040

- update with new build on chromatic.com

  get the `<PROJECT TOKEN>` in bellhop chromatic.com project, then

  `export PATH=./node_modules/.bin:${PATH}`

  `chromatic --project-token=<PROJECT TOKEN>`

- shared (internal) storybooks:

https://www.chromatic.com/builds?appId=5eb8b70df1ad3600221e0e27

## Testing

### Unit testing

### CI/CD
