import './TypeAheadDropDown.css'
import React from 'react';


export default class TypeAheadDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: '',
      updated: '',
      dropdownClose: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.defaultSelected !== this.props.defaultSelected) {
      this.setState(() => ({
        suggestions: [],
        text: this.props.defaultSelected,
        updated: 'updated',
      }));
    }
  }

  onTextChange = (e) => {
    const { iteams } = this.props;
    let suggestions = [];
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestions = iteams.sort().filter(v => regex.test(v));
      this.setState({
        dropdownClose: true
      })
    }


    this.setState(() => ({
      suggestions,
      text: value,

    }));
  }

  suggestionSelected = (value) => {
    this.setState(() => ({
      text: value,
      suggestions: []
    }))
  }

  renderSuggestions = () => {
    const { suggestions } = this.state;

    if (suggestions.length === 0) {
      return (
        null
      )
    }
    return (
      <ul style={{ display: this.state.dropdownClose ? 'block' : 'none' }}>
        <li key={0} onClick={(e) => this.props.onTextChange('current_location', e)}>Current location</li>

        {suggestions.map(city => <li key={city} onClick={(e) => this.onClickSelectedCity(city, e)}>{city}</li>)}
      </ul>
    )
  }

  onClickSelectedCity = (city, e) => {


    this.props.onTextChange(city, e)
    this.setState({
      dropdownClose: false,
      text: city
    })
  }


  render() {
    const { text } = this.state
    return (
      <div className="TypeAheadDropDown">
        <input onChange={this.onTextChange} onBlur={(e) => this.props.onTextBlur(this.state.text, this.state.updated, e)} placeholder="Search Address, City, State, Zip Code" value={text} type="text" />
        {/* <input onChange={this.onTextChange} placeholder="Search Address, City, State, Zip Code" value={text} type="text" /> */}
        {this.renderSuggestions()}
      </div>
    );
  }

}