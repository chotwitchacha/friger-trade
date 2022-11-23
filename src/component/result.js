import React from 'react';
import { Layout } from 'antd';
import '../App.css'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'

const { Header, Content } = Layout;

function Order() {
    const navigate = useNavigate()
    const num = localStorage.getItem("order")

    const backMain = () => {
        localStorage.removeItem("order");
        navigate('/')

    }

    return(
        <Layout>
            <Header style={{height: 'fit-content', background: 'white', paddingInline: 'inherit'}}>
                <div className='header'>
                    <div className="textlogo">
                        <image src='/logo.png' style={{height: '70px'}}/>
                        <h1 className='text' >FINGERTREND</h1>
                    </div>
                </div>
            </Header>
            <Content className='content'>
                <Box className='boxOrder'>
                    <image
                        style={{
                            width: '20%',
                            margin: '20px'
                        }}
                        src='/check.png'/>
                    <p className='textOrder'>คําสั่งซื้อหมายเลข {num} ของคุณสั่งซื้อสำเร็จ</p>
                    <button className="btn" onClick={backMain}> กลับไปหน้าแรก</button>
                </Box>
            </Content>
        </Layout>
    )
}

export default Order;