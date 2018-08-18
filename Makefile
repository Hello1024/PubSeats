android:
	cd guerilla-gifts && ionic cordova build android --prod --release --minifyjs --minifycss --aot --optimizejs -- --browserify -- --keystore=erraticpacket.passwordisandroid.keystore --alias=alias_name --storePassword=android

browser:
	cd guerilla-gifts && ionic cordova build browser --prod --release --minifyjs --minifycss --aot --optimizejs -- --browserify


server: browser
	gcloud app deploy app.yaml --project=erraticpacket


all: android server