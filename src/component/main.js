import React , { useState, useEffect} from 'react';
import '../App.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Layout , Typography, Input, Card} from 'antd';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom'
import Condition from './condition';

const { Header, Footer, Content } = Layout;
const { Search } = Input;
const { Meta } = Card;

function Main() {
    const [showModal, setShowModal] = useState(true)
    const [datas, setDatas] = useState([]);
    const [filter, setFilter] = useState('')
    const navigate = useNavigate()
    const cookie = localStorage.getItem("condition")

    const fetchPost = async () => {
       
        await getDocs(collection(db, "test"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setDatas(newData);                
            })
       
    }

    useEffect(()=>{
        fetchPost();
        console.log('showModal',showModal);
        console.log('cookie',cookie);
        if (cookie == 'false') {
            setShowModal(false)
        }
    }, [])

    const selectCard = (desc) => {
        localStorage.setItem("detail", JSON.stringify(desc))
        navigate('/detail')
      }

    const searchText = (e) => {
        setFilter(e.target.value)
        
    }

    let dataSearch = datas.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
            )
    })

    const hideModal = () => {
        setShowModal(false);
      }

    
      
    console.log('filter', filter);

    return(
        <Layout>
            <Header style={{height: 'fit-content', background: 'white', paddingInline: 'inherit'}}>
                <div className='header'>
                <img src='/logo.png' style={{height: '70px'}}/>
                <h1 className='text' >FINGERTREND</h1>
                <Search 
                    className='boxsearch' 
                    placeholder="คุณกำลังมอง..."
                    onChange={searchText}
                    value={filter}
                    
                    enterButton 
                
                />
                
                </div>
            </Header>
            <Content>
                <div className='content'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className='grid' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
                    {dataSearch.map((item, index) => (
                        <Grid style={{padding: 'none'}} item xs={2} sm={4} md={3} key={index}>
                        <Card 
                            onClick={() => selectCard({id:item.id, title:item.title, desc:item.desc, image:item.image})}
                            hoverable
                            style={{ width: 270, marginInline: 10 }}
                            cover={<img alt="example" src={item.image} />}
                        >
                            <Box 
                            display='flex'
                            flexDirection='column'
                            alignItems='center'>

                                <Meta title={item.title} />
                                {item.description} บาท/กิโลกรัม
                                <Meta description={`มาตรฐาน ${item.desc.product}`} />
                                

                            </Box>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                </Box>
                </div>
            </Content>
            <Condition
                show={showModal}
                setShow={hideModal}
            />
        </Layout>
    )

}   

export default Main;