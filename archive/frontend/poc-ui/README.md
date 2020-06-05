# POC UI with Serverless Website Component

&nbsp;

### 1. Install

Install the [Serverless Framework](https://www.github.com/serverless/serverless):

```console
$ npm i -g serverless
```

Add the access keys of an AWS IAM Role with `AdministratorAccess` in a `.env` file, using this format:

```bash
AWS_ACCESS_KEY_ID=1234
AWS_SECRET_ACCESS_KEY=1234
```

Or, you can set these as environment variables manually before deploying.

Install the NPM dependencies:

```console
$ yarn install
```

Run the website locally with Parcel, using:

```console
$ yarn run start
```

Please note that while the Website Component sets up almost everything for you with a single command, if you want to set up a custom domain, you MUST purchase it in your AWS account manually via Route 53. We have not yet automated domain registration. After registering it, you may have to wait a few minutes for registration to complete before you can use it.

### 2. Deploy

Deploy via the `serverless` command:

```console
$ serverless
```

Use the `--debug` flag if you'd like to learn what's happening behind the scenes:

```console
$ serverless --debug
```


### 4. UI debugging env with VScode
* Prepare
In vscode, install Chrome Debugger Extension
When I need both frontend and backend debugging, I open two vscode window and run one debug process in each. There are two launch.json files.
* Run
In terminal run yarn start
Run the frontend debugger with name "UI".
Note the debugger is attached after yarn start. Run as normal, debug only when you need.
* Breakpoints
Set breakpoints in vscode javascript, you can close the browser inspector. This gives a consistent experience between UI and backend development.

