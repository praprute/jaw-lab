import React , {useEffect, useState} from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import ModalDetail from './ModalDetail'

//get api
import {getRecheckOrder,readOrderById,readTestResultlasted} from './api'
import { isAuthenticated } from './../Authentication/api'
import { map } from "lodash";

//store
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {AddProductDetail, AddSpecificDetail, AddTestResultlasted, AddSpecificBioDetail} from 'store/actions'

const OrderTableRecheck = props => {

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
  ],)
  const [dataMerchRecheck, setDataMerchRecheck] = useState({})
  const [detail, setdetail] = useState({})
  const [TRLasted ,setTRLasted] = useState({})

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

  useEffect(() => {
    getRecheckOrder(token).then(data => {
      if(data == undefined){
        setDataMerchRecheck({
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
                detail:  <span onClick={()=>{
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
                </span> 
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
            
        console.log(index)
        setDataMerchRecheck({
            columns: columnTable,
              rows:map(index, order=>({...order, priority:statePriority[order.priority] ,status:status[order.status]})) 
          })
        }else{
          setDataMerchRecheck({
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
          <Row>
            <MDBDataTable responsive striped bordered  data={dataMerchRecheck} />
            {ModalDe}
          </Row>
    </React.Fragment>
  )
}

OrderTableRecheck.propTypes = {
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
)(withRouter(OrderTableRecheck))