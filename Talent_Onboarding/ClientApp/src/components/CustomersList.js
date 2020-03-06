import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Table} from 'semantic-ui-react'
import {Container} from 'semantic-ui-react'
import AddCustomerModal from './AddCustomerModal'
import Footer from './Footer'
import EditCustomerModal from './EditCustomerModal'
import DeleteCustomerModal from './DeleteCustomerModal'
import IdComponent from './IdComponent'
import { Icon } from 'semantic-ui-react'

class CustomersList extends React.Component
{
  constructor(props){
    super(props)
    this.state={custs:[],id:1,name:'asc'}
    this.refreshList=this.refreshList.bind(this)
    this.btnClick=this.btnClick.bind(this)
    }
  btnClick(e){
    const id=e.target.value
    this.setState({id})
    this.refreshList()
  }
  componentDidMount(){
    this.refreshList();
  }
  componentDidUpdate(prevProps, prevState, snapshot){
      if(this.state.id===prevState.id)
      {
        //data=>{ this.setState({custs:data});}
        this.refreshList();
      }
  }
  refreshList()
  {
    fetch('https://onboardingproject.azurewebsites.net/api/customers')
    //fetch('https://localhost:44339/api/Customers')
    .then(response=>response.json())
    .then (data=>{this.setState({custs:data});}
    )
  }
  
  onSort = (name) => {
        this.setState({ name})
    }

  render()
  {
      const { custs,name} = this.state;
      const sorted = custs.sort((a, b) => {
              const isReversed = (name === 'asc') ? 1 : -1;
          return isReversed * a.name.localeCompare(b.name)
           });
    return(
      <Container>
      <AddCustomerModal/>
        <Table celled striped>
              <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name<Icon name='caret up' onClick={()=>this.onSort('asc')} />
                            <Icon name='caret down' onClick={()=>this.onSort('desc')} /></Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sorted.map(cust=>
                <Table.Row key={cust.id}>
                <Table.Cell>{cust.name}</Table.Cell>
                <Table.Cell>{cust.address}</Table.Cell>
                <Table.Cell><EditCustomerModal custid={cust.id} custname={cust.name} custaddress={cust.address}/></Table.Cell>
                <Table.Cell><DeleteCustomerModal custid={cust.id}/></Table.Cell>
                </Table.Row>
              )}
              </Table.Body>
        </Table>
        <IdComponent name="1" onClick={this.btnClick}/>
        <Footer/>
        </Container>
    )
  }
}
export default CustomersList