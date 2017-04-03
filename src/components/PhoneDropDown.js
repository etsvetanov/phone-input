import React, { Component } from 'react';
import DialCodeItem from './DialCodeItem';

class PhoneDropDown extends Component {
    constructor() {
        super();

        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(country)
    {
        const {name, dialCode, isoCode} = country;

        if (!dialCode) return;
        return <DialCodeItem
            key={isoCode}
            isoCode={isoCode}
            countryName={name}
            dialCode={dialCode}
            onClick={this.props.onFlagItemClick}
        />
    }

    handleSearchInputClick(event) {
        event.stopPropagation();
    }

    componentDidMount() {
        console.log('PhoneDropDown:', 'focusing searchInput...');
        this.searchInput.focus();
    }

    render() {
        return (
            <div className="phone-dropdown">
                <div className="search-input-container">
                    <input
                        className="search-input"
                        onClick={this.handleSearchInputClick}
                        ref={node => this.searchInput = node}
                        value={this.props.searchValue}
                        onChange={this.props.handleSearchInputChange}
                        onBlur={this.props.onDropDownBlur}
                    />
                </div>
                {this.props.countries.map(this.renderItem)}
            </div>
        )
    }
}


export default PhoneDropDown
