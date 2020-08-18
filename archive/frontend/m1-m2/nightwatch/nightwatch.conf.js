const selenium_host = "localhost"
const selenium_port = 2077

module.exports = {
  src_folders: ["tests"],
  tests_output: "tests_output",
  output_folders: "reports",
  custom_commands_path: "bin",
  selenium: {
    start_process: true,
    server_path:
      "node_modules/selenium-server/lib/runner/selenium-server-standalone-3.141.59.jar",
    log_path: "logs",
    port: selenium_port,
  },
  live_output: true,
  test_workers: {
    enabled: true,
    workers: "auto",
  },
  test_settings: {
    default: {
      launch_url: "http://localhost:2002",
      silent: true,
      sync_test_names: false,
      persist_globals: true,
    },
    selenium: {
      start_process: false,
      selenium_host: selenium_host,
      selenium_port: selenium_port,
      output_timestamp: true,
      server_path:
        "node_modules/selenium-server/lib/runner/selenium-server-standalone-3.141.59.jar",
      log_path: "logs",
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
          args: ["headless", "window-size=1920,1080"],
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
