import React, { Component } from "react";
import { connect } from "dva";
import { getPageQuery } from "@/utils/utils";
import { Spin, Card, Button, Select, Modal, Cascader } from "antd";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';

const Option = Select.Option

const stateList = [
    {
        name: '已接收',
        value: 20
    },
    {
        name: '已揽件',
        value: 30
    }
]
@connect(({ order, loading }) => ({
    orderInfo: order.info.result,
    orderInfoLoading: loading.effects["order/info"]
}))
export default class Detail extends Component {
    static defaultProps = {
        orderInfoLoading: true,
        orderInfo: {
            info: {}
        }
    };
    state = {
        visible: true
    };

    componentDidMount() {
        const { id } = getPageQuery();
        const { dispatch } = this.props;
        dispatch({
            type: "order/info",
            payload: {
                id
            }
        });
    }

    handleCancel = () => {

    }
    handleOk = () => {

    }

    render() {
        const options = [{
            value: '浙江',
            label: '浙江',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];
        const { orderInfoLoading, orderInfo } = this.props;
        const { info } = orderInfo
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Spin size="large" className="globalSpin" spinning={orderInfoLoading}>
                        <div>订单号：{info.sn}</div>
                        <div>揽收员：{info.lanshou_name}</div>
                        <Button onClick={() => {
                            this.setState({
                                visible: true
                            })
                        }}>修改订单状态</Button>
                    </Spin>
                </Card>

                <Modal
                    title="修改状态"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} onChange={() => {

                    }} />
                    <Select style={{ width: 200 }} placeholder={'请选择状态'}>
                        {stateList.map((item, index) => {
                            return <Option key={index} value={item.value}>{item.name}</Option>
                        })}

                    </Select>
                </Modal>
            </PageHeaderWrapper>
        );
    }
}
