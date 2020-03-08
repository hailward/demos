import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css'
import AppHeader from '../../components/common/app-header';
import SideBar from '../../components/common/side-bar';
import { Layout, Row, Col, Form, Input, Button, Icon } from 'antd'
const { Footer, Content } = Layout;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      fullScreen: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    console.log(this.props)
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  fullScreen() {
    let { fullScreen } = this.state;
    if (fullScreen) {
      document.exitFullscreen();
    } else {
      document.querySelector('#content').requestFullscreen();
    }
    this.setState({
      fullScreen: !fullScreen
    })
  }
  render() {
    return (
      <Layout id="home">
        <AppHeader />
        <Layout style={{ flexDirection: 'row' }}>
          <SideBar />
          <Content id="content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', background: '#fff' }}>
            <Icon style={{ position: 'absolute', top: '0.5em', right: '0.5em', fontSize: '20px'}}
             type={this.state.fullScreen?'fullscreen-exit':'fullscreen'} 
             onClick={this.fullScreen.bind(this)}/>
            <Row>
              <Col lg={{ span: 24 }}>
                {this.state.name ? 'Hello ' + this.state.name + '!' : ''}
              </Col>
              <Col lg={{ span: 24 }}>
                <Form style={{ display: 'inline-block', width: '30em' }}>
                  <Form.Item>
                    <label>
                      <span>NAME: </span>
                      <Input name="name" value={this.state.name} onChange={this.handleInputChange}></Input>
                    </label>
                  </Form.Item>
                  <Form.Item>
                    <div style={{ display: 'flex' }}>
                      <Button type="danger" onClick={this.props.decrease}>-1</Button>
                      <Input style={{ flex: 1, margin: '0 1em' }} name="state" value={this.props.state} onChange={this.props.input}></Input>
                      <Button type="default" onClick={this.props.increase}>+1</Button>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary">I'M A BUTTON</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer style={{ background: 'pink', padding: '1em 0' }}>
          I'm a footer
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    input: (e) => {
      let value = e.target.value;
      dispatch({
        type: 'input',
        value
      })
    },
    increase: () => {
      dispatch({
        type: 'increase'
      })
    },
    decrease: () => {
      dispatch({
        type: 'decrease'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);