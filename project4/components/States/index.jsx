import React from "react";
import "./styles.css";

/**
 * Define States, a React component of CS142 Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "window.cs142models.statesModel()",
      window.cs142models.statesModel()
    );
    this.state = {
      inputValue : "",
      namearray :window.cs142models.statesModel(),
    };
    this.handleChangeBound = (event) => this.handleChange(event);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return <div className = "container">
      <h1>Search for States' name with substring</h1>
      <div className = "inputfield">
        <label htmlFor="inId">Input Field:</label>
        <input
            id="inId"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChangeBound}
          />
      </div>
      {
        this.state.inputValue && (
          <div>
          <p>States name with substring '{this.state.inputValue}' are as following :</p>
          <p>{(this.state.namearray.filter(word => word.toLowerCase().includes(this.state.inputValue.toLowerCase()))).map(function(item){
            return item +', ';
          })
          }</p>
          </div>
        )}
    </div>;
  }
}

export default States;
