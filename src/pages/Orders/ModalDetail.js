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

import { API } from './../../configAPI'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"

//get api
import {getAllOrder,
  readOrderById} from './api'
import { map, result } from "lodash";
import { orders } from "common/data";
import { isAuthenticated } from './../Authentication/api'

//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

const ModalDetail = props => {

    const { orders , spc, tr, bio} = props
    const { isOpen, toggle } = props
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
            { int:false , key: "TN(g/L)", coa: false , val:""  },
            { int:false , key: "%Salt(w/v)", coa: false , val:"" },
            { int:false , key: "Histamine(ppm)", coa: false ,  val:""  },
            { int:false , key: "PH", coa: false ,  val:"" },
            { int:false , key: "Aw", coa: false ,  val:""  },
            { int:false , key: "Tss(Brix)", coa: false ,  val:"" },
            { int:false , key: "SPG", coa: false ,  val:""   }
          ]
    ) 
    const [resultMicro , setresultMicro] = useState([
        { int: false, coa: false, val: "", key: 'APC' },
        { int: false, coa: false, val: "", key: 'Yeasts & Molds' },
        { int: false, coa: false, val: "", key: 'E. coil' },
        { int: false, coa: false, val: "", key: 'Coliform' },
        { int: false, coa: false, val: "", key: 'S. aureus' }
      ]) 


    useEffect(() => {
        if(tr[0] != undefined){
            setresultChem(tr[0])
            setresultMicro(tr[1])
        }else{
            setresultChem([
                { int:false , key: "TN(g/L)", coa: false , val:""  },
                { int:false , key: "%Salt(w/v)", coa: false , val:"" },
                { int:false , key: "Histamine(ppm)", coa: false ,  val:""  },
                { int:false , key: "PH", coa: false ,  val:"" },
                { int:false , key: "Aw", coa: false ,  val:""  },
                { int:false , key: "Tss(Brix)", coa: false ,  val:"" },
                { int:false , key: "SPG", coa: false ,  val:""   }
              ])
              setresultMicro([
                { int: false, coa: false, val: "", key: 'APC' },
                { int: false, coa: false, val: "", key: 'Yeasts & Molds' },
                { int: false, coa: false, val: "", key: 'E. coil' },
                { int: false, coa: false, val: "", key: 'Coliform' },
                { int: false, coa: false, val: "", key: 'S. aureus' }
              ])
        }
    }, [tr])

    useEffect(() => {
        // setTRLasted(tr)
        setdetailById(orders)
        
    },[orders,bio,tr]) 
    return(
                    <Modal
                      isOpen={isOpen}
                      toggle={toggle}
                      centered={true}
                      size="lg"
                    >
                      <div className="modal-header">
                        <h3 className="modal-title mt-0">Order : {detailById.PO}
                        </h3>
                        <button
                          type="button"
                          onClick={toggle}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">

                          {/* Header TestResult */}
                        <Row>
                          <Col md="6" xs="12" style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                            <div style={{paddingLeft:'10%',paddingRight:'10%'  ,display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                                <h5 style={{margin:'0'}}>LOT</h5>
                              </div>
                              <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                              <span>PORD: {detailById.BBE}<br/>BBE    : {detailById.PORD}</span>
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
                                <div>
                                    <h6>{JSON.stringify(index.val)}</h6>
                                </div>
                                </Col>
                                <Col xs="3">
                                <div>
                                    <h6>{index.temp}</h6>
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
                                <div>
                                    <h6>{JSON.stringify(index.val)}</h6>
                                </div>
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
                          <Button color="primary" onClick={toggle}>EXPORT</Button>{' '}
                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>   
    )
}

ModalDetail.propTypes = {
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

  export default connect(
    mapStateToProps
  )(withRouter(ModalDetail))