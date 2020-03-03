import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Table,Icon } from 'semantic-ui-react'
import {Container} from 'semantic-ui-react'
import AddProductModal from './AddProductModal'
import Footer from './Footer'
import EditProductModal from './EditProductModal'
import DeleteProductModal from './DeleteProductModal'
import IdComponent from './IdComponent'

class ProductsList extends React.Component
{
  constructor(props){
    super(props)
    this.state={prods:[],id:1,sortType:'asc'}
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
  refreshList()
  {
      fetch("https://onboardingproject.azurewebsites.net/api/Products")
    .then(response=>response.json())
    .then (data=>{this.setState({prods:data});}
    )
  }
 componentDidUpdate(){
    this.refreshList();
  }
  onSort = (sortType) => {
    this.setState({ sortType})
}
  render()
  {
    const {prods,sortType}=this.state;
    const sorted = prods.sort((a, b) => {
      const isReversed = (sortType === 'asc') ? 1 : -1;
  return isReversed * a.name.localeCompare(b.name)
   });
    
    return(
      <Container>
      <AddProductModal/>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name <Icon name='caret up' onClick={()=>this.onSort('asc')} />
                  <Icon name='caret down' onClick={()=>this.onSort('desc')} /></Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
               {sorted.map(prod=>
                <Table.Row key={prod.id}>
                  <Table.Cell>{prod.name}</Table.Cell>
                  <Table.Cell>${prod.price}</Table.Cell>
                  <Table.Cell><EditProductModal prodid={prod.id} prodname={prod.name} prodprice={prod.price}/></Table.Cell>
                  <Table.Cell><DeleteProductModal prodid={prod.id} /></Table.Cell>
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
export default ProductsList