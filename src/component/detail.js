import React, {useState} from "react";
import '../App.css'
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Image } from 'antd';
import Model from "./model";
const { Header, Content } = Layout;

function Detail() {
    const [showModal, setShowModal] = useState(false)
    const [datas, setDatas] = useState()
    const navigate = useNavigate()
    const detail = localStorage.getItem("detail")
    const data = JSON.parse(detail)
    const [desc, setDesc] = useState([data]);
    const [id, setId] = useState()
    const [title, setTitle] = useState()
    const [image, setImage] = useState()
    const [price, setPrice] = useState()
    

    const backMain = () => {
        localStorage.removeItem("detail");
        navigate('/')

    }

    const clickBuy = (data) => {
        setShowModal(data)
        setDatas(data)
        setId(data.id)
        setTitle(data.title)
        setImage(data.imgs)
        setPrice(data.price)
    }

    const hideModal = (value) => {
        setShowModal(false);
      }

    console.log('detail', desc);

    return(
        <Layout>
            <Header style={{height: 'fit-content', background: 'white', paddingInline: 'inherit'}}>
                <div className='header'>
                    <div className="textlogo">
                        <image src='/logo.png' style={{height: '70px'}}/>
                        <h1 className='text' >FINGERTREND</h1>
                    </div>
                    <button className="btn" onClick={backMain}> กลับไปหน้าแรก</button>
                </div>
            </Header>
            <Content>
                <div className='content'>
                    <Box style={{height: '-webkit-fill-available'}} sx={{ flexGrow: 1 }}>
                        { desc.map((item, index) => (
                            <Grid className="gridImg" container spacing={2} key={index}>
                                <Grid  xs={12} md={6}
                                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                >
                                        <Image
                                            width="auto"
                                            src={item.image}
                                        />
                                </Grid>
                                <Grid style={{display: 'flex'}} xs={12} md={6}>
                                    <Box className="boxDetail">
                                        <p className="textP"> {item.title} </p>
                                        <div style={{padding: '0 30px'}} className="textDetail">
                                            <p>รสชาติ : {item.desc.taste}</p>
                                            <p>คุณภาพสินค้า : {item.desc.quality}</p>
                                            <p>ลักษณะ : {item.desc.nature}</p>
                                            <p>ขนาด : {item.desc.size}</p>
                                            <p>ราคา : {item.desc.price} บาท/กิโลกรัม</p>
                                            <p>คลัง : {item.desc.treasury} กิโลกรัม</p>
                                            <p>มาตรฐานการผลิต : {item.desc.standard}</p>
                                            <p>มาตรฐานสินค้า : {item.desc.product}</p>
                                        </div>
                                        <div className="boxBtnBuy">
                                            <button className="btnBuy" onClick={()=> clickBuy({id:item.id, title: item.title, price:item.desc.price, imgs: item.image})}> ซื้อเลยตอนนี้ </button>
                                        </div>
                                       
                                    </Box>
                                    
                                </Grid>
                        </Grid>
                        ))

                        }
                    </Box>
                </div>
            </Content>
            <Model
                show={showModal === datas}
                id={id}
                image={image}
                title={title}
                price={price}
                setShow={() => hideModal(datas)}
            />
        </Layout>
    ) 
}

export default Detail;