import React from 'react'
import { DatePicker } from 'antd';
import { Button } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>
);



export default class Sleep extends React.Component{
    constructor(props){
        super(props)
        console.log(props,'sleep的props');

    }
    componentDidMount(){
        console.log(window.location,'window');
    }
    render(){
        return(
            <div>
                sleep
                <DatePicker></DatePicker>
                <Button>Button</Button>
                <Button type="dashed">Button</Button>
                <Button type="text">Button</Button>
                <Button type="link">Button</Button>
                <p></p>
                <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="s">
                Hover me <DownOutlined />
                </a>
  </Dropdown>
                </div>
        )
    }
}