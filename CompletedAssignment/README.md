# Setup the app
run `npm install` or `yarn` to install all dependencies
then cd into ios folder and run `pod install`

# Check the device
- connect the device to the computer
- run `adb devices` to check if the Android is connected
- or open file .xcworkspace in ios folder and choose the target device.

# Run the app

By command: run `react-native run-android` or `react-native run-ios`
By XCode:
- run `yarn start` or `npm start` to start the packager
- open `ios/RNStarter.xcworkspace` in XCode
- run the app on the simulator or device

