module.exports = function (configValue /* (key: string) => string */) {

	const makeDynamicConfig = elem => {
		if (Array.isArray(elem)) {
			return elem.map((e) => makeDynamicConfig(e));
		} else if (typeof elem === "object" && elem !== null) {
			const pairs = Object.entries(elem);

			return pairs.reduce((arr, [key, value]) => {
				arr[key] = makeDynamicConfig(value);
				return arr;
			}, {});
		} else if (typeof elem === "function") {
			return elem();
		} else {
			return elem;
		}
	};

	const dynamicConfigValue = e => () => {
		return configValue(e);
	};

	return {
		dynamicConfigValue,
		makeDynamicConfig,
	};
};

