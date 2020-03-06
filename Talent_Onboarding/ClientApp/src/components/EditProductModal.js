import React from 'react'
import { Button,Icon,Modal } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

class EditProductModal extends React.Component{
    constructor(props){
        super(props)
        this.state={id:'',name:'',price:''}
        this.state={snackbarOpen:false, snackbarMsg:''}
        this.handleSubmit=this.handleSubmit.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
      }
      state = { modalOpen: false }
      handleOpen = (e) => this.setState({ modalOpen: true})
      handleClose = () => this.setState({ modalOpen: false })
      changeHandler=(e)=>{this.setState({[e.target.name]:e.target.value})}
      snackbarClose=(e)=>{this.setState({snackbarOpen:false})}
      handleSubmit=(e)=>{
          e.preventDefault();
          this.handleClose();
          fetch('https://onboardingproject.azurewebsites.net/api/products/'+ this.props.prodid,
          {
              method:'PUT',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  id:e.target.id.value,
                  name:e.target.name.value,
                  price:e.target.price.value
              })
          }
        )
      .then(response=>response.text())
      .then(response=>{this.setState({snackbarOpen:true,snackbarMsg:"Data edited successfully"})},
        error=>{this.setState({snackbarOpen:true,snackbarMsg:"Failed to edit"})})
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
                    <Modal.Header>Edit Product</Modal.Header>
                    <Modal.Content>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Field hidden>
                        <label>Id</label>
                        <Input name="id" placeholder='Id' defaultValue={this.props.prodid} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field>
                          <label>Name</label>
                          <Input name="name" placeholder='Productname' defaultValue={this.props.prodname} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field>
                          <label>Price</label>
                          <Input name="price" placeholder='Price' defaultValue={this.props.prodprice} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Modal.Actions align='right'>
                        <Button color='black' content='cancel' onClick={this.handleClose}/>
                        <Button type='submit' color='green' content='edit' icon='checkmark' labelPosition='right' />
                        </Modal.Actions>
                     </Form>
                    </Modal.Content>
                  </Modal>
                </div>
          )
      }
}
export default EditProductModal