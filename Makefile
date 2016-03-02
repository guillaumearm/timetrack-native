####################################################
#### react-native-android-boilerplate Helper #######
####################################################

CP=cp
NODE=node
GRADLE=cd android && ./gradlew
################################################################################

### RULES ###
help:
	@echo "-----------------------------------------------------"
	@echo "------ react-native-android-boilerplate Helper ------"
	@echo "-----------------------------------------------------"
	@echo "User Environments variables :"
	@echo "\t KEY_ALIAS (used by gen-apk rule): $(KEY_ALIAS)"
	@echo "\t DEBUG_IP (used by configure-debug-android rule): $(DEBUG_IP)"
	@echo
	@echo "Rules :"
	@echo " --------- BASIC -----------"
	@echo "\t help \t\t\t\t This help page."
	@echo "\t clean-apk \t\t\t Apply a gradle clean for delete builded files."
	@echo "\t clean-cache \t\t\t Remove react stuffs in cache."
	@echo "\t clean \t\t\t\t Apply clean-apk and clean-cache rules."
	@echo "\t clean-all \t\t\t Apply clean-apk, clean-cache and uninstall-all-apk rules."
	@echo
	@echo " --------- GRADLE PROJECT -----------"
	@echo "\t native-init \t\t\t init boilerplate (package.json name field is used for project name)."
	@echo "\t native-rename \t\t\t rename boilerplate (package.json name fiels id used for project name)."
	@echo
	@echo " --------- ANDROID KEYS -----------"
	@echo "\t gen-apk \t\t\t generate apk release keystore. (using KEY_ALIAS environment variable)"
	@echo "\t show-debug-key \t\t show key informations about your debug keystore."
	@echo "\t show-release-key \t\t show key informations about your release keystore."
	@echo
	@echo " --------- DEVELOPMENT -----------"
	@echo "\t dev \t\t\t\t Start the react-native dev packager server."
	@echo "\t run-android \t\t\t Install and launch app on your device (debug mode)."
	@echo
	@echo " --------- DEBUG -----------"
	@echo "\t build-debug-apk \t\t build ./app.apk file."
	@echo "\t rebuild-debug-apk \t\t rebuild ./app.apk file."
	@echo "\t install-debug-apk \t\t install debug apk on a connected device."
	@echo "\t uninstall-debug-apk \t\t uninstall debug apk."
	@echo
	@echo " --------- RELEASE -----------"
	@echo "\t build-release-apk \t\t build ./app.apk"
	@echo "\t rebuild-release-apk \t\t rebuild ./app.apk file."
	@echo "\t install-release-apk \t\t install release apk on a connected device."
	@echo "\t uninstall-release-apk \t\t uninstall release apk."
	@echo
	@echo " --------- MISC -----------"
	@echo "\t uninstall-all-apk \t\t uninstall all apk (debug and release)."
	@echo "\t configure-debug-android \t send some key events to your device for automatically configure debug app with your local ip address (using DEBUG_IP environment variable)."
	@echo "\t run-android-then-configure \t run-android rule -> wait 10 seconds -> configure-debug-android rule"
	@echo

clean: clean-cache clean-apk

clean-apk:
	@echo --- Delete app.apk
	@$(RM) app.apk
	@echo --- Apply Gradle clean
	@$(GRADLE) clean
	@echo --- Remove build directories
	@$(RM) -r android/build && $(RM) -r android/app/build
	@echo --- clean-apk done.

clean-cache:
	@[ -d "$(TMPDIR)" ] || \
			(echo --- clean-cache ERROR: TMPDIR environment variable is not defined && false)
	@$(RM) -f $(TMPDIR)/react-*
	@echo --- clean-cache done.

clean-all: clean-cache clean-apk uninstall-all-apk
	@echo --- clean-all done.

native-init:
	@react-native upgrade && react-native android
	@echo --- native-init done.

native-rename:
	@$(RM) -r ios android ; mv index.android.js .index.android.js.tmp 2> /dev/null || true
	react-native upgrade && react-native android
	mv .index.android.js.tmp index.android.js 2> /dev/null || true
	@echo --- native-rename done.

gen-apk:
	@echo --- gen-apk done.

show-debug-key:
	@echo --- Default password is : android && keytool -list -v -keystore ~/.android/debug.keystore

show-release-key:
	@keytool -list -v -keystore params/release.keystore

dev: clean-cache
	@$(NODE) $(NODEFLAGS) ./node_modules/react-native/local-cli/cli.js start

run-android:
	@react-native run-android

build-debug-apk:
	@$(GRADLE) assembleDebug
	@$(CP) android/app/build/outputs/apk/app-debug.apk app.apk
	@echo --- build-debug-apk done.

rebuild-debug-apk: clean-apk build-debug-apk

install-debug-apk: uninstall-all-apk
	@$(GRADLE) installDebug
	@echo --- install-debug-apk done.

uninstall-debug-apk:
	@$(GRADLE) uninstallDebug
	@echo --- uninstall-debug-apk done.


build-release-apk:
	@$(GRADLE) assembleRelease
	@$(CP) android/app/build/outputs/apk/app-release.apk app.apk
	@echo --- build-release-apk done.

rebuild-release-apk: clean-apk build-release-apk

install-release-apk: uninstall-all-apk
	@$(GRADLE) installRelease
	@echo --- install-release-apk done.

uninstall-release-apk:
	@$(GRADLE) uninstallRelease
	@echo --- uninstall-release-apk done.

uninstall-all-apk:
	@$(GRADLE) uninstallAll
	@echo --- uninstall-all-apk done.

configure-debug-android:
	@echo --- Sending sequences keyevent sequences to the device.
	@adb shell input keyevent 82 20 20 20 20 20 20 20 23
	@adb shell input keyevent 20 20 20 23
	@adb shell input keyevent 123 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67
	@adb shell input text "$(DEBUG_IP)"
	@adb shell input keyevent 20 23
	@adb shell input keyevent 4
	@adb shell input keyevent 82
	@adb shell input keyevent 23 23
	@echo --- configure-debug-android done.

run-android-then-configure: run-android
	@echo --- Waiting 10 seconds...
	@sleep 10 && $(MAKE) configure-debug-android

PHONY: help clean-apk clean clean-cache clean-all native-init native-rename gen-apk show-debug-key dev run-android build-debug-apk rebuild-debug-apk install-debug-apk uninstall-debug-apk build-release-apk rebuild-release-apk install-release-apk uninstall-release-apk uninstall-all-apk configure-debug-android run-android-then-configure
