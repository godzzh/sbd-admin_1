import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
    onMenuClick = event => {
        const { key } = event;
        if (key === 'logout') {
            const { dispatch } = this.props;

            if (dispatch) {
                dispatch({
                    type: 'login/logout',
                });
            }

            return;
        }

        router.push(`/personal/${key}`);
    };

    render() {
        const { currentUser = {}, menu } = this.props;

        if (!menu) {
            return (
                <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
                    <span className={styles.name}>{currentUser.name}</span>
                </span>
            );
        }

        const menuHeaderDropdown = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item key="information">
                    <Icon type="user" />
                    <FormattedMessage id="menu.personal.information" defaultMessage="account center" />
                </Menu.Item>
                <Menu.Item key="setting">
                    <Icon type="setting" />
                    <FormattedMessage id="menu.personal.setting" defaultMessage="account settings" />
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
                </Menu.Item>
            </Menu>
        );
        return currentUser && currentUser.name ? (
            <HeaderDropdown overlay={menuHeaderDropdown}>
                <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
                    <span className={styles.name}>{currentUser.name}</span>
                </span>
            </HeaderDropdown>
        ) : (
                <Spin
                    size="small"
                    style={{
                        marginLeft: 8,
                        marginRight: 8,
                    }}
                />
            );      
        }
}

export default connect(({ user }) => ({
    currentUser: user.currentUser,
}))(AvatarDropdown);
