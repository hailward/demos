import React, { Component } from 'react';

import SideBar from '../../components/common/side-bar';
import { Layout } from 'antd'
import AppHeader from '../../components/common/app-header';
const { Footer, Content } = Layout;

class Index extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <AppHeader />
        <Layout>
          <SideBar>

          </SideBar>
          <Content>

          </Content>
        </Layout>
        <Footer style={{ backgroundColor: '#ddd' }}>

        </Footer>
      </Layout>
    )
  }
}
export default Index;