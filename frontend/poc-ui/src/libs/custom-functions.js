function handleInputChange (event) {
  this.setState({
    [event.target.name]: event.target.value
  });
}

export {handleInputChange}