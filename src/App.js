import React, { Component } from 'react';
import {Container, Row, Col,
        Navbar, Nav,
        Media,} from 'react-bootstrap';
import {BrowserRouter as Router, 
        Route,
        Link,
        Switch,} from 'react-router-dom';
import Calendar from './calendar';
import dateFns from 'date-fns';
import './App.css';
import icon from './css/icon/muara-icon.png';
import thumb from './css/images/learn-islam.jpg';

const Navigation = ()=>{
  return (
    <header className='header-bar'>
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

const Preview_Konten = (content)=>{
  return (
    <Row className='preview-kontent'>
      <Col xs={2} className='col-preview'>
        <img src={thumb} className='thumbnail' alt='icon-kajian'></img>
      </Col>
      <Col xs={10} className='col-preview'>
        <h3>{content.kajian}</h3>
        <p>Oleh {content.ustadz}</p>
        <p>di {content.lokasi}</p>
      </Col>
    </Row>
    )
}

const Home = (kajian)=> {
  return (
    <Container>
      <h1>This is Home Page</h1>
      {Preview_Konten(kajian)}
    </Container>
  )
}

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {dates: new Date(),
                  list_kajian: [],
                  };
  }

  changeDates =(date)=>{
		this.setState({dates:date},function(){this.collectKajian()})
  }

  collectKajian = ()=>{
    const date_filter = this.state.dates;
    let kajian_filter = [];
    for (let kajian in this.props.data_kajian) {
      const date_kajian = dateFns.parse(this.props.data_kajian[kajian].date);
      if(dateFns.isSameDay(date_kajian,date_filter)) kajian_filter.push(this.props.data_kajian[kajian]);
		}
		this.setState({list_kajian:kajian_filter})
	}

  countKajian = ()=>{
    let kajian_count = [];
    for (let kajian in this.props.data_kajian) {
      const date_kajian = dateFns.parse(this.props.data_kajian[kajian].date);
      kajian_count.push(date_kajian);
    }
    return kajian_count
  }

  renderKajian = ()=>{
    let result = [];
    for(let kajian of this.state.list_kajian){
      result.push(Preview_Konten(kajian))
    }
    return result;
  }

  render() {
    const idLocale = require('date-fns/locale/id')
		const DateFormat = 'DD/MM/YYYY';
		const count_kajian = this.countKajian()
    return (
      <Row>
        <Col><Calendar changeDates={this.changeDates} countKajian={count_kajian}/></Col>
        <Col>
          <Row><h2>{dateFns.format(this.state.dates,DateFormat,{locale:idLocale})}</h2></Row>
          <Row>
            <Container>
            {this.renderKajian()}
            </Container>
          </Row>
        </Col>
      </Row>
    )
  }
}

class Ustadz extends Component {
  constructor(props){
    super(props)
    this.state = {person:'',
                  list_kajian:[],
                  }
  }

  collectUstadz=()=>{
    let daftar_ustadz = [];
    const daftar_kajian = this.props.data_kajian;
    for (let kajian in daftar_kajian){
      const ustadz = daftar_kajian[kajian].ustadz;
      if(!daftar_ustadz.includes(ustadz))daftar_ustadz.push(ustadz)
    }
    return daftar_ustadz
  }

  renderDaftarUstadz=()=>{
    const daftar_ustadz = this.collectUstadz();
    let result = [];
    for (let ustadz of daftar_ustadz){
      const render = <h3 onClick={()=>this.changeUstadz(ustadz)}>{ustadz}</h3>
      result.push(render);
    }
    return result;
  }

  changeUstadz=(ustadz)=>{
    this.setState({person:ustadz},()=>{this.collectKajian()})
  }

  collectKajian = ()=>{
    const ustadz = this.state.person;
    let kajian_filter = [];
    for (let kajian in this.props.data_kajian) {
      if(this.props.data_kajian[kajian].ustadz==ustadz)kajian_filter.push(this.props.data_kajian[kajian])
		}
		this.setState({list_kajian:kajian_filter})
	}

  renderKajian = ()=>{
    let result = [];
    for(let kajian of this.state.list_kajian){
      result.push(Preview_Konten(kajian))
    }
    return result;
  }

  render(){
    return (
      <Row>
        <Col md={3}>
          <Container>
            {this.renderDaftarUstadz()}
          </Container>
        </Col>
        <Col md={9}>
          <Row>{this.state.person}</Row>
          <Row>
            <Container>
              {this.renderKajian()}
            </Container>
          </Row>
        </Col>
      </Row>
    )
  }
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
    const data_kajian = {
                          1:{kajian:'Apa Itu Syiah',ustadz:'Abdul Somad',date:'2019-03-23',lokasi:'Masjid Agung Ujungberung'},
                          2:{kajian:'Bara Api Akhir Zaman',ustadz:'Adi Hidayat',date:'2019-03-18',lokasi:'Masjid Salman ITB'},
                          3:{kajian:'Kriteria Aliran Sesat',ustadz:'Adi Hidayat',date:'2019-04-01',lokasi:'Masjid Al Latief'},
                          4:{kajian:'Kebangkitan Islam di Akhir Zaman',ustadz:'Adi Hidayat',date:'2019-03-13',lokasi:'Masjid Salman ITB'},
                          5:{kajian:'Untuk Apa Kita Hidup di Dunia',ustadz:'Abdul Somad',date:'2019-03-25',lokasi:'Masjid Raya Bandung'},
                          6:{kajian:'Sejarah Panjang Penaklukan Konstantinopel',ustadz:'Felix Siauw',date:'2019-03-16',lokasi:'Pusdai'},
                          7:{kajian:'Udah Putusin Aja',ustadz:'Felix Siauw',date:'2019-03-13',lokasi:'Pusdai'},
                          8:{kajian:'Keutamaan Abu Bakar',ustadz:'Khalid Basalamah',date:'2019-03-19',lokasi:'Masjid Salman ITB'},
                          9:{kajian:'Ruqyah, Dalil dan Pelaksanaannya',ustadz:'Khalid Basalamah',date:'2019-03-28',lokasi:'Pusdai'},
                          10:{kajian:'Lelah Berpisah Mari Berjamaah',ustadz:'Bacthiar Natsir',date:'2019-03-21',lokasi:'Masjid Al Latief'},
                          11:{kajian:'Kemenangan itu Dekat',ustadz:'Abdul Somad',date:'2019-03-17',lokasi:'Pusdai'},
                          12:{kajian:'Keluarga di Islam',ustadz:'Bacthiar Natsir',date:'2019-03-13',lokasi:'Masjid Agung Ujungberung'},
                          13:{kajian:'Saya Bangga Saya Seorang Muslim',ustadz:'Salim A Fillah',date:'2019-03-30',lokasi:'Masjid Al Latief'},
                          14:{kajian:'Fiqh Muamalah Zaman Now',ustadz:'Adi Hidayat',date:'2019-03-18',lokasi:'Masjid Salman ITB'},
                        }

    return (
      <Router className='container-root'>
        <Navigation></Navigation>
        <Container className='content'>
          <Switch>
            <Route exact path='/' render={()=>Home(data_kajian[6])}/>
            <Route path='/events' render={()=><Events data_kajian={data_kajian}/>}/>
            <Route path='/ustadz' render={()=><Ustadz data_kajian={data_kajian}/>}/>
            <Route path='/masjid' render={()=><Masjid/>}/>
            <Route path='/komunitas' render={()=><Komunitas/>}/>
            <Route render={()=><h1>Page not Found</h1>}/>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
