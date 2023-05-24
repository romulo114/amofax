import React from "react"

export default class Quantity extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {value: this.props.quantity}
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  
  increment() {
    this.setState({value: ++this.state.value}, () => {
      this.props.setQuantity(this.state.value)
    });

  }
  
  decrement() {
    let value = this.state.value;

    if(value === 1) return; 
    this.setState({value: --this.state.value}, () => {
      this.props.setQuantity(this.state.value)
    });

  }
  
  componentDidMount(){

  }

  render() {
    
    return (
      <div className={this.props.className}>
      <div className="quantity-input">
        <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.decrement}>
          &mdash;
        </button>
        <input className="quantity-input__screen" type="text" value={this.state.value} readOnly size={this.state.value.length} />
        <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.increment}>
          &#xff0b;
        </button>  
      </div>  
      </div>
    );
  }
}

