import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { Icon } from 'antd';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/Gitlab.png';
import styles from './UserLayout.less';

const copyright = (
    <Fragment>
        www.g4b.cn All Rights Reserved
        <p>广州网融信息技术有限公司</p>
    </Fragment>
);

const UserLayout = props => {
    const {
        route = {
            routes: [],
        },
    } = props;
    const { routes = [] } = route;
    const {
        children,
        location = {
            pathname: '',
        },
    } = props;
    const { breadcrumb } = getMenuData(routes);
    return (
        <DocumentTitle
            title={getPageTitle({
                pathname: location.pathname,
                breadcrumb,
                formatMessage,
                ...props,
            })}
        >
            <div className={styles.container}>
                <div className={styles.lang}>
                    <SelectLang />
                </div>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                {/* <span className={styles.title}>Ant Design</span> */}
                            </Link>
                        </div>
                        {/* <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div> */}
                        <h2 className={styles.descTitle}>三宝殿应用管理后台</h2>
                    </div>
                    {children}
                </div>
                <DefaultFooter links={[]} copyright={copyright} />
            </div>
        </DocumentTitle>
    );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);