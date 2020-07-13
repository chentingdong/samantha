echo "Building rsuite themes..."
echo "building rsuite-bell.less..." \
& lessc --js ./src/assets/rsuite/rsuite-bell.less ./src/assets/rsuite/theme-bell.min.css --clean-css="--s1 --advanced --compatibility=ie8" \
& echo "building rsuite-bell.less..." \
& lessc --js ./src/assets/rsuite/rsuite-dark.less ./src/assets/rsuite/theme-dark.min.css --clean-css="--s1 --advanced --compatibility=ie8" \
& echo "building rsuite-bell.less..." \
& lessc --js ./src/assets/rsuite/rsuite-light.less ./src/assets/rsuite/theme-light.min.css --clean-css="--s1 --advanced --compatibility=ie8";