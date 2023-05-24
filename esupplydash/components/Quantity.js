import React from "react"

export default class Quantity extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {value: this.props.quantity}
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  

  increment() {
    this.setState({value: ++this.state.value});

    if(this.props.effect){
      this.props.effect(this.props.item, this.state.value)
      return;
    }

	  let index = this.props.cartItems.findIndex(x => x.name === this.props.name); 

    if(index !== -1){
    	let cartItems = [ ...this.props.cartItems];

    	cartItems[index] = { ...cartItems[index], quantity: this.state.value}
    	if(cartItems[index].quantity <= 0){
    		let cartItems = this.props.cartItems.filter(x => x.name !== name)
    	}
    	this.props.setCartItems([...cartItems])
    }

  }
  
  decrement() {

    if(this.props.effect){
      this.props.effect(this.props.item, Math.max(this.state.value - 1, 0))
      
      if(this.state.value !== 0) this.setState({value: --this.state.value});

      return;
    }

    this.setState({value: --this.state.value});

    let index = this.props.cartItems.findIndex(x => x.name === this.props.name); 

   	if(index !== -1){
  		let cartItems = [ ...this.props.cartItems];

  		cartItems[index] = { ...cartItems[index], quantity: this.state.value}
  		if(cartItems[index].quantity <= 0){
  			cartItems = this.props.cartItems.filter(x => x.name !== this.props.name)
  		}
  		this.props.setCartItems([...cartItems])
  	}
  }
  
  componentDidMount(){
    let arr = JSON.parse(window.localStorage.checkedItemsConfigure);

    if(!this.props.item) return;
    
    let index = arr.findIndex(x => x.name === this.props.item.name && x.id === this.props.item.id)

    if(index !== -1){
      this.setState({ value: arr[index].quantity });
    }
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

