const selenium_host = "localhost"
const selenium_port = 2077

module.exports = {
  src_folders: ["tests/nightwatch/tests"],
  tests_output: "tests/nightwatch/tests_output",
  output_folders: "tests/nightwatch/reports",
  custom_commands_path: "tests/nightwatch/bin",
  selenium: {
    start_process: true,
    server_path: "tests/nightwatch/bin/selenium-server-standalone-3.9.1.jar",
    log_path: "tests/nightwatch/logs",
    port: selenium_port,
  },
  live_output: true,
  test_workers: {
    enabled: true,
    workers: "auto",
  },
  test_settings: {
    default: {
      launch_url: "http://localhost:2000",
      silent: true,
      sync_test_names: false,
      persist_globals: true,
    },
    selenium: {
      start_process: false,
      selenium_host: selenium_host,
      selenium_port: selenium_port,
      output_timestamp: true,
      server_path: "tests/nightwatch/bin/selenium-server-standalone-3.9.1.jar",
      log_path: "tests/nightwatch/logs",
      cli_args: {
        "webdriver.gecko.driver": require("geckodriver").path,
        "webdriver.chrome.driver": require("chromedriver").path,
      },
    },
    "selenium.chrome": {
      extends: "selenium",
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        chromeOptions: {
          w3c: false,
          // args: ["headless"],
        },
      },
    },

    "selenium.firefox": {
      extends: "selenium",
      desiredCapabilities: {
        browserName: "firefox",
      },
    },

    chrome_1: {
      extends: "selenium.chrome",
      desiredCapabilities: {
        name: "chrome_1",
      },
      globals: {
        name: process.env.ONE_BELLMAN_NAME,
        username: process.env.ONE_BELLMAN_USERNAME,
        password: process.env.ONE_BELLMAN_PASSWORD,
      },
    },

    chrome_2: {
      extends: "selenium.chrome",
      desiredCapabilities: {
        name: "chrome_2",
      },
      globals: {
        name: process.env.TWO_BELLMAN_NAME,
        username: process.env.TWO_BELLMAN_USERNAME,
        password: process.env.TWO_BELLMAN_PASSWORD,
      },
    },
  },
}