import React from 'react';
import { Link } from "react-router-dom";
import { Table, Input, Icon, Button, Switch, Popconfirm, message } from 'antd';

import Api from '../public/api';
import Utils from '../public/utils';
import { BannerPositions } from '../public/global';

const Search = Input.Search;

class Banners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            datas: [],
            loading: false,
        };
        
        this.pagination = {};
        this.filter = {};
        this.sort = {};
        this.search = '';
    }

    componentDidMount() {
        this.fetch();
    }
    //获取列表数据
    fetch = (params = {}) => {
        this.setState({ loading: true });
        Utils.axios({
            key: 'banners',
            url: Api.getBanners,
            params: params,
            isAlert: false,
            method: 'get',
        }, (result) => {
            // console.log(result);
            this.setState({
                total: result.total,
                datas: result.rows,
                loading: false,
            });
        });
    };
    //广告列表
    getBannerList = (search = '') => {
        let limit = this.pagination.pageSize || '';
        let offset = limit ? ((this.pagination.current || 1) - 1) * limit : '';
        let order = this.sort.order || '';
        if(order == 'descend') order = 'desc';
        if(order == 'ascend') order = 'asc';
        let params = {
            'order': order,
            'sort': this.sort.field || '',
            'offset': offset,
            'limit': limit,
            'search': {
                name: search,
            },
        };
        // console.log(params);
        this.fetch(params);
    };
    //切换状态
    onChangeStatus = (value, id) => {
        Utils.axios({
            key: 'status',
            url: Api.updateBannerStatus,
            data: {
                id: id,
                status: value ? 1 : 0,
            },
        }, (result) => {
            let status = result !== undefined ? !!result : !value;
            this.setState({ 
                datas: this.state.datas.map((item, index) => {
                    return item.id == id ? Object.assign({}, item, {status: status}) : item;
                })
            });
        }, true);
    }
    //删除app
    onDelete = (id) => {
        Utils.axios({
            key: 'ret',
            url: Api.delBanner + id,
            method: 'get',
        }, (result) => {
            const datas = [...this.state.datas];
            this.setState({ datas: datas.filter(item => item.id !== id) });
        });
    }

    render() {
        const { datas, loading, total, } = this.state;
        const columns = [{
            title: '广告图片',
            dataIndex: 'image',
            render: (value, record) => {
                return (
                    value ? 
                        <img src={value} style={styles.icon} /> : 
                        <div style={styles.emptyIcon}></div>
                );
            }
        }, {
            title: '广告名称',
            dataIndex: 'name',
            sorter: true,
        }, {
            title: '显示位置',
            dataIndex: 'position',
            sorter: true,
            render: (value, record) => {
                return BannerPositions[value] ? BannerPositions[value] : '';
            },
        }, {
            title: '起始时间',
            dataIndex: 'start_time',
            sorter: true,
        }, {
            title: '结束时间',
            dataIndex: 'end_time',
            sorter: true,
        }, {
            title: '当前状态',
            dataIndex: 'status',
            sorter: true,
            render: (value, record) => {
                return (
                    <Switch 
                        checkedChildren="开启" 
                        unCheckedChildren="关闭"
                        checked={value ? true : false}
                        onChange={value => this.onChangeStatus(value, record.id)}
                    />
                );
            }
        }, {
            title: '操作',
            render: (text, record) => {
                return (
                    <Button.Group>
                        <Button>
                            <Link to={'/banner/update/' + record.id}>Edit</Link>
                        </Button>
                        <Button>
                            <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(record.id)}>
                                <a href="#">Delete</a>
                            </Popconfirm>
                        </Button>
                    </Button.Group>
                );
            },
        }];
        return (
            <div className="webkit-flex">
                <div className="toolbar">
                    <div className="searchBox">
                        <Search
                            onSearch={this.getBannerList}
                            enterButton="Search"
                            size="large"
                        />
                    </div>
                </div>
                <Table 
                    bordered
                    //size="middle"
                    dataSource={datas}
                    loading={loading}
                    rowKey={record => record.id}
                    columns={columns}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        total: total,
                        showTotal: total => `共 ${total} 条记录`,
                    }}
                    onChange={(pagination, filter, sort) => {
                        this.pagination = pagination;
                        this.filter = filter;
                        this.sort = sort;
                        this.getBannerList();
                    }}
                />
            </div>
        );
    }
}

const styles = {};
styles.icon = {
    maxHeight: '60px',
    margin: '-8px 0',
    borderRadius: '3px',
};
styles.emptyIcon = {
    maxHeight: '60px',
    backgroundColor: '#eee',
    margin: '-8px 0',
    borderRadius: '3px',
};

export default Banners;