import React, {useState, useEffect} from "react";
import './model.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {CloseOutlined} from '@ant-design/icons';
import { Card, Input, Tooltip, Checkbox, Select, Button    } from 'antd';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const { Meta } = Card;

const NumericInput = (props) => {
    const { value, onChange } = props;
    const handleChange = (e) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
        onChange(inputValue);
      }
    };
  
    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
      let valueTemp = value;
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };
    return (
      <Tooltip trigger={['focus']}  overlayClassName="numeric-input">
        <Input
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={16}
        />
      </Tooltip>
    );
  };


function Model({show, setShow, image, title, price}) {
    const [value, setValue] = useState(0);
    const [datas, setDatas] = useState([]);
    const [tel, setTel] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [cost, setCost] = useState(0)
    const [provin, setProvin] = useState('')
    const [alert, setAlert] = useState('')

    parseInt(price)

    const result = price * parseInt(value)
    const Totals = result + cost
    const navigate = useNavigate()

    const province = []
    const [order, setOrder] = useState([])
    const fetchPost = async () => {
       
        await getDocs(collection(db, "province"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setDatas(newData);                
            })
       
    }

    useEffect(()=>{
        fetchPost();
    }, [])

    const onChangeWatse = (value) => {
        setValue(`${value}`)
        setAlert('')
        if (value === 0) {
            setCost(0)
            setAlert('')
        } else if (value <= 3 && value !== 0) {
            setCost(50)
            setAlert('')
        } else if (value === 4) {
            setCost(60)
            setAlert('')
        } else if (value === 5) {
            setCost(70)
            setAlert('')
        } else if (value === 6) {
            setCost(80)
            setAlert('')
        } else if (value === 7) {
            setCost(85)
            setAlert('')
        } else if (value === 8) {
            setCost(95)
            setAlert('')
        } else if (value === 9) {
            setCost(105)
            setAlert('')
        } else if (value === 10) {
            setCost(120)
            setAlert('')
        } else if (value > 10 && value <= 15) {
            setCost(165)
            setAlert('')
        } else if (value > 15 && value <= 20) {
            setCost(210)
            setAlert('')
        } else if (value > 20 && value <= 25) {
            setCost(230)
            setAlert('')
        } else if (value > 25 && value <= 30) {
            setCost(250)
            setAlert('')
        } else {
            setAlert('*??????????????????????????????????????????????????????????????????????????????????????? 30 ????????????????????????*')
        }
    }


    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const getTel = (e) => {
        setTel(e.target.value)
    }

    const onChangeSelect = (value) => {
        setProvin(`${value}`)
      };

    const getName = (e) =>{
        setName(e.target.value)
    }

    const getAddress = (e) =>{
        setAddress(e.target.value)
    }
   
    datas.map((item) => (
        province.push({value: item.value, label: item.label})
    ))

    

    const submit = () => {
        setOrder({
            product : title,
            amount: value,
            name: name,
            address: address,
            province : provin,
            tel : tel,
            total : Totals
        })
        
        Swal.fire({
            title: '????????????????????????????????????????????????',
            text: "????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '????????????????????????????????????????????????',
            cancelButtonText: '??????????????????'
          }).then((result) => {
            if (result.isConfirmed) {
                addData();
            }
          })
    }

    const closeModel = () =>{
        setOrder([])
        setAddress('')
        setValue('')
        setTel('')
        setName('')
        setProvin('')
        setShow();
    }
    
    localStorage.setItem("results", JSON.stringify(order))
    const add = localStorage.getItem("results")
    

    const addData = async () => {
        
        console.log('num', JSON.parse(add));
        const docRef = await addDoc(collection(db, "order") , {
            order : [{
                product : title,
                amount: value,
                name: name,
                address: address,
                province : provin,
                tel : tel,
                total : Totals
            }]
        });
        console.log("Document written with ID: ", docRef.id);
        if (docRef.id !== '') {
            localStorage.setItem("order", docRef.id)
            navigate('/result')
        }
            
    }
    
    
    

    return(

        show && 
        <div className="overlay">
            <div className="model">
                <div className="modal-body">
                    <Box style={{height: '-webkit-fill-available'}}  sx={{ flexGrow: 1 }}>
                        <Grid style={{height: '-webkit-fill-available'}} container >
                            <Grid style={{display: 'flex', alignItems: 'center'}} md={5}>
                                <div style={{padding: '10px'}}>
                    
                                        <Card 
                                             style={{ width: 270, marginInline: 10 }}
                                             cover={<img alt="example"  src={image} />}
                                         >
                                        <Box 
                                             display='flex'
                                            flexDirection='column'
                                            alignItems='center'
                                            className="textC"
                                        >
    
                                            <Meta title={title} />
                                            {price} ?????????/????????????????????????
                                            <Meta description="????????????????????? GAP" />
    
                                        </Box>
                                        </Card>
                                 
                                </div>
                            </Grid>
                            <Grid md={7} style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
                               
                                <div className="divDet" >
                                    <div className="btnClose">
                                        <Button onClick={closeModel} icon={<CloseOutlined />}> </Button>
                                    </div>
                                    <p>???????????? : {price} ?????????/????????????????????????</p>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        <p>?????????????????? :
                                            &nbsp;
                                            <NumericInput
                                                style={{
                                                    width: 120,
                                                }}
                                                // value={value}
                                                onChange={onChangeWatse}
                                                value={value}
                                            /> 
                                            &nbsp;
                                            ????????????????????????
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 'small',
                                                color: 'red',
                                                paddingLeft: '20px'
                                            }}
                                        >
                                            {alert}
                                        </p>
                                    </div>
                                    {value === '' ? <p>??????????????????????????????????????? : 0 ?????????</p>
                                        : <p>??????????????????????????????????????? : { result } ?????????</p>
                                    }
                                    <p>???????????????????????????????????????????????? : &nbsp;
                                        <Input 
                                            style={{width: 'auto'}} 
                                            placeholder="??????????????? - ?????????????????????"
                                            onChange={getName}
                                            value={name}
                                            
                                        />
                                        &nbsp;
                                        <Checkbox className="checkBox" onChange={onChange}> ????????????????????????????????????????????????????????? </Checkbox>
                                    </p>
                                    <p>???????????????????????????????????????????????? : &nbsp;
                                        <Input 
                                            style={{width: 'auto'}} 
                                            placeholder="?????????????????? ????????? ????????? ???????????????" 
                                            onChange={getAddress}
                                            value={address}

                                        />
                                        &nbsp;
                                        <Checkbox className="checkBox" onChange={onChange}> ????????????????????????????????????????????????????????? </Checkbox>
                                    </p>
                                    <p>????????????????????????????????? : &nbsp;
                                        <Input 
                                            style={{width: 160}} 
                                            placeholder="???????????????????????????????????????"
                                            onChange={getTel}
                                            value={tel}

                                        /> &nbsp; 
                                        ????????????????????? : &nbsp;
                                            <Select
                                                style={{
                                                    fontFamily: 'Prompt'
                                                }}
                                                showSearch
                                                size="large"
                                                placeholder="????????????????????????????????????"
                                                optionFilterProp="children"
                                                onChange={onChangeSelect}
                                                options={province}
                                                defaultValue={'???????????????????????????????????????'}
                                            />

                                    </p>
                                    <p>???????????????????????? : {cost} ?????????</p>
                                    {value === '' ? <p>????????????????????????????????? 0 ?????????</p>
                                        : <p>????????????????????????????????? {Totals} ?????????</p>
                                    }
                                    <div className="boxBtnBuy">
                                        <button 
                                            disabled={
                                                value > 30 || 
                                                value === '' ||  
                                                name === '' ||  
                                                address === '' ||  
                                                tel === '' || 
                                                provin === '' } className="btnBuy" onClick={submit}> ??????????????????????????????</button>
                                    </div>

                                </div >
                                
                            </Grid>
                        </Grid>

                    </Box>
                </div>
            </div>

        </div>
    )

}
export default Model;