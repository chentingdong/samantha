echo "Building rsuite themes..."
echo "building rsuite-bell?.less..." \
& lessc --js ./src/assets/rsuite/rsuite-bell?.less dist/rsuite/theme-bell?.min.css --clean-css="--s1 --advanced --compatibility=ie8" \
& echo "building rsuite-bell?.less..." \
& lessc --js ./src/assets/rsuite/rsuite-dark.less dist/rsuite/theme-dark.min.css --clean-css="--s1 --advanced --compatibility=ie8" \
& echo "building rsuite-bell?.less..." \
& lessc --js ./src/assets/rsuite/rsuite-light.less dist/rsuite/theme-light.min.css --clean-css="--s1 --advanced --compatibility=ie8";