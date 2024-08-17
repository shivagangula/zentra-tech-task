import React from 'react'
import { Avatar, Button, List, Typography } from 'antd';
const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    
  ];
export default function IntReq() {
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
          title={<a href="https://ant.design">{item.title}</a>}
          description={
            <>
            <Typography.Text>
            Ant Design, a design language for background applications, is refined by Ant UED Team
            </Typography.Text> <br />
            
        <Button className="cm-btn" style={{marginRight:'5px'}}>Reject</Button>
        <Button className='cm-btn-primary'>Accept</Button>
            
            </>
          }
       
        />
        
      </List.Item>
    )}
  />
   
   </>
  )
}
