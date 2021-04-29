import React , {useEffect, useState} from "react"
import { 
  Row,
  Col,
  Card, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  Button,
  Modal,
  ModalFooter
} from "reactstrap"
import { Link } from "react-router-dom"

import { API } from '../../configAPI'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import Moment from 'moment'
//get api
import {getAllOrder,
  readOrderById,
  Addtestreport} from './api'
import { map, result } from "lodash";
import { orders } from "common/data";
import { isAuthenticated } from '../Authentication/api'

//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

const ModalTestReport = props => {

    const {isOpenTR, toggleTR, orders , spc, tr, bio} = props
    const {user, token} = isAuthenticated()
    const [modal, setModal] = useState(false);
    const [detailById, setdetailById] = useState([{
        idOrderTested:"",
        BBE:"",
        PORD:"",
        ProductName:"",
        name:"",
        Size:"",
        Quantity:""
      }])
    // const toggle = () => setModal(!modal);
    
    const [resultChem , setresultChem] = useState(
      [
        { keyInput:"Tn"        ,int:false , key: "TN(g/L)", coa: false , val:null , temp:false },
        { keyInput:"Salt"      ,int:false , key: "%Salt(w/v)", coa: false , val:null , temp:false},
        { keyInput:"Histamine" ,int:false , key: "Histamine(ppm)", coa: false ,  val:null  , temp:false},
        { keyInput:"PH"        ,int:false , key: "PH", coa: false ,  val:null , temp:true},
        { keyInput:"Aw"        ,int:false , key: "Aw", coa: false ,  val:null   , temp:true},
        { keyInput:"Tss"       ,int:false , key: "Tss(Brix)", coa: false ,  val:null  , temp:true},
        { keyInput:"SPG"       ,int:false , key: "SPG", coa: false ,  val:null   , temp:true }
      ]
    ) 
    const [resultMicro , setresultMicro] = useState([
        { int: false, coa: false, val: "", key: 'APC' },
        { int: false, coa: false, val: "", key: 'Yeasts & Molds' },
        { int: false, coa: false, val: "", key: 'E. coil' },
        { int: false, coa: false, val: "", key: 'Coliform' },
        { int: false, coa: false, val: "", key: 'S. aureus' }
      ]) 

    const [values, setValues] = useState({
      // idOrders      :detailById.idOrderTested,
      // PORD          :detailById.PORD,
      // BBE           :detailById.BBE,
      // PO            :detailById.PO,
      // ProductName   :detailById.ProductName,
      // Recheck       :detailById.Recheck,
      // Size          :detailById.Size,
      // Quantity      :detailById.Quantity,
      // idSpfChem     :detailById.idPdSpecificChem,
      // Tn            :null,
      // PH            :null,
      // Salt          :null,
      // Tss           :null,
      // Histamine     :null,
      // SPG           :null,
      // Aw            :null,
      // idSpfMicro    :1,
      // APC           :null,
      // Yeasts        :null,
      // EColi         :null,
      // Coliform      :null,
      // Saureus       :null,
      // tempPH        :null,
      // tempAW        :null,
      // tempTSS       :null,
      // tempSPG       :null
      })

      const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        // console.log(values)
      }

      const handleTest = event => {
        event.preventDefault()
        console.log('values test : ' , values)
        var index = 
        {
          idOrders: values.idOrders,
          Recheck: parseInt(values.Recheck),
          idSpfChem: parseInt(values.idSpfChem) ,
          Tn: values.Tn ,
          PH: values.PH ,
          Salt: values.Salt ,
          Tss: values.Tss ,
          Histamine: values.Histamine ,
          SPG: values.SPG ,
          Aw: values.Aw ,
          idSpfMicro: parseInt(values.idSpfMicro)  ,
          APC: values.APC ,
          Yeasts: values.Yeasts ,
          EColi: values.EColi ,
          Coliform: values.Coliform ,
          Saureus: values.Saureus ,
          tempPH: values.tempPH ,
          tempAW: values.tempAW ,
          tempTSS: values.tempTSS  ,
          tempSPG: values.tempSPG 
        }
        Addtestreport(token, index).then(data => {
          if(data){
            console.log('test data : ', data)
          }
        })
        
      }
      useEffect(() => {
        // setTRLasted(tr)
        setdetailById(orders)
        console.log('order : ', orders)
    },[orders,bio,tr]) 

    useEffect(() => {

        if(tr[0] != undefined){
          console.log('tr[0] : ',tr[0])
            setresultChem(tr[0])
            setresultMicro(tr[1])
            setValues({
              idOrders      :detailById.idOrders,
              PORD          :detailById.PORD,
              BBE           :detailById.BBE,
              PO            :detailById.PO,
              ProductName   :detailById.ProductName,
              Recheck       :detailById.Recheck,
              Size          :detailById.Size,
              Quantity      :detailById.Quantity,
              idSpfChem     :detailById.idPdSpecificChem,
              Tn            :tr[0][0].val,
              PH            :tr[0][3].val,
              Salt          :tr[0][1].val,
              Tss           :tr[0][5].val,
              Histamine     :tr[0][2].val,
              SPG           :tr[0][6].val,
              Aw            :tr[0][4].val,
              idSpfMicro    :1,
              APC           :tr[1][0].val,
              Yeasts        :tr[1][1].val,
              EColi         :tr[1][2].val,
              Coliform      :tr[1][3].val,
              Saureus       :tr[1][4].val,
              tempPH        :tr[0][3].temp,
              tempAW        :tr[0][4].temp,
              tempTSS       :tr[0][5].temp,
              tempSPG       :tr[0][6].temp
              })
        }else{
            setresultChem([
                { keyInput:"Tn"        ,int:false , key: "TN(g/L)", coa: false , val:"" , temp:false },
                { keyInput:"Salt"      ,int:false , key: "%Salt(w/v)", coa: false , val:"" , temp:false},
                { keyInput:"Histamine" ,int:false , key: "Histamine(ppm)", coa: false ,  val:""  , temp:false},
                { keyInput:"PH"        ,int:false , key: "PH", coa: false ,  val:"" , temp:true},
                { keyInput:"Aw"        ,int:false , key: "Aw", coa: false ,  val:""   , temp:true},
                { keyInput:"Tss"       ,int:false , key: "Tss(Brix)", coa: false ,  val:""  , temp:true},
                { keyInput:"SPG"       ,int:false , key: "SPG", coa: false ,  val:""   , temp:true }
              ])
              setresultMicro([
                { int: false, coa: false, val: "", key: 'APC' },
                { int: false, coa: false, val: "", key: 'Yeasts & Molds' },
                { int: false, coa: false, val: "", key: 'E. coil' },
                { int: false, coa: false, val: "", key: 'Coliform' },
                { int: false, coa: false, val: "", key: 'S. aureus' }
              ])
              setValues({
                idOrders      :detailById.idOrders,
                PORD          :detailById.PORD,
                BBE           :detailById.BBE,
                PO            :detailById.PO,
                ProductName   :detailById.ProductName,
                Recheck       :detailById.Recheck,
                Size          :detailById.Size,
                Quantity      :detailById.Quantity,
                idSpfChem     :detailById.idPdSpecificChem,
                Tn            :null,
                PH            :null,
                Salt          :null,
                Tss           :null,
                Histamine     :null,
                SPG           :null,
                Aw            :null,
                idSpfMicro    :1,
                APC           :null,
                Yeasts        :null,
                EColi         :null,
                Coliform      :null,
                Saureus       :null,
                tempPH        :null,
                tempAW        :null,
                tempTSS       :null,
                tempSPG       :null,
                })
        }
    }, [tr])

    

    return(
                    <Modal
                      isOpen={isOpenTR}
                      toggle={toggleTR}
                      centered={true}
                      // dialogClassName="modal-90w"
                      size="xl"
                    >
                      <div className="modal-header">
                        <h3 className="modal-title mt-0">Order Test Result : {detailById.PO}
                        </h3>
                        <button
                          type="button"
                          onClick={toggleTR}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">

                          {/* Header TestResult */}

                          {/* idOrderTested:orders.idOrders,
          BBE:orders.BBE,
          PORD:orders.PORD,
          PO:orders.PO,
          ProductName:orders.ProductName,
          Size:orders.Size,
          Quantity:orders.Quantity */}
                        <Row>
                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                            <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>LOT</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>PORD: {Moment(detailById.PORD).format('DD/MM/YYYY')}<br/>BBE    : {Moment(detailById.PORD).format('DD/MM/YYYY')}</span>
                              </div>
                            </div>
                          </Col>
                
                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Order Numder</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.PO}</span>
                              </div>
                            </div>
                          </Col>

                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Product Name</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.ProductName}</span>
                              </div>
                            </div>
                          </Col>

                          <Col md="6" xs="12"  style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Pack Size</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.Size}</span>
                              </div>
                            </div>
                          </Col>

                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Quantity</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.Quantity}</span>
                              </div>
                            </div>
                          </Col>
                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                          <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>Specific</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>{detailById.name}</span>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <hr/>
                        {/* Chemical analysis */}
                        <Row>
                            <Col xs="12" style={{border:'solid 1px #989a9b', borderRadius:'10px',
                                height:'100%', background:'transparent', display:'flex', flexDirection:'column',
                                justifyContent:'center', alignItems:'center',padding:'10px'
                            }}>
                                <h5 style={{borderBottom:'solid 1px #989a9b'}}>Chemical analysis</h5>
                                <Row style={{display:'flex', width:'100%'}}>
                                    <Col xs="3">
                                <div>
                                    <Col xs="12">
                                    <h6>{" "}</h6>
                                    </Col>
                                    
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>Result</h6>
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>Temp C &deg; </h6>
                                </div>
                                </Col>
                                <Col xs="3" style={{display:'flex'}}>
                                <Col xs="6">
                                    <h6>Int. spec</h6>
                                </Col>
            
                                <Col xs="6">
                                    <h6>COA spec</h6>
                                </Col>
                                </Col>
                                </Row>

                              

                                {resultChem.map((index, key) => (
                                        
                                <Row style={{display:'flex', width:'100%', alignItems:'center'}}>
                                    <Col xs="3">
                                <div>
                                    <Col xs="12" style={{display:'flex', justifyContent:'flex-start', paddingLeft:'30%'}}>
                                    <h6 style={{margin:'0'}}>{index.key}</h6>
                                    </Col>
                                </div>
                                </Col>
                                <Col xs="3">
                                <Row  className="mb-1">
                                        <div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="number"
                                            name={index.keyInput}
                                            onChange={handleChange(`${index.keyInput}`)}
                                            // value={index.val}
                                            placeholder={index.val}
                                          />
                                        </div>
                                </Row>
                                
                                </Col>
                                <Col xs="3">
                                  {index.temp ? (
                                    // <div>
                                    // <h6>{index.temp}</h6>
                                    // </div>
                                    <Row  className="mb-1">
                                    <div className="col-md-10">
                                      <input
                                        className="form-control"
                                        type="number"
                                        name={index.keyTemp}
                                        onChange={handleChange(`${index.keyTemp}`)}
                                        // value={index.temp}
                                        placeholder={index.temp}
                                      />
                                    </div>
                            </Row>
                                  ) : (
                                    null
                                  )}
                                
                                </Col>
                                <Col xs="3" style={{display:'flex'}}>
                                <Col xs="6">
                                    {index.int ? (
                                        <div className="badge bg-success font-size-13">
                                            <span>PASS</span>
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger font-size-13">
                                        <span>FAIL</span>
                                        </div>
                                    )}
                                </Col>
            
                                <Col xs="6">
                                {index.coa ? (
                                        <div className="badge bg-success font-size-13">
                                            <span>PASS</span>
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger font-size-13">
                                        <span>FAIL</span>
                                        </div>
                                    )}
                                </Col>
                                </Col>
                                </Row>
                                    ))}

                            </Col>
                        </Row>
                        <br/>

                        {/* Microbiological analysis */}
                        <Row>
                            <Col xs="12" style={{border:'solid 1px #989a9b', borderRadius:'10px',
                                height:'100%', background:'transparent', display:'flex', flexDirection:'column',
                                justifyContent:'center', alignItems:'center',padding:'10px'
                            }}>
                                <h5 style={{borderBottom:'solid 1px #989a9b'}}>Microbiological analysis</h5>
                                <Row style={{display:'flex', width:'100%'}}>
                                    <Col xs="3">
                                <div>
                                    <Col xs="12">
                                    <h6>{" "}</h6>
                                    </Col>
                                    
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>Result</h6>
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>Temp C &deg; </h6>
                                </div>
                                </Col>
                                <Col xs="3" style={{display:'flex'}}>
                                <Col xs="6">
                                    <h6>Int. spec</h6>
                                </Col>
            
                                <Col xs="6">
                                    <h6>COA spec</h6>
                                </Col>
                                </Col>
                                </Row>

                                {resultMicro.map((index, key) => (
                                        // <div>{JSON.stringify(index)}</div>
                                <Row style={{display:'flex', width:'100%'}}>
                                    <Col xs="3">
                                <div>
                                    <Col xs="12" style={{display:'flex', justifyContent:'flex-start', paddingLeft:'30%'}}>
                                    <h6>{index.key}</h6>
                                    {/* <div>{JSON.stringify(index)}</div> */}
                                    </Col>
                                </div>
                                </Col>
                                <Col xs="3">
                                <Row  className="mb-1">
                                        <div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="number"
                                            name={index.keyInput}
                                            onChange={handleChange(`${index.keyInput}`)}
                                            // value={index.val}
                                            placeholder={index.val}
                                          />
                                        </div>
                                </Row>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>{" "}</h6>
                                </div>
                                </Col>
                                <Col xs="3" style={{display:'flex'}}>
                                <Col xs="6">
                                    {index.int ? (
                                        <div className="badge bg-success font-size-13">
                                            <span>PASS</span>
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger font-size-13">
                                        <span>FAIL</span>
                                        </div>
                                    )}
                                </Col>
            
                                <Col xs="6">
                                {index.coa ? (
                                        <div className="badge bg-success font-size-13">
                                            <span>PASS</span>
                                        </div>
                                    ) : (
                                        <div className="badge bg-danger font-size-13">
                                        <span>FAIL</span>
                                        </div>
                                    )}
                                </Col>
                                </Col>
                                </Row>
                                    ))}
                            </Col>
                        </Row>
                        
                      
                      </div>
                      <ModalFooter>
                          <Button color="primary" onClick={(event) => {
                            // toggleTR()
                            handleTest(event)
                          }}>TEST</Button>{' '}
                          <Button color="secondary" onClick={toggleTR}>Cancel</Button>
                        </ModalFooter>
                    </Modal>   
    )
}

ModalTestReport.propTypes = {
    orders: PropTypes.array,
    spc: PropTypes.array,
    tr: PropTypes.array,
    bio: PropTypes.array
  }
  
  const mapStateToProps = state => ({
    orders: state.DetailOrder.Detail,
    spc: state.DetailOrder.SpecificChem,
    tr: state.DetailOrder.TestResultLasted,
    bio:  state.DetailOrder.SpecificBio,
  })

  export default connect(mapStateToProps)(withRouter(ModalTestReport))