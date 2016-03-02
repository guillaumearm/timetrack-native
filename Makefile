####################################################
#### react-native-android-boilerplate Helper #######
####################################################

################################################################################

### RULES ###
help: 
	@echo "-----------------------------------------------------"
	@echo "------ react-native-android-boilerplate Helper ------"
	@echo "-----------------------------------------------------"
	@echo "User Environments variables :"
	@echo "\t KEY_ALIAS (used by gen-apk rule)"
	@echo
	@echo "Rules :"
	@echo " --------- BASIC -----------"
	@echo "\t help \t\t\t\t This help page."
	@echo "\t clean-apk \t\t\t doc here"
	@echo "\t clean-cache \t\t\t doc here"
	@echo "\t clean-all \t\t\t doc here"
	@echo
	@echo " --------- GRADLE PROJECT -----------"
	@echo "\t native-init \t\t\t doc here"
	@echo "\t native-rename \t\t\t doc here"
	@echo
	@echo " --------- ANDROID KEYS -----------"
	@echo "\t gen-apk \t\t\t doc here"
	@echo "\t show-debug-key \t\t doc here"
	@echo "\t show-release-key \t\t doc here"
	@echo
	@echo " --------- DEVELOPMENT -----------"
	@echo "\t dev \t\t\t\t doc here"
	@echo "\t run-android \t\t\t doc here"
	@echo
	@echo " --------- DEBUG -----------"
	@echo "\t build-debug-apk \t\t doc here"
	@echo "\t rebuild-debug-apk \t\t doc here"
	@echo "\t install-debug-apk \t\t doc here"
	@echo "\t uninstall-debug-apk \t\t doc here"
	@echo
	@echo " --------- RELEASE -----------"
	@echo "\t build-release-apk \t\t doc here"
	@echo "\t rebuild-release-apk \t\t doc here"
	@echo "\t install-release-apk \t\t doc here"
	@echo "\t uninstall-release-apk \t\t doc here"
	@echo
	@echo " --------- MISC -----------"
	@echo "\t uninstall-all-apk \t\t doc here"
	@echo


.PHONY: help

