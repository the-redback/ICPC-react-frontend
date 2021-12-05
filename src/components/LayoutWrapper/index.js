import React from 'react';
import {Icon, Layout, Menu} from "antd";
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;

// An example of High Order Component(HOC) whose responsibility
// is to wrap any component given to it and return the new resulting
// component.
const LayoutWrapper = (WrappedComponent) => {
     class LayoutWrapper extends React.Component {
        render() {
            return (
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0">

                        <div className="logo slider-header">React App</div>
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1">
                                <Link to="/" >
                                    <Icon type="home"/>
                                    <span className="nav-text">Home</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/creation" >
                                    <Icon type="form"/>
                                    <span className="nav-text">Team</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/contest" >
                                    <Icon type="form"/>
                                    <span className="nav-text">Contest</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className="header" style={{background: '#e6f7ff', padding: 0}}>
                            <span>Assignment on React</span>
                        </Header>
                        <Content className="content" style={{margin: '24px 16px 0'}}>
                            <WrappedComponent {...this.props}/>
                        </Content>
                        <Footer className="footer" style={{textAlign: 'center'}}>React CRUD example</Footer>
                    </Layout>
                </Layout>
            );
        }
    }
    LayoutWrapper.displayName = `LayoutWrapper(${getDisplayName(WrappedComponent)})`;
     return LayoutWrapper;
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default LayoutWrapper;