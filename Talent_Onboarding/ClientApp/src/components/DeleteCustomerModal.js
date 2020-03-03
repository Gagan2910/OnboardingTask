import React from 'react'
import { Button,Icon,Modal } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'


class DeleteCustomerModal extends React.Component{
    constructor(props){
        super(props)

        this.state={snackbarOpen:false, snackbarMsg:''}
        this.handleSubmit=this.handleSubmit.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
      }
      state = { modalOpen: false }
      handleOpen = (e) => this.setState({ modalOpen: true})
      handleClose = () => this.setState({ modalOpen: false })
      changeHandler=(e)=>{this.setState({[e.target.name]:e.target.value})}
      snackbarClose=(e)=>{this.setState({snackbarOpen:false})}
      handleSubmit=(event)=>{
          event.preventDefault();
          this.handleClose();
        fetch('https://onboardingproject.azurewebsites.net/api/customers/'+this.props.custid,
          {
              method:'DELETE',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  id:event.target.id.value,
              })
          }
        )
      .then(response=>response.json())
      .then(response=>{this.setState({snackbarOpen:true,snackbarMsg:"Data deleted successfully"})},
        error=>{this.setState({snackbarOpen:true,snackbarMsg:"Failed to delete"})})
      }

    render(){
          return(
                <div>
                 <Snackbar anchorOrigin={{vertical:'center',horizontal:'center'}}
                           open={this.state.snackbarOpen} autoHideDuration={4000} onClose={this.snackbarClose}
                           message={<span id="message-id">{this.state.snackbarMsg}</span>}
                           action={[<IconButton key="close" arial-label="Close" color="inherit"
                                    onClick={this.snackbarClose}>X</IconButton>]}/>
                  <Modal trigger={<Button color='red' onClick={this.handleOpen}><Icon name='trash'/>Delete</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Field hidden>
                        <label>Id</label>
                        <Input name="id" placeholder='Id' defaultValue={this.props.custid} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field>
                          <label>Are you sure?</label>
                        </Form.Field>
                        <Modal.Actions>
                          <Button secondary onClick={this.handleClose} inverted >
                          cancel
                          </Button>
                          <Button type='submit' color='red' inverted>delete
                            <label><Icon name='cancel'/></label>
                          </Button>
                        </Modal.Actions>
                     </Form>
                    </Modal.Content>
                  </Modal>
                </div>
          )
      }
}
export default DeleteCustomerModal