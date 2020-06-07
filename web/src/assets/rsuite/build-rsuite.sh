echo "Building rsuite themes..."
lessc -x --js ./src/assets/rsuite/rsuite-dark.less ./dist/rsuite/theme-dark.min.css
lessc -x --js ./src/assets/rsuite/rsuite-light.less ./dist/rsuite/theme-light.min.css