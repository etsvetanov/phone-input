import countryCodes from './countryCodes.json';
import worldCountries from 'world-countries/countries.json';

export const countryData = worldCountries.map((country) => {
    const isoCode = country.cca2.toLowerCase();

    return {
        isoCode,
        name: country.name.common,
        dialCode: countryCodes[isoCode],
    };
}).sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);

const byIsoCode = new Map();
const byDialCode = new Map();

countryData.forEach((country) => {
    byIsoCode.set(country.isoCode, country);
    byDialCode.set(country.dialCode, country);
});

export {byIsoCode, byDialCode}


