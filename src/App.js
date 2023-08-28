import logo from './logo.svg';
import { Row, Col, Input, Select, Card, Tabs, InputNumber, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons'
import FormItemLabel from "antd/es/form/FormItemLabel";
import MUIDataTable from 'mui-datatables';
import moment from 'moment'
import './App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useState } from 'react';
import { toast } from 'react-toastify';

const columnsx = ["adi", "soyadi", { name: "cinsiyet", options: { customBodyRender: (value) => value === "1" ? "Kadın" : "Erkek" } }, "yasi"];

const initialFormValues = {
    adi: '',
    soyadi: '',
    cinsiyet: '',
    yasi: ''
}


const kayitSchema = Yup.object().shape({
    adi: Yup.string()
        .required('Bu alan zorunludur.'),
    soyadi: Yup.string()
        .required('Bu alan zorunludur.'),
});



function App() {
    const [data, setData] = useState([])
    const [isDoktorNoteOpened, setIsDoktorNoteOpened] = useState(false)
    const [isHastaListesiOpened, setIsHastaListesiOpened] = useState(false)


    const formik = useFormik({
        initialValues: initialFormValues,
        onSubmit: values => {
            toast('Başarıyla Kaydedildi')
            setData([values, ...data])
        },
        validationSchema: kayitSchema
    })

    const labelWidth = 4;
    const items = [
        {
            key: '1',
            label: `Şikayet`,
            children: [
                <Input type={<textarea name="" id="" cols="30" rows="10"></textarea>} style={{ height: 200 }} ></Input>
            ],
        },
        {
            key: '2',
            label: `Hikaye`,
            children: [
                <Input type={<textarea name="" id="" cols="30" rows="10"></textarea>} style={{ height: 200 }} ></Input>
            ],
        },
        {
            key: '3',
            label: `Özgeçmiş`,
            children: [
                <Input type={<textarea name="" id="" cols="30" rows="10"></textarea>} style={{ height: 200 }} ></Input>
            ],
        },
    ];
    return (
        <>

            <Row>
                <Col xs={12} sm={12}>
                    <form onSubmit={formik.handleSubmit}>
                        <Card title="Kayıt Bilgileri" bordered={true} headStyle={{ color: "red" }}>
                            <Row gutter={[4, 4]} style={{ paddingTop: 4 }}>
                                <Col sm={labelWidth} xs={labelWidth}>
                                    <FormItemLabel label={"Adı"}></FormItemLabel>
                                </Col>
                                <Col sm={20} xs={20}>
                                    <Input size="small" status={formik.errors.adi && "error"} name="adi" placeholder="Hasta Adı" onChange={formik.handleChange}
                                        value={formik.values.adi} />
                                    {formik.errors.adi}
                                </Col>
                            </Row>

                            <Row gutter={[4, 4]} style={{ paddingTop: 4 }}>
                                <Col sm={labelWidth} xs={labelWidth}>
                                    <FormItemLabel label={"Soyadı"}></FormItemLabel>
                                </Col>
                                <Col sm={20} xs={20}>
                                    <Input size="small" status={formik.errors.soyadi && "error"} name="soyadi" placeholder="Hasta Soyadı" onChange={formik.handleChange}
                                        value={formik.values.soyadi} />
                                    {formik.errors.soyadi}
                                </Col>
                            </Row>

                            <Row gutter={[4, 4]} style={{ paddingTop: 4 }}>
                                <Col sm={labelWidth} xs={labelWidth}>
                                    <FormItemLabel label={"Cinsiyet"}></FormItemLabel>
                                </Col>
                                <Col sm={20} xs={20}>
                                    <Select
                                        style={{ width: "100%" }}
                                        options={[
                                            { value: '1', label: 'Kadın' },
                                            { value: '2', label: 'Erkek' },
                                        ]}
                                        name="cinsiyet"
                                        value={formik.values.cinsiyet}
                                        onChange={(value) => formik.setFieldValue('cinsiyet', value)}
                                        onBlur={formik.handleBlur}
                                        onSelect={formik.handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row gutter={[4, 4]} style={{ paddingTop: 4 }}>
                                <Col sm={labelWidth} xs={labelWidth}>
                                    <FormItemLabel label={"Doğum Tarihi"}></FormItemLabel>
                                </Col>
                                <Col sm={20} xs={20}>
                                <InputNumber min={5} max={100} value={formik.values.yasi} onChange={(event)=>{
                                            formik.setFieldValue('yasi', event)
                                        }} />
                                </Col>

                            </Row>
                            <Row gutter={[2, 2]} style={{ paddingTop: 4 }}>
                                <Col sm={24} xs={24} style={{textAlign:'end'}}>
                                    <Button icon={<PoweroffOutlined />} type="primary" htmlType='submit' onClick={() => {
                                if (!isDoktorNoteOpened) {
                                    setIsHastaListesiOpened(false)
                                }
                                setIsHastaListesiOpened(!isDoktorNoteOpened)

                            }}>
                                Kaydet
                            </Button>
                            <Button onClick={() => {
                                        toast.warn('Vazgeçildi')
                                        formik.resetForm()
                                    }} style={{ marginLeft: 4 }} icon={<PoweroffOutlined />} type="default" danger>
                                        Vazgeç
                                    </Button>
                                </Col>
  
                            </Row>
                            <Button style={{ marginTop: '10px' }} type="default" danger onClick={() => {
                                if (!isDoktorNoteOpened) {
                                    setIsHastaListesiOpened(false)
                                }
                                setIsDoktorNoteOpened(!isDoktorNoteOpened)

                            }}>
                                Doktor Notları
                            </Button>
                            <Button style={{ marginTop: '10px', marginLeft: '10px' }} type="default" danger onClick={() => {
                                if (!isHastaListesiOpened) {
                                    setIsDoktorNoteOpened(false)
                                }
                                setIsHastaListesiOpened(!isHastaListesiOpened)

                            }}>
                                Hasta Listesi
                            </Button>
                        </Card>
                    </form>
                </Col>
        
                {isDoktorNoteOpened && <Col sm={24} xs={24}>
                    <Card title="Doktor Notları" bordered={true} headStyle={{ color: "red" }}>
                        <Tabs defaultActiveKey="1" items={items} />
                    </Card>
                </Col>}
                {isHastaListesiOpened && <Col sm={24} xs={24}>
                    <Card title="Hasta Listesi" bordered={true} headStyle={{ color: "red" }}>
                        <MUIDataTable
                            data={data}
                            columns={columnsx}
                        />
                    </Card>
                </Col>}

            </Row>
        </>

    );
}



export default App;
