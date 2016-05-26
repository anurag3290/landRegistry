ServiceConfiguration.configurations.upsert(
	{ service: "facebook" },
	{
		$set: {
			appId: "1660229450887389",
			loginStyle: "popup",
			secret: "9b97ccc9fc215e29cfa44875e0898889"
		}
	}
);

ServiceConfiguration.configurations.upsert(
	{ service: "google" },
	{
		$set: {
			clientId: "151459059835-o637ppdpo5sg9b782i4n7t4gcuv3lul5.apps.googleusercontent.com",
			loginStyle: "popup",
			secret: "ZTKZpn2ejdq59n3gw1XsoR7n"
		}
	}
);