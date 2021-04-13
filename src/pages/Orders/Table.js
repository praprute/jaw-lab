import React , {useEffect, useState} from "react"
import { MDBDataTable } from "mdbreact"
import {
  Col,
  Row,
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap"

//Import Breadcrumb
import "../Tables/datatables.scss"
import ModalDetail from './ModalDetail'
import ModalAddOrder from './ModalAddOrder'

//get api
import {getAllOrder,
  readOrderById,
  readTestResultlasted,} from './api'
import { map } from "lodash";
import { orders } from "common/data";
import { isAuthenticated } from './../Authentication/api'

//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {AddProductDetail, AddSpecificDetail, AddTestResultlasted, AddSpecificBioDetail} from 'store/actions'

const OrderTable = props => {

  const {user, token} = isAuthenticated()
  const { orders , spc, onAddDetail, onAddSpcChem ,onAddTestResult,onAddSpcBio} = props
  const [columnTable, setColumnTable] = useState([
    {
      label: "Lot",
      field: "lot",
      sort: "asc",
      // width: 150,
    },
    {
      label: "PO Number",
      field: "ponumber",
      sort: "asc",
      // width: 150,
    },
    {
      label: "Product Name",
      field: "name",
      sort: "asc",
      // width: 100,
    },
    {
        label: "Specific",
        field: "Specific",
        sort: "asc",
        // width: 100,
      },
    {
        label: "Status",
        field: "status",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Priority",
        field: "priority",
        sort: "asc",
        // width: 200,
      },
    {
      label: "Recheck",
      field: "Recheck",
      sort: "asc",
      // width: 170,
    },
    {
        label: "Timestamp",
        field: "timeStamp",
        sort: "asc",
        // width: 100,
      },
    {
      label: "Detail",
      field: "detail",
      sort: "asc",
      // width: 100,
    },
    {
      label: "Action",
      field: "action",
      sort: "asc",
      // width: 100,
    },
  ],)
  const [dataMerch, setDataMerch] = useState({})
  const [detail, setdetail] = useState({})
  const [TRLasted ,setTRLasted] = useState({})
  const [info_dropup111, setInfo_dropup111] = useState(false)
  const fetchDetail = (token, idOrders) => {
      readOrderById(token, idOrders).then(data => {
      if(data){
        if(data.success == 'success'){
          setdetail(data.message[0])
          onAddDetail(data.message[0])
        }
      }else{
        return null
      }
    })
  }

  // const fetchSpcBio = (token, idPdSpecificMicro) => {
  //   readAllSpecificBioById(token, idPdSpecificMicro).then(data => {
  //     if(data){
  //       if(data.success == "success"){
  //         setdetailSpcBio(data.message[0])
  //         onAddSpcBio(data.message[0])
  //       }
  //     }else{
  //       return null
  //     }
  //   })
  // }

  const fetchTestResultlasted = (token, idOrders) => {
    readTestResultlasted(token, idOrders).then(data => {
      console.log(' readTestResultlasted :',data)
      if(data){
        if(data.success == 'success'){
          if(!data.message){
            setTRLasted({})
            onAddTestResult({})
          }else{
            setTRLasted(data.resulted)
            onAddTestResult(data.resulted)
          }
        }else{
          setTRLasted({})
          onAddTestResult({})
        }
      }else{
        return null
      }
    })
  }

  const ModalDe = <ModalDetail />
  const Modaladdorder = <ModalAddOrder/>

  useEffect(() => {
    // console.log('spc: ' ,spc)
      getAllOrder(token).then(data => {
        console.log('getAllOrder: ' ,data) 
        if(data == undefined){
          setDataMerch({
            columns: columnTable,
            rows: [{
                lot:"SERVER HAVE !PROBLEM."
            }]
          })
        }else{
          if(data.success == "success"){
          var index = []
          for(let i = 0 ; i < data.message.length ; i++){
            const rd = {
                lot: <span>PORD: {data.message[i].BBE}<br/>BBE: {data.message[i].PORD}</span>,
                ponumber: data.message[i].PO,
                name:    data.message[i].ProductName,
                Specific: data.message[i].name,
                priority: data.message[i].Priority,
                status: data.message[i].Status,
                Recheck: data.message[i].Recheck,
                timeStamp:data.message[i].timestamp,
                detail: <span style={{display:'flex', justifyContent: 'center'}} onClick={()=>{
                  fetchDetail(token ,data.message[i].idOrders)
                  fetchTestResultlasted(token ,data.message[i].idOrders)
                }
                }>
                     <i
                     className={
                       "bx bx-cog font-size-24"
                     }
                     style={{cursor:'pointer'}}
                     onClick={
                       props.toggle
                  }
                    ></i>
                </span> ,
                action: <div style={{display:'flex', justifyContent: 'center'}}>
                  <span onClick={() => {
                    fetchDetail(token ,data.message[i].idOrders)
                  }} >
                    <button style={{margin:'auto'}}
                      type="button"
                      className="btn btn-warning waves-effect waves-light .w-xs"
                      onClick={
                        props.toggleEdit
                      }
                    >
                      <i className="bx bx-pencil font-size-16 align-middle me-2"></i>{" "}
                      Edit
                    </button>
                  </span>
                  
                    <button style={{margin:'auto'}}
                      type="button"
                      className="btn btn-danger waves-effect waves-light .w-xs"
                    >
                      <i className="bx bx-trash-alt align-middle me-2"></i>{" "}
                      Delete
                    </button>
                </div>
            }
            index.push(rd)
        }
            const status = {
                1: (
                  <span className="badge bg-success font-size-10">Completed</span>
                ),
                0: <span className="badge bg-warning font-size-10">Waiting to check</span>,
                2: <span className="badge bg-danger font-size-10">Rechecking</span>,
              }
            
            const statePriority = {
                0: <span className="badge bg-success font-size-10">normal</span>,
                1: <span className="badge bg-warning font-size-10">rush</span>,
                2: <span className="badge bg-danger font-size-10">urgent</span>,
                }
            
        setDataMerch({
            columns: columnTable,
            rows:map(index, order=>({...order, priority:statePriority[order.priority] ,status:status[order.status]})) 
          })
        }else{
            setDataMerch({
                columns: columnTable,
                rows: [{
                    lot:"NULL"
                }]
              })
        } 
        }
        
    })
  }, [])

  return (
    <React.Fragment>
          <MDBDataTable responsive  bordered  data={dataMerch} />
          {/* <Dropdown
                          isOpen={info_dropup111}
                          direction="left"
                          toggle={() => setInfo_dropup111(!info_dropup111)}
                        >
                <DropdownToggle className="btn btn-info">
                  <i className="mdi mdi-chevron-left" /> Dropleft
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
    </React.Fragment>
  )
}

OrderTable.propTypes = {
  orders: PropTypes.array,
  spc: PropTypes.array,
  onAddDetail: PropTypes.func,
  onAddSpcChem: PropTypes.func,
  onAddSpcBio: PropTypes.func,
  onAddTestResult: PropTypes.func,
}

const mapStateToProps = state => ({
  orders: state.DetailOrder.Detail,
  spc: state.DetailOrder.SpecificChem,
})

const mapDispatchToProps = dispatch => ({
  onAddDetail: (detail) => dispatch(AddProductDetail(detail)),
  onAddSpcChem: (detailSpcChem) => dispatch(AddSpecificDetail(detailSpcChem)),
  onAddTestResult: (detailSpcChem) => dispatch(AddTestResultlasted(detailSpcChem)),
  onAddSpcBio: (detailSpcChem) => dispatch(AddSpecificBioDetail(detailSpcChem)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderTable))