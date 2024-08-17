import React from 'react'


import { Avatar, List } from 'antd';
const data = [
    {
      title: 'Ant Design Title 1',
    },
    
  ];
export default function Chats() {
  return (
    <>
    
    
<List
    itemLayout="horizontal"
    style={{margin:'10px'}}
    dataSource={data}
    renderItem={(item, index) => (
        <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={"kjbejfhb"}
          description="Ant Design"
        />
      </List.Item>
    )}
  />
    </>
  )
}
