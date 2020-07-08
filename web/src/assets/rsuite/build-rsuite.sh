echo "Building rsuite themes..."
lessc --js ./src/assets/rsuite/rsuite-bell.less ./dist/rsuite/theme-bell.min.css
lessc -x --js ./src/assets/rsuite/rsuite-dark.less ./dist/rsuite/theme-dark.min.css
lessc -x --js ./src/assets/rsuite/rsuite-light.less ./dist/rsuite/theme-light.min.css