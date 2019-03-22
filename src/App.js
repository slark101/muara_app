import React, { Component } from 'react';
import {Container, Row,
        Navbar, 
        Nav,} from 'react-bootstrap';
import {BrowserRouter as Router, 
        Route,
        Link,
        Switch,} from 'react-router-dom';
import './App.css';
import icon from './css/icon/muara-icon.png'

const Navigation = ()=>{
  return (
    <header class='header-bar'>
    <Row>
      <Navbar collapseOnSelect light expand='md' fixed='top' className='base-navbar'>
        <Link to='/' className='navbar-brand'>
          <Navbar.Brand><img src={icon} className='webicon' alt='Logo'></img> <span>TemuKajian</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Item><Link to='/events' className='nav-link'>Events</Link></Nav.Item>
            <Nav.Item><Link to='/ustadz' className='nav-link'>Ustadz</Link></Nav.Item>
            <Nav.Item><Link to='/masjid' className='nav-link'>Masjid</Link></Nav.Item>
            <Nav.Item><Link to='/komunitas' className='nav-link'>Komunitas</Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Row>
    </header>
  )
}

const Home = ()=> {
  return (
    <h1>This is Home Page</h1>
  )
}

const Events = ()=> {
  return (
    <h1>This is Events Page</h1>
  )
}

const Ustadz = ()=> {
  return (
    <h1>This is Ustadz Page</h1>
  )
}

const Masjid = ()=> {
  return (
    <h1>This is Masjid Page</h1>
  )
}

const Komunitas = ()=> {
  return (
    <h1>This is Komunitas Page</h1>
  )
}

class App extends Component {
  render() {
    return (
      <Router className='container-root'>
        <Navigation></Navigation>
        <Container className='content'>
          <Switch>
            <Route exact path='/' render={()=><h1>Home</h1>}/>
            <Route path='/events' render={()=><h1>Events</h1>}/>
            <Route path='/ustadz' render={()=><h1>Ustadz</h1>}/>
            <Route path='/masjid' render={()=><h1>Masjid</h1>}/>
            <Route path='/komunitas' render={()=><h1>Komunitas</h1>}/>
            <Route render={()=><h1>Page not Found</h1>}/>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
