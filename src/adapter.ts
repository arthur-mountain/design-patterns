/**
 * 提供一個中介的介面(interface)的轉換，使得類別可轉換至另外一個。
 * 這種模式讓【多個類別一起使用】即使是那些【不符合介面的類別】。
 * 例如:讓新的API和舊的API皆可以使用在彼此之間必須相容的狀況下。
 */

// 模擬第三方 API (第一支)
class WeatherAPI {
	city: string;

	constructor(city: string) {
		this.city = city;
	}

	getWeather() {
		return this.formattedInfo({ temp: 300 });
	}

	toCelsius(kelvin: number) {
		const converted = kelvin - 273.15;
		return converted.toFixed(2);
	}

	formattedInfo(data: { temp: number }) {
		return {
			city: this.city,
			temperature: this.toCelsius(data.temp),
		};
	}
}

// 模擬第三方 API (第二支)
class OpenWeather {
	city: string;
	constructor(location: { city: string; temperature?: number }) {
		this.city = location.city;
	}

	// 取得溫度，因為是範例用所以這裡寫死
	getCurrent() {
		// 華氏
		return { temperature: 80.33 };
	}
}

// 【以 dashboard 為主】，透過轉接介面(中介介面)，間接串接 OpenWeatherApi 的資料
class OpenWeatherAdapter {
	// 因為 Weather api 需要 city:string
	// OpenWeather api 需要 {city:string}
	city: string;
	openWeather: OpenWeather;
	constructor(city: string) {
		this.city = city;
		this.openWeather = new OpenWeather({ city });
	}

	// 統一使用 getWeather 的 getWeather，但將資料使用 openWeather 的 getCurrent
	getWeather() {
		return this.formattedInfo(this.openWeather.getCurrent());
	}

	toCelsius(farenheit) {
		const converted = ((farenheit - 32) * 5) / 9;
		return converted.toFixed(2);
	}

	/**
	 * 1. 因為 OpenWeather 沒有回傳的 city ，藉由中介介面來回傳
	 * 2. 將華氏溫度轉換為攝氏溫度
	 */
	formattedInfo(data) {
		return {
			city: this.city,
			temperature: this.toCelsius(data.temperature),
		};
	}
}

// 我們要串接別人服務的程式
class Dashboard {
	weatherSource: WeatherAPI;
	constructor(weatherSource: WeatherAPI) {
		this.weatherSource = weatherSource;
	}

	displayWeather() {
		const weatherInfo = this.weatherSource.getWeather();
		console.log(
			`現在 ${weatherInfo.city} 的氣溫是：攝氏 ${weatherInfo.temperature} 度`,
		);
	}
}

// 最一開始串接 WeatherApi 的程式
const dashboard = new Dashboard(new WeatherAPI('台北'));
/**
 * 後續要串接另一隻 OpenWeatherApi 的程式
 * 因為一開始 dashboard 是以 WeatherAPI 為前提下所寫的程式，因此藉由
 * 不修改 dashboard 為前提下，藉由 adapter 介面來【間接】串接 openWeatherApi
 */
const dashboard2 = new Dashboard(new OpenWeatherAdapter('台北'));
dashboard.displayWeather();
dashboard2.displayWeather();
