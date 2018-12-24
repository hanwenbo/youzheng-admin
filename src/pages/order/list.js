import React, { Component } from "react";
import { Form, Table, Card ,Button} from "antd";
import {connect } from "dva"
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import moment from "moment"
@Form.create()
@connect(({ order, loading }) => ({
    orderList: order.list.result,
    orderListLoading: loading.effects["order/list"]
}))
class List extends Component {
    static defaultProps = {
        orderListLoading: true,
        orderList: {}
    };
    state = {
        page:1,
        rows:10,
    };

    componentDidMount() {
        this.initList()
    }

    initList(){
        const {dispatch} = this.props
        dispatch({
            type:'order/list',
            payload:{
                page:this.state.page,
                rows:this.state.rows,
            }
        })
    }
    render() {
        const {orderList,orderListLoading} = this.props
        console.log(orderListLoading)
        const columns = [{
            title: '订单号',
            dataIndex: 'sn',
        }, {
            title: '订单时间',
            dataIndex: 'create_time',
            render: e => moment(e * 1000).format("YYYY-MM-DD hh:mm"),
            width: 200
        }, {
            title: '订单状态',
            dataIndex: 'state',
        }, {
            title: '揽收员',
            dataIndex: 'lanshou_name',
            render:(value,row)=>{
                return <span><img src={row.lanshou_avatar} width={20} height={20}/>{value}</span>
            }
        }, {
            title: '投递部',
            dataIndex: 'department_name',
        }, {
            title: '是否超时',
            dataIndex: 'timeout',
        }, {
            title: '催单次数',
            dataIndex: 'reminder_times',
        }, {
            title: '最后催单时间',
            dataIndex: 'address',
        }, {
            title: '操作',
            dataIndex: 'op',
            render:(value,row)=>{
                return <span>
                    <a href={`/order/list/detail?id=${row.id}`}>详情</a>
                    {/*<Divider type="vertical" />*/}
                </span>
            }
        }];

        const data = orderList.list;
        return <PageHeaderWrapper hiddenBreadcrumb={true}>

            <Card bordered={false}>
                <Button loading={orderListLoading} onClick={()=>{
                    this.initList()
                }}>测试请求</Button>
                <Table
                    loading={orderListLoading}
                    columns={columns}
                    dataSource={data}
                    bordered
                />
            </Card>
        </PageHeaderWrapper>
    }

}

const state_type_list = [
    {
        name: "待发货",
        value: "state_pay"
    }, {
        name: "待付款",
        value: "state_new"
    }, {
        name: "已发货",
        value: "state_send"
    }
    , {
        name: "已完成",
        value: "state_success"
    }, {
        name: "已关闭",
        value: "state_cancel"
    }
];
const order_kind_list = [
    {
        name: "普通订单",
        value: "ordinary"
    }, {
        name: "拼团",
        value: "group"
    }
];

const keywords_type_list = [
    {
        name: "商品名称",
        value: "goods_name"
    },
    {
        name: "订单号",
        value: "order_no"
    },
    {
        name: "收货人姓名",
        value: "receiver_name"
    },
    {
        name: "收货人电话",
        value: "receiver_phone"
    },
    {
        name: "快递单号",
        value: "courier_number"
    }
];

export default List;
