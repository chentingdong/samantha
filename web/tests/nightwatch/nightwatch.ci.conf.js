// If you run nightwatch from command line, run this command to set env variables first.
// eval $(cat ~/bellhop/samantha/web/tests/nightwatch/.env | sed 's/^/export /')
// const selenium_host = "35.175.142.214"
const selenium_host = "35.175.142.214"
const selenium_port = 2077

module.exports = {
  src_folders: ["tests/nightwatch/tests"],
  tests_output: "tests/nightwatch/tests_output",
  output_folders: "tests/nightwatch/reports",
  custom_commands_path: "tests/nightwatch/bin",
  live_output: true,
  test_workers: {
    enabled: true,
    workers: "auto",
  },
  selenium: {
    start_process: false,
    server_path: "",
    log_path: "",
    host: selenium_host,
    port: selenium_port,
  },
  test_settings: {
    default: {
      launch_url: "http://localhost:2000",
      selenium_port: selenium_port,
      selenium_host: selenium_host,
      silent: true,
      screenshots: {
        enabled: true,
        path: "",
      },
      skip_testcases_on_fail: false,
      webdriver: {
        start_process: false,
      },
    },
    "selenium.chrome": {
      extends: "selenium",
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        chromeOptions: {
          w3c: false,
          args: ["headless"],
        },
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
