import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/globalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/mojisrc/fashop-admin',
          blankTarget: true,
        }
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 邮政 商城系统 - Power By 邮政 ( www.fashop.cn )
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
