import React from "react";
import './model.css'
import Box from '@mui/material/Box';

function Condition({show, setShow}) {

    

    const submit = () => {
        
        
        setShow();
        
    }
    localStorage.setItem("condition", show)
    

    return (
        show && <div className="overlay">
        <div className="model">
            <div className="modal-con">
                <Box>
                    <div className="divCon">
                        <image src='/logo.png' style={{height: '80px'}}/>
                        <p className="pCon">รับทราบข้อกําหนดเงื่อนไข</p>
                    </div>
                    <div className="divDesc">
                        <p> &nbsp; &nbsp; &nbsp; &nbsp;    ฟิงเกอร์เทรด เป็นแพลตฟอร์มค้าส่งสินค้าเกษตรออนไลน์
                            โดยเมื่อลูกค้าสั่งซื้อเข้ามา แพลตฟอร์มจะรับเงินส่วนนั้นไว้ก่อน และจะโอนให้ผู้ขายเมื่อสินค้าถึงจุดหมายปลายทาง
                            เพื่อป้องกันปัญหาลูกค้าจ่ายเงินแล้วไม่ได้รับสินค้า หรือได้รับของที่ไม่ตรงปก </p>
                        <p>&nbsp; &nbsp; &nbsp; &nbsp;ด้านการขนส่งสินค้าทางเราบริการรับสินค้าหน้าสวนผ่านบริษัทขนส่ง Flash จากฟาร์มส่งตรงถึงลูกค้า ค่าจัดส่งคิดตามน้ําหนัก 
                            โดยผู้ซื้อและผู้ขายเป็นผู้ออกค่าขนส่งฝ่ายละครึ่ง ซึ่งจะจัดส่งถึงปลายทางภายใน 1-3 วัน</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '65px'
                    }}>
                        <button className="btnBuy" onClick={submit}>ยิมรับเงื่อนไข</button>
                    </div>
                </Box>
            </div>
        </div>

    </div>
    )
}

export default Condition;