import React from 'react';
import { Layout, } from 'antd';
import { Route, } from 'react-router-dom'

import Home from '../home';
import Apps from '../app/index';
import AppCreate from '../app/create';
import AppCompany from '../app/company';
import Category from '../category';
import CategoryForm from '../category/form';
import CategoryApps from '../category/apps';
import Banners from '../banner/index';
import BannerForm from '../banner/form';
import Users from '../user';
import UserDetail from '../user/detail';
import Promotes from '../agent/promote';
import Agents from '../agent';
import AgentsForm from '../agent/form';
import Version from '../setting/version';
import Us from '../setting/us';
import Share from '../setting/share';

const { Content, } = Layout;

export default class ContentComponent extends React.Component {
    render() {
        return (
            <Content style={styles.content}>
                <Route path="/" exact component={Home} />
                <Route path="/apps" exact component={Apps} />
                <Route path="/apps/create" exact component={AppCreate} />
                <Route path="/apps/update/:id" component={AppCreate} />
                <Route path="/apps/company" component={AppCompany} />
                <Route path="/category/:type" exact component={Category} />
                <Route path="/category/:type/form/:id?" component={CategoryForm} />
                <Route path="/categories/apps" component={CategoryApps} />
                <Route path="/banners" exact component={Banners} />
                <Route path="/banner/create" component={BannerForm} />
                <Route path="/banner/update/:id" component={BannerForm} />
                <Route path="/users" exact component={Users} />
                <Route path="/users/:id" component={UserDetail} />
                <Route path="/promotes" exact component={Promotes} />
                <Route path="/agents" exact component={Agents} />
                <Route path="/agents/:id" component={AgentsForm} />
                <Route path="/version" exact component={Version} />
                <Route path="/concatus" exact component={Us} />
                <Route path="/share" exact component={Share} />
            </Content>
        );
    }
}

var styles = {
    content: {
        backgroundColor: '#fff',
        margin: '12px',
        borderRadius: '4px',
        padding: '20px',
        display: '-webkit-box',
        overflow: 'auto',
    },
};
