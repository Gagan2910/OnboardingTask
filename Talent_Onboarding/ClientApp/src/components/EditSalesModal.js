import React from 'react'
import { Button,Icon,Modal } from 'semantic-ui-react'
import {Form, Input } from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

class EditSalesModal extends React.Component{
    constructor(props){
        super(props)
        this.state={id:'',date:'',customerid:'',productid:'',storeid:''}
        this.state={custs:[],prodts:[],stores:[],snackbarOpen:false, snackbarMsg:''}
        this.handleSubmit=this.handleSubmit.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
      }
      componentDidMount(){
        //customers
          fetch("https://onboardingproject.azurewebsites.net/api/Customers")
        .then(response=>response.json())
        .then (data=>{this.setState({custs:data});})
         //products
          fetch("https://onboardingproject.azurewebsites.net/api/Products")
        .then(response=>response.json())
        .then (data=>{this.setState({prodts:data});})
         //stores
          fetch("https://onboardingproject.azurewebsites.net/api/Stores")
        .then(response=>response.json())
        .then (data=>{this.setState({stores:data});})
      }
     
      state = { modalOpen: false }
      handleOpen = (e) => this.setState({ modalOpen: true})
      handleClose = () => this.setState({ modalOpen: false })
      changeHandler=(e)=>{this.setState({[e.target.name]:e.target.value})}
      snackbarClose=(e)=>{this.setState({snackbarOpen:false})}
      handleSubmit=(e)=>{
          e.preventDefault();
          this.handleClose();
          fetch('https://onboardingproject.azurewebsites.net/api/sales/'+ this.props.saleid,
          {
              method:'PUT',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  id:e.target.id.value,
                  dateSold:e.target.dateSold.value,
                  customerName:e.target.customerName.value,
                  productName:e.target.productName.value,
                  storeName:e.target.storeName.value
              })
          }
        )
      .then(response=>response.text())
      .then(response=>{this.setState(console.log(response))},
      //{snackbarOpen:true,snackbarMsg:"Data edited successfully"}
        error=>{this.setState(console.log(error))})
        //{snackbarOpen:true,snackbarMsg:"Failed to edit"}
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
                    <Modal.Header>Edit Sales</Modal.Header>
                    <Modal.Content>
                      <Form onSubmit={this.handleSubmit}>
                      <Form.Field hidden>
                      <label>Id</label>
                      <Input name="id" placeholder='SalesId' value={this.state.id} defaultValue={this.props.saleid} onChange={this.changeHandler}/>
                      </Form.Field>
                      <Form.Field>
                        <label>Date sold</label>
                        <Input name="dateSold" placeholder='yyyy-mm-dd' value={this.state.date} defaultValue={this.props.saledate} onChange={this.changeHandler}/>
                      </Form.Field>
                    
                      <Form.Field name="customerName" label='Customers' control='select' defaultValue={this.props.salecust} onChange={this.changeHandler}>
                      {this.state.custs.map(cust=>
                        <option key={cust.id}>{cust.name}</option>)}
                      </Form.Field>

                      <Form.Field name="productName" label='Products' control='select' defaultValue={this.props.saleprod} onChange={this.changeHandler}>
                      {this.state.prodts.map(prod=>
                        <option key={prod.id}>{prod.name}</option>)}
                      </Form.Field>
                    
                      <Form.Field name="storeName" label='Stores' control='select' defaultValue={this.props.salestore} onChange={this.changeHandler}>
                      {this.state.stores.map(store=>
                        <option key={store.id}>{store.name}</option>)}
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
export default EditSalesModal