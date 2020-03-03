import React from 'react'
import { Button,Icon,Modal } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'


class AddCustomerModal extends React.Component{
  constructor(props){
    super(props)
    this.state={snackbarOpen:false, snackbarMsg:''}
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  state = { modalOpen: false }
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  snackbarClose=(e)=>{this.setState({snackbarOpen:false})}
  handleSubmit = (event)=>{
      event.preventDefault();
      this.handleClose();
    
      //fetch('https://localhost:44339/api/Customers', {
     fetch('https://onboardingproject.azurewebsites.net/api/customers',{
      method:'POST',
      headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:event.target.name.value,
        address:event.target.address.value
      })
    })
    .then(response=>response.json())
    .then(response=>{this.setState({snackbarOpen:true,snackbarMsg:"Data saved successfully"})},
      error=>{this.setState({snackbarOpen:true,snackbarMsg:"Failed to add"})})
  }
    render(){
        return(
              <div>
              <Snackbar anchorOrigin={{vertical:'center',horizontal:'center'}}
                         open={this.state.snackbarOpen} autoHideDuration={3000} onClose={this.snackbarClose}
                         message={<span id="message-id">{this.state.snackbarMsg}</span>}
                         action={[<IconButton key="close" arial-label="Close" color="inherit"
                                  onClick={this.snackbarClose}>X</IconButton>]}/>
                <Modal trigger={<Button primary onClick={this.handleOpen}>New Customer</Button>}
                  open={this.state.modalOpen}
                  onClose={this.handleClose}>
                  <Modal.Header>Create Customer</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Field required>
                        <label>Name</label>
                        <Input  name="name" placeholder='Full name'/>
                      </Form.Field>
                      <Form.Field>
                        <label>Address</label>
                        <Input name="address" placeholder='Address'/>
                      </Form.Field>
                      <Modal.Actions>
                        <Button secondary onClick={this.handleClose} inverted >
                        cancel
                        </Button>
                        <Button type='submit' color='green' inverted>create
                          <label><Icon name='checkmark' /></label>
                        </Button>
                      </Modal.Actions>
                   </Form>
                  </Modal.Content>
                </Modal>
              </div>
        )
    }
}
export default AddCustomerModal

