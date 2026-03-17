cd "$(pwd)" && { [ -d ".git" ] && rm -rf .git; } && git init && echo '# Dependencies
**/node_modules/
**/.pnp/
**/.pnp.js
**/yarn.lock
**/package-lock.json

# Expo
**/.expo/
**/.expo-shared/
**/.expo-state/
**/expo-env.d.ts
**/web-build/

# Native builds - keep folders but exclude build artifacts
**/android/app/build/
**/android/app/.cxx/
**/android/.gradle/
**/android/.idea/
**/android/captures/
**/android/local.properties
**/ios/Pods/
**/ios/build/
**/ios/*.xcworkspace/xcuserdata/
**/ios/*.xcodeproj/xcuserdata/
**/ios/DerivedData/

# Binary files
**/*.apk
**/*.aab
**/*.ipa
**/*.dSYM
**/*.dSYM.zip
**/*.hmap
**/*.keystore
**/*.jks

# Cache files
**/.DS_Store
**/npm-debug.log*
**/yarn-debug.log*
**/yarn-error.log*
**/.vscode/
**/.idea/
**/*.log
**/*.tmp
**/*.temp
**/.temp
**/.cache

# Runtime
**/build/
**/dist/
**/out/' > .gitignore && git add . && git commit -m "Initial commit: All Expo projects" && git remote add origin https://github.com/Rohit-aware/expo-apps.git && git branch -M main && git push -u origin main --force