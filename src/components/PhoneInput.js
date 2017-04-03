import React, {Component} from 'react';
import classNames from 'classnames';
import { parse, format, asYouType } from 'libphonenumber-js';

import PhoneDropDown from './PhoneDropDown';
import {countryData, byIsoCode} from '../data'

class PhoneInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.cleanPhoneNumber(this.props.inputValue),
            searchInputValue: '',
            showDropDown: false,
            selectedCountry: this.props.defaultCountry,
            countryFilter: null,
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropDownButtonClick = this.handleDropDownButtonClick.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleFlagItemClick = this.handleFlagItemClick.bind(this);
        this.handleDropDownBlur = this.handleDropDownBlur.bind(this);
    }

    handleFlagItemClick(event) {
        const isoCode = event.currentTarget.dataset.iso;
        const inputValue = this.cleanPhoneNumber(byIsoCode.get(isoCode).dialCode);

        this.setState({
            selectedCountry: isoCode,
            inputValue,
        });
    }

    handleSearchInputChange(event) {
        this.setState({searchInputValue: event.target.value});
    }

    cleanPhoneNumber(phoneString) {
        return '+' + phoneString.replace(/\D/g, '');
    }

    handleInputChange(event) {
        const inputValue = event.target.value;
        const cleanNumber = this.cleanPhoneNumber(inputValue);

        const parser = new asYouType();
        parser.input(cleanNumber);

        const { country } = parser;



        this.setState({
            inputValue: cleanNumber,
            selectedCountry: country ? country.toLowerCase() : undefined,
        });
    }

    handleDropDownButtonClick() {
        const newState = this.toggleDropDown(this.state);

        this.setState(newState);
    }

    toggleDropDown(state) {
        if (state.showDropDown) {
            return {
                showDropDown: false,
                searchInputValue: '',
            }
        }

        return {
            showDropDown: true,
        }
    }


    handleDropDownBlur() {
        setTimeout(() => {
            if (this.state.showDropDown) {
                const newState = this.toggleDropDown(this.state);

                this.setState(newState);
            }
        }, 100);
    }

    getFilterRegex(searchTerm) {
        const pattern = searchTerm.replace(/ /gi, '.*');

        return new RegExp(pattern, 'i');
    }

    countriesFilter(country) {
        return this.test(country.name);
    }

    getFilteredCountries(searchTerm, countries) {
        console.log('getFilteredCountries with searchTerm:', searchTerm);
        if (!searchTerm.trim()) return countries;

        const regEx = this.getFilterRegex(searchTerm);
        console.log('getFilteredCountries with regEx:', regEx);

        return countries.filter(this.countriesFilter, regEx)
    }

    render() {
        window.parse = parse;
        window.format = format;
        window.asYouType = asYouType;

        const containerClasses = classNames({
            "phone-input-container": true,
            "clickable": true,
            "input-group": true,
            "is-open": this.state.showDropDown,
        });

        const searchTerm = this.state.searchInputValue;
        const filteredCountries = searchTerm
            ? this.getFilteredCountries(searchTerm, this.props.countries)
            : this.props.countries;

        const dropDownButtonClasses = classNames({
            'phone-dropdown-button': true,
            'group-addon': true,
        });

        const selectedFlagClasses = classNames({
            [`flag-icon-${this.state.selectedCountry}`]: true,
            'flag-icon': true,
        });

        const showDropDown = this.state.showDropDown;

        return (
            <div className={containerClasses}>
                <div
                    className={dropDownButtonClasses}
                    onClick={this.handleDropDownButtonClick}
                >
                    <span className={selectedFlagClasses}/>
                    <i className="material-icons"> {showDropDown ? "keyboard_arrow_up" : "keyboard_arrow_down"}</i>

                    {showDropDown ?
                        <PhoneDropDown
                            countries={filteredCountries}
                            searchValue={this.state.searchInputValue}
                            handleSearchInputChange={this.handleSearchInputChange}
                            onFlagItemClick={this.handleFlagItemClick}
                            onDropDownBlur={this.handleDropDownBlur}
                        /> : null
                    }
                </div>


                <input
                    className="phone-input form-control"
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <image src="flags/4x3/us.svg"/>
            </div>
        )
    }
}

PhoneInput.propTypes = {
    countries:          React.PropTypes.array,
    selectedCountry:    React.PropTypes.string,
    inputValue:         React.PropTypes.string,
};

PhoneInput.defaultProps = {
    countries: countryData,
    defaultCountry: 'us',
    inputValue: '+'
};

export default PhoneInput
