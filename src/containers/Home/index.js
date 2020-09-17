import React from 'react';
import Layout from '../../components/Layout';
import { Jumbotron,Row,Container,Col } from 'react-bootstrap';
import './style.css';
import {NavLink} from 'react-router-dom'

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
      <Layout>
      <Container fluid>
          <Row>
              <Col md ={2} className="sidebar">
              <ul>
                  <li><NavLink to={'/'}>Home</NavLink></li>
                  <li><NavLink to={'/products'}>Products</NavLink></li>
                  <li><NavLink to={'/orders'}>Orders</NavLink></li>
              </ul>
              </Col>
              <Col md={10} style={{marginLeft:'auto'}}>container</Col>
          </Row>
      </Container>
          {/*<Jumbotron style ={{margin:'5rem',background:'pink'}} className="text-center">
              <h1>Welcome To Ecommerce</h1>
              <p>This is to welcome You on our home page , here we have a lot of stuffs that you can buy here for things and things</p>
          </Jumbotron>*/}
      </Layout>
    
   )

 }

export default Home