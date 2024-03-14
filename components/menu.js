import React from "react";
import { Menu, MenuItem } from 'react-bootstrap-typeahead';

const MenuNew = ({
    menuProps,
    results
}) => {
    const items = results.map((result, index) => {
        if (index === 0) {
            return (
                <MenuItem key={0} option={'current_location'}>
                    <strong>current location</strong>
                </MenuItem>
            );
        }
        if (result.paginationOption === undefined) {
            return (
                <>
                    <MenuItem key={index} option={(result) ? result : null}>
                        <strong>{result}</strong>
                    </MenuItem>
                </>
            );
        }
    });
    return (
        <>
            <Menu {...menuProps}>{(items) ? items : <MenuItem option={'current_location'}>
                <strong>Current Location</strong>
            </MenuItem>}</Menu>
        </>
    );
};

export default MenuNew;