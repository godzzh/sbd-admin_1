import React, { Component } from 'react';
import {
    Table,
    Divider,
    Icon,
    Button,
    Modal,
    Form,
    Input,
    Row,
    Col,
    Radio,
    Select,
    Checkbox,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getCustServiceList } from '@/services';
import { connect } from 'dva';
import request from '../../utils/request';

import styles from './list.less';

const { confirm } = Modal;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const plainOptions = [
    '商标注册',
    '版权登记',
    '专利申请',
    '工商注册',
    '代理记账',
    '财务审计',
    '资质办理',
    '税收筹划',
    '法律服务',
    '高企认定',
    '科研平台',
    '资质认定',
    '体系认证',
    '研发费用',
    '科创人才',
    '创业专项',
    '软件测试',
    '生物分析',
    '环境可靠性实验',
    'EMC测试',
    '产品质量检测',
    '其他',
];
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],                // 客户列表数组
            showModalForm: false,           // 是否显示弹框
            modalTitle: '',                 // 弹框标题
            formContainer: {},              // 表单内容，点编辑时填充，关闭时清空
            showTableLoading: false         // 表格加载状态
        };
    }

    componentDidMount() {
        this.getServiceList();
    }

    // 获取客服列表
    getServiceList =  async (page=1, limit=10)=>{
        let _that = this;
        _that.setState({
            showTableLoading: true
        })
        let data = { page, limit };
        let res = await getCustServiceList(data);
        if(res.status === 200){
            await res.data.map(item => item.key = item.id)
            _that.setState({
                serviceList: res,
                showTableLoading: false
            })
        }
    }

    // 新增客服按钮
    addService() {
        this.setState({
            showModalForm: true,
            modalTitle: '新增客服',
        });
    }

    // 关闭弹窗
    ModalFormClose() {
        this.props.form.resetFields();  // 关闭弹窗时清空表单
        this.setState({
            showModalForm: false,
            formContainer: {}
        });
    }

    // 编辑按钮
    onEditItem(record) {
        this.setState({
            showModalForm: true,
            modalTitle: '编辑客服',
            formContainer: record
        });
    }

    // 删除按钮
    onDeletItem(record) {
        confirm({
            title: `确定要删除 ${record.account} 吗？`,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() { },
            onCancel() { },
        });
    }

    // 分页页码切换
    onPageChange(page, pageSize) {
        console.log(page, pageSize);
    }

    // 分页长度页面
    onShowSizeChange(current, size) {
        console.log(current, size);
    }

    // 提交表单
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { serviceList, showModalForm, modalTitle, formContainer, showTableLoading } = this.state;
        const columns = [
            { title: '姓名(登陆账号名)', dataIndex: 'account', key: 'account', align: 'center', width: 150,
                render: (id, record) => `${record.name}(${record.account})`,
            },
            { title: '性别', dataIndex: 'gender', key: 'gender', align: 'center', width: 80,
                render: gender => (gender ? <span>男</span> : <span>女</span>),
            },
            { title: '所属部门', dataIndex: 'department', key: 'department', align: 'center', width: 150,
                render: text => <span>{text}</span>,
            },
            { title: '当前职务', dataIndex: 'position', key: 'position', align: 'center', width: 120,
                render: text => <span>{text}</span>,
            },
            { title: '关注的服务领域', dataIndex: 'attention', key: 'attention', align: 'center', width: 200,
                render: attention=>{
                    let a = attention.join('，')
                    return <span>{a}</span>
                },
            },
            { title: '微信号', dataIndex: 'wechat', key: 'wechat', align: 'center', width: 200,
                render: text => <span>{text}</span>,
            },
            { title: '操作', key: 'action', align: 'center', width: 200,
                render: (text, record) => (
                    <span>
                        <a onClick={this.onEditItem.bind(this, record)}>
                            <Icon type="edit" /> 编辑</a>
                        <Divider type="vertical" />
                        <a onClick={this.onDeletItem.bind(this, record)}>
                            <Icon type="delete" /> 删除</a>
                    </span>
                ),
            },
        ];
        // const rowSelection = {
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //     },
        //     getCheckboxProps: record => ({
        //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //         name: record.name,
        //     }),
        // };
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <PageHeaderWrapper>
                <div className={styles.serviceList}>
                    <Button type="primary" icon="plus" onClick={this.addService.bind(this)}>新增客服</Button>
                </div>
                <Table bordered loading={showTableLoading}
                    columns={columns}
                    dataSource={serviceList.data}
                    pagination={{
                        total: serviceList.total,
                        showSizeChanger: true,
                        onChange: this.onPageChange.bind(this),
                        pageSizeOptions: ['10', '15', '20'],
                        onShowSizeChange: this.onShowSizeChange.bind(this),
                    }}
                />
                <Modal
                    visible={showModalForm}
                    width={720}
                    title={modalTitle}
                    onCancel={this.ModalFormClose.bind(this)}
                    footer={null}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="登录账号" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '请填写登录账号' }],
                                initialValue: formContainer.account || ''
                            })(<Input placeholder="请填写登录账号"/>)}
                        </Form.Item>
                        <Form.Item label="登录密码" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请填写登录密码' }],
                                initialValue: formContainer.password || ''
                            })(<Input placeholder="请填写登录密码" />)}
                        </Form.Item>
                        <Form.Item label="员工姓名" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请填写员工姓名' }],
                                initialValue: formContainer.name || ''
                            })(<Input placeholder="请填写员工姓名" />)}
                        </Form.Item>
                        <Form.Item label="员工性别" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('gender', {
                                initialValue: formContainer.gender || ''
                            })(
                                <Radio.Group>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="手机号码" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('phone', {
                                initialValue: formContainer.phone || '',
                                rules: [{ required: true, message: '请填写手机号' }]
                            })(<Input placeholder="请填写手机号码" />)}
                        </Form.Item>
                        <Form.Item label="邮箱地址" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('email', {
                                initialValue: formContainer.email || ''
                            })(<Input placeholder="请填写邮箱地址" />)}
                        </Form.Item>
                        <Form.Item label="所属部门" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('department', {
                                initialValue: formContainer.department || [],
                                rules: [{ required: true, message: '请选择所属部门' }],
                            })(
                                <Select placeholder="请选择所属部门">
                                    <Option value="客服部">客服部</Option>
                                    <Option value="商务部">商务部</Option>
                                    <Option value="技术部">技术部</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="当前职位" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('position', {
                                initialValue: formContainer.position || [],
                                rules: [{ required: true, message: '请选择当前职位' }],
                            })(
                                <Select placeholder="请选择当前职位">
                                    <Option value="一般员工">一般员工</Option>
                                    <Option value="部门主管">部门主管</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="微信号" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('wechat', {
                                rules: [{ required: true, message: '请填写微信号' }],
                                initialValue: formContainer.wechat || ''
                            })(<Input placeholder="请填写微信号" />)}
                        </Form.Item>
                        <Form.Item label="对外昵称" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: '请填写对外昵称' }],
                                initialValue: formContainer.nickname || ''
                            })(<Input placeholder="请填写对外昵称" />)}
                        </Form.Item>
                        <Form.Item label="服务领域" style={{ marginBottom: '5px' }}>
                            {getFieldDecorator('attention', {
                                rules: [{ required: true, message: '请选择服务领域' }],
                                initialValue: formContainer.attention || []
                            })(<CheckboxGroup options={plainOptions} />)}
                        </Form.Item>
                        <div className={styles.reminder}>注：选择服务领域，服务商可以成为该服务领域的专属服务商客服。</div>
                        <div className={styles.btnContent}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </div>
                    </Form>
                </Modal>
            </PageHeaderWrapper>
        );
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Index);

export default WrappedRegistrationForm;
