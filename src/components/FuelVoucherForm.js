import React, { useCallback, useEffect, useState } from 'react';
import {
    Form,
    Input,
    Select,
    DatePicker,
    Switch,
    Button,
    Card,
    Row,
    Col,
    Space,
    Checkbox,
} from 'antd';
import "./FuelVoucherForm.css"
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function FuelVoucherForm() {
    const [form] = Form.useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const values = Form.useWatch([], form);
    const [products, setProducts] = useState([
        {
            product: '',
            billoflading: '',
            pickupdate: null,
            grossquantity: '',
            netquantity: '',
            rate: '',
            taxes: '',
            deftaxes: '',
            linetotal: '',
        },
    ]);

    const [charges, setCharges] = useState([
        {
            description: '',
            chartofaccount: '',
            quantity: '',
            chargesrate: '',
            disc: '',
            chargestaxes: '',
            linetotal: '',
        },
    ]);

    const handleAddRow = useCallback(() => {
        setProducts([
            ...products,
            {
                product: '',
                billoflading: '',
                pickupdate: null,
                grossquantity: '',
                netquantity: '',
                rate: '',
                taxes: '',
                deftaxes: '',
                linetotal: '',
            },
        ]);
    }, [products]);

    const handleDeleteRow = useCallback((index) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    }, [products]);

    const handleAddRowChange = useCallback(() => {
        setCharges([
            ...charges,
            {
                description: '',
                chartofaccount: '',
                quantity: '',
                chargesrate: '',
                disc: '',
                chargestaxes: '',
                linetotal: '',
            },
        ]);
    }, [charges]);


    const handleDeleteRowChange = useCallback((index) => {
        const newCharges = [...charges];
        newCharges.splice(index, 1);
        setCharges(newCharges);
    }, [charges]);


    const handleChargeChange = useCallback((index, field, value) => {
        const updatedCharges = [...charges];
        updatedCharges[index][field] = value;
        setCharges(updatedCharges);
    }, [charges]);

    const handleCancel = useCallback(() => {
        form.resetFields();
        setProducts([
            {
                description: '',
                manager: '',
                startDate: '',
                endDate: '',
                status: '',
            },
        ]);
        setCharges([
            {
                description: '',
                chartofaccount: '',
                quantity: '',
                chargesrate: '',
                disc: '',
                chargestaxes: '',
                linetotal: '',
            },
        ]);
    }, [form]);

    const handleApiSubmit = useCallback((value) => {
        alert("Form submitted succesfully")
        console.log(value);
        form?.resetFields()
    }, [form]);


    useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(() => setIsButtonDisabled(true))
            .catch(() => setIsButtonDisabled(false));
    }, [form, values]);

    return (
        <Card title="Create Fuel Voucher" align="start" extra={
            <Space>
                <Button>+</Button>
                <Button>-</Button>
            </Space>}>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    // supplier: "",
                    // terminal: "",
                    // shippedVia: "",
                    // terms: "",
                    paymentOnHold: false,
                    bol: false,
                    // taxState: "",
                    // refNumber: "",
                    // invoiceNumber: "",
                    // invoiceDate: "",
                    // dueDate: null,
                    // discDueDate: null,
                    // postingDate: null
                }}
                onFinish={handleApiSubmit}
            >

                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            label="Supplier"
                            name="supplier"
                            rules={[{ required: true, message: 'Supplier is required!' }]}
                        >
                            <Select placeholder="Select">
                                <Option value="Valero">Valero</Option>
                                <Option value="Citgo">Citgo</Option>
                                <Option value="Marathon">Marathon</Option>
                                <Option value="Shell">Shell</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Shipped from terminal"
                            name="terminal"
                            rules={[{ required: true, message: 'terminal is required!' }]}
                        >
                            <Select placeholder="Select">
                                <Option value="Motiva Enterprises LLC-1">Motiva Enterprises LLC-1</Option>
                                <Option value="Phillips 66 PL - Pasadena">Phillips 66 PL - Pasadena</Option>
                                <Option value="Magellan Pipeline Company  L.P.-6">Magellan Pipeline Company  L.P.-6</Option>
                                <Option value="KM Liquids Terminals  LLC">KM Liquids Terminals  LLC</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Shipped via"
                            name="shippedVia"
                            rules={[{ required: true, message: 'shippedVia is required!' }]}
                        >
                            <Select placeholder="Select">
                                <Option value="TTE Company">TTE Company</Option>
                                <Option value="Always Energy 2">Always Energy 2</Option>
                                <Option value="Sunoco Company">Sunoco Company</Option>
                                <Option value="Campbell Oil">Campbell Oil</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Terms"
                            name="terms"
                            rules={[{ required: true, message: 'terms is required!' }]}
                        >
                            <Select placeholder="Select">
                                <Option value="Net day 1">Net day 1</Option>
                                <Option value="Net day 7">Net day 7</Option>
                                <Option value="Net day 10">Net day 10</Option>
                                <Option value="Net day 15">Net day 15</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            label="Tax state"
                            name="taxState"
                            required
                            rules={[{ required: true, message: 'terminal is required!' }]}
                        >
                            <Select placeholder="Select">
                                <Option value="Pennsylvania[42]">Pennsylvania[42]</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Ref #"
                            name="refNumber"
                        >
                            <Input placeholder="PO number" autoComplete='true' min={0} type='number'/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Invoice number"
                            name="invoiceNumber"
                            rules={[{ required: true, message: 'Invoice number is required!' }]}
                        >
                            <Input placeholder="Invoice number" autoComplete='true' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            label="Invoice date"
                            name="invoiceDate"
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Due date"
                            name="dueDate"
                            rules={[{ required: true, message: 'Due date is required!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Disc due date"
                            name="discDueDate"
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Posting date"
                            name="postingDate"
                            rules={[{ required: true, message: 'Posting date is required!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            label="Payment method"
                            name="paymentMethod"
                        >
                            <Select placeholder="Cheque">
                                <Option value="cheque">Cheque</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Payment on hold"
                            name="paymentOnHold"
                            valuePropName="checked"
                        >
                            <Switch className='on_hold_switch' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Contract number"
                            name="contractNumber"
                        >
                            <Input placeholder="Contract number" autoComplete='true' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Deferred invoice number"
                            name="deferredInvoiceNumber"
                        >
                            <Input placeholder="Deferred invoice number" autoComplete='true' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Deferred tax due date"
                            name="deferredTaxDueDate"
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="mb-6">
                    <div className='product_charges_Section'>
                        <h2 className="text-lg font-semibold mb-2" align="start">Product charges</h2>
                        <div>
                            <Checkbox valuePropName="checked" name='bol' className="mb-4" align="last">
                                Copy BOL and datetime
                            </Checkbox>
                            <Button
                                // type="text"
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAddRow}
                            />
                        </div>
                    </div>

                    {products.map((product, index) => (
                        <Row gutter={[16, 16]} align="middle" key={index}>
                            <Col span={4}>
                                <Form.Item label="Product" name={['products', index, 'product']}>
                                    <Select
                                        
                                        placeholder="Select"
                                        value={product.product}
                                        onChange={(value) => {
                                            const updatedProducts = [...products];
                                            updatedProducts[index].product = value;
                                            setProducts(updatedProducts);
                                        }}
                                    >
                                        <Option value="Product 1">Product 1</Option>
                                        <Option value="Product 2">Product 2</Option>
                                        <Option value="Product 3">Product 3</Option>
                                        <Option value="Product 4">Product 4</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Bill of lading" name={['products', index, 'billoflading']}>
                                    <Input
                                        placeholder="Bill Of Lading"
                                        value={product.billoflading}
                                        autoComplete='true'
                                        onChange={(e) => {
                                            const updatedProducts = [...products];
                                            updatedProducts[index].billoflading = e.target.value;
                                            setProducts(updatedProducts);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Pickup date" name={['products', index, 'pickupdate']}>
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        value={product.pickupdate}
                                        onChange={(date) => {
                                            const updatedProducts = [...products];
                                            updatedProducts[index].pickupdate = date;
                                            setProducts(updatedProducts);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Gross quantity" name={['products', index, 'grossquantity']}>
                                    <Input
                                        type="number"
                                        value={product.grossquantity}
                                        autoComplete='true'
                                        min={0}
                                        onChange={(e) => {
                                            const updatedProducts = [...products];
                                            updatedProducts[index].grossquantity = e.target.value;
                                            setProducts(updatedProducts);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Net quantity" name={['products', index, 'netquantity']}>
                                    <Input
                                        type="number"
                                        value={product.netquantity}
                                        autoComplete='true'
                                        min={0}
                                        onChange={(e) => {
                                            const updatedProducts = [...products];
                                            updatedProducts[index].netquantity = e.target.value;
                                            setProducts(updatedProducts);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Rate" name={['products', index, 'rate']}>
                                    <Input
                                        type="number"
                                        autoComplete='true'
                                        value={product.rate}
                                        min={0}
                                        onChange={(e) => {
                                            const updatedProducts = [...products];
                                            updatedProducts[index].rate = e.target.value;
                                            setProducts(updatedProducts);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Taxes" name={['products', index, 'taxes']}>
                                    <Input type="number" value={product.taxes} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Def taxes" name={['products', index, 'deftaxes']}>
                                    <Input type="number" value={product.deftaxes} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Line total" name={['products', index, 'linetotal']}>
                                    <Input type="number" value={product.linetotal} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    danger
                                    disabled={products?.length < 2}
                                    onClick={() => handleDeleteRow(index)}
                                />
                            </Col>
                        </Row>
                    ))}
                </div>

                <div>
                    <div className='other_charges_section'>
                        <h2 className="text-lg font-semibold mb-2" align="start">Other charges</h2>
                        <Button
                            // type="text"
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={handleAddRowChange}
                        />
                    </div>
                    {charges.map((charge, index) => (
                        <Row gutter={[16, 16]} align="middle" key={index}>
                            <Col span={4}>
                                <Form.Item label="Description" name={['charges', index, 'description']}>
                                    <Input
                                        placeholder="Description"
                                        autoComplete='true'
                                        value={charge.description}
                                        onChange={(e) => handleChargeChange(index, 'description', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Chart of account" name={['charges', index, 'chartofaccount']}>
                                    <Select
                                        placeholder="Select"
                                        value={charge.chartofaccount}
                                        onChange={(value) => handleChargeChange(index, 'chartofaccount', value)}
                                    >
                                        <Option value="Payment Account">Payment Account</Option>
                                        <Option value="Vendor Account">Vendor Account</Option>
                                        <Option value="Sales Account">Sales Account</Option>
                                        <Option value="Purchase Account">Purchase Account</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Quantity" name={['charges', index, 'quantity']}>
                                    <Input
                                        type="number"
                                        value={charge.quantity}
                                        autoComplete='true'
                                        min={0}
                                        onChange={(e) => handleChargeChange(index, 'quantity', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Rate" name={['charges', index, 'chargesrate']}>
                                    <Input
                                        type="number"
                                        value={charge.chargesrate}
                                        autoComplete='true'
                                        min={0}
                                        onChange={(e) => handleChargeChange(index, 'chargesrate', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Disc" name={['charges', index, 'disc']}>
                                    <Input
                                        type="number"
                                        value={charge.disc}
                                        autoComplete='true'
                                        min={0}
                                        onChange={(e) => handleChargeChange(index, 'disc', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Taxes" name={['charges', index, 'chargestaxes']}>
                                    <Input
                                        type="number"
                                        value={charge.chargestaxes}
                                        autoComplete='true'
                                        min={0}
                                        onChange={(e) => handleChargeChange(index, 'chargestaxes', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Line total" name={['charges', index, 'linetotal']}>
                                    <Input
                                        type="number"
                                        value={charge.linetotal}
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    danger
                                    disabled={charges?.length < 2}
                                    onClick={() => handleDeleteRowChange(index)}
                                />
                            </Col>
                        </Row>
                    ))}
                </div>
                <div className='total_section'>
                    <Col span={8} className='total_option'>
                        Sub Total:
                        <Form.Item>
                            <Input
                                type="number"
                                value={0}
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8} className='total_option'>
                        Taxes:
                        <Form.Item>
                            <Input
                                type="number"
                                value={0}
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8} className='total_option'>
                        Total:
                        <Form.Item>
                            <Input
                                type="number"
                                value={0}
                                disabled
                            />
                        </Form.Item>
                    </Col>
                </div>

                <Row justify="end" style={{ marginTop: 24 }}>
                    <Col>
                        <Space>
                            <Button type="primary" htmlType='submit' disabled={!isButtonDisabled}>Save</Button>
                            <Button className='Cancel_btn' onClick={handleCancel}><ArrowLeftOutlined />Cancel</Button>
                        </Space>
                    </Col>
                </Row>

            </Form>
        </Card>
    );
}
