import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Table,Icon} from 'semantic-ui-react'
import {Container} from 'semantic-ui-react'
import AddStoreModal from './AddStoreModal'
import Footer from './Footer'
import EditStoreModal from './EditStoreModal'
import DeleteStoreModal from './DeleteStoreModal'
import IdComponent from './IdComponent'

class StoresList extends React.Component
{
  constructor(props){
    super(props)
    this.state={stores:[],id:1,sortType:'asc'}
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
  onSort = (sortType) => {
    this.setState({ sortType})
}
  refreshList()
  {
      fetch("https://onboardingproject.azurewebsites.net/api/Stores")
    .then(response=>response.json())
    .then (data=>{this.setState({stores:data});}
    )
  }
  componentDidUpdate(){
    this.refreshList();
  }
  render()
  {
    const {stores,sortType}=this.state;
    const sorted = stores.sort((a, b) => {
      const isReversed = (sortType === 'asc') ? 1 : -1;
  return isReversed * a.name.localeCompare(b.name)
   });
    
    return(
      <Container>
      <AddStoreModal/>
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
               {sorted.map(store=>
                <Table.Row key={store.id}>
                  <Table.Cell>{store.name}</Table.Cell>
                  <Table.Cell>{store.address}</Table.Cell>
                  <Table.Cell><EditStoreModal storeid={store.id} storename={store.name} storeaddress={store.address}/></Table.Cell>
                  <Table.Cell><DeleteStoreModal storeid={store.id} /></Table.Cell>
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
export default StoresList