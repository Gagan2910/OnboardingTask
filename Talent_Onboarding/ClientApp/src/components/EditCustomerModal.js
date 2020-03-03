import React from 'react'
import { Button,Icon,Modal } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'


class EditCustomerModal extends React.Component{
    constructor(props){
        super(props)
        this.state={id:'',name:'',address:''}
        this.state = {modalOpen: false,snackbarOpen:false, snackbarMsg:''}
        this.handleSubmit=this.handleSubmit.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
      }
      //state = { modalOpen: false }
      handleOpen = (e) => this.setState({ modalOpen: true})
      handleClose = () => this.setState({ modalOpen: false })
      changeHandler=(e)=>{this.setState({[e.target.name]:e.target.value})}
      snackbarClose=(e)=>{this.setState({snackbarOpen:false})}
      handleSubmit=(e)=>{
          e.preventDefault();
          this.handleClose();
          fetch('https://onboardingproject.azurewebsites.net/api/customers/'+ this.props.custid,
          {
              method:'PUT',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  id:e.target.id.value,
                  name:e.target.name.value,
                  address:e.target.address.value
              })
          }
        )
      .then(response=>response.text())
      .then(response=>{this.setState({snackbarOpen:true,snackbarMsg:"Data edited successfully"})})
      .catch(error=>{this.setState({snackbarOpen:true,snackbarMsg:"Failed to edit"})})
      }

    render(){
          return(
                <div>
                 <Snackbar anchorOrigin={{vertical:'center',horizontal:'center'}}
                           open={this.state.snackbarOpen} autoHideDuration={4000} onClose={this.snackbarClose}
                           message={<span id="message-id">{this.state.snackbarMsg}</span>}
                           action={[<IconButton key="close" arial-label="Close" color="inherit"
                                    onClick={this.snackbarClose}>X</IconButton>]}/>
                  <Modal trigger={<Button color='yellow' onClick={this.handleOpen}><Icon name='edit'/>Edit</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>
                    <Modal.Header>Edit Customer</Modal.Header>
                    <Modal.Content>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Field hidden>
                        <label>Id</label>
                        <Input name="id" placeholder='Id' value={this.state.id} defaultValue={this.props.custid} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field required>
                          <label>Name</label>
                          <Input name="name" placeholder='Full name' defaultValue={this.props.custname} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field>
                          <label>Address</label>
                          <Input name="address" placeholder='Address' defaultValue={this.props.custaddress} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Modal.Actions>
                          <Button secondary onClick={this.handleClose} inverted >
                          cancel
                          </Button>
                          <Button color='green' inverted>edit
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
export default EditCustomerModal