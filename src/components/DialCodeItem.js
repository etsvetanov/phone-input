import React, { Component } from 'react';
import classNames from 'classnames';

class DialCodeItem extends Component {

    render() {
        const flagClasses = classNames({
            [`flag-icon-${this.props.isoCode}`]: true,
            'flag-icon': true,
        });

        return (
            <div className="dialCodeItem" onMouseDown={this.props.onClick} data-iso={this.props.isoCode}>
                <span className={flagClasses} />
                <span> {this.props.countryName}</span>
                <span className="insignificant-text"> {`+${this.props.dialCode}`} </span>
            </div>
        )
    }
}

export default DialCodeItem
