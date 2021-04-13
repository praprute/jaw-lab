import React, {useState, useEffect} from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
//api
import {getRealTimeOrder} from './api'
import { map } from "lodash";

const LatestTranaction = props => {
  const [transactions,  settransactions ] = useState([
    // {
    //   id: "customCheck2",
    //   orderId: "#SK2540",
    //   billingName: "Neal Matthews",
    //   Date: "07 Oct, 2019",
    //   total: "$400",
    //   badgeClass: "success",
    //   paymentStatus: "Paid",
    //   methodIcon: "fa-cc-mastercard",
    //   paymentMethod: "Mastercard",
    //   link: "#",
    // },
    // {
    //   id: "customCheck3",
    //   orderId: "#SK2541",
    //   billingName: "Jamal Burnett",
    //   Date: "07 Oct, 2019",
    //   total: "$380",
    //   badgeClass: "danger",
    //   paymentStatus: "Chargeback",
    //   methodIcon: "fa-cc-visa",
    //   paymentMethod: "Visa",
    //   link: "#",
    // },
    // {
    //   id: "customCheck4",
    //   orderId: "#SK2542",
    //   billingName: "Juan Mitchell",
    //   Date: "06 Oct, 2019",
    //   total: "$384",
    //   badgeClass: "success",
    //   paymentStatus: "Paid",
    //   methodIcon: "fa-cc-paypal",
    //   paymentMethod: "Paypal",
    //   link: "#",
    // },
    // {
    //   id: "customCheck5",
    //   orderId: "#SK2543",
    //   billingName: "Barry Dick",
    //   Date: "05 Oct, 2019",
    //   total: "$412",
    //   badgeClass: "success",
    //   paymentStatus: "Paid",
    //   methodIcon: "fa-cc-mastercard",
    //   paymentMethod: "Mastercard",
    //   link: "#",
    // },
    // {
    //   id: "customCheck6",
    //   orderId: "#SK2544",
    //   billingName: "Ronald Taylor",
    //   Date: "04 Oct, 2019",
    //   total: "$404",
    //   badgeClass: "warning",
    //   paymentStatus: "Refund",
    //   methodIcon: "fa-cc-visa",
    //   paymentMethod: "Visa",
    //   link: "#",
    // },
    // {
    //   id: "customCheck7",
    //   orderId: "#SK2545",
    //   billingName: "Jacob Hunter",
    //   Date: "04 Oct, 2019",
    //   total: "$392",
    //   badgeClass: "success",
    //   paymentStatus: "Paid",
    //   methodIcon: "fa-cc-paypal",
    //   paymentMethod: "Paypal",
    //   link: "#",
    // },
  ])

  useEffect(() => {
    getRealTimeOrder(props.token).then(response => {
  
      if(response.success == 'success'){
        var index = []
        for(let i = 0 ; i < response.message.length ; i++){
          const rd = {
            BBE:          response.message[i].BBE,
            PORD:         response.message[i].PORD,
            PO:           response.message[i].PO,
            ProductName:  response.message[i].ProductName,
            Status:       response.message[i].Status,
            Priority:     response.message[i].Priority,
            name:         response.message[i].name,
            detail: <span>
                     <i
                     className={
                       "bx bx-cog font-size-24"
                     }
                     style={{cursor:'pointer'}}
                    ></i>
                </span> 
          }
          index.push(rd)
        }
        const setStatus = {
          completed: (
            <span className="badge bg-success font-size-10">Completed</span>
          ),
          Waitingtocheck: <span className="badge bg-warning font-size-10">Waiting to check</span>,
          Rechecking: <span className="badge bg-danger font-size-10">Rechecking</span>,
        }
      
      const statePriority = {
          normal: <span className="badge bg-success font-size-10">normal</span>,
          fast: <span className="badge bg-warning font-size-10">fast</span>,
          very: <span className="badge bg-danger font-size-10">very</span>,
          }
        settransactions(map(index, order=>({...order, Status:setStatus[order.Status], Priority:statePriority[order.Priority]})))
       
      }else{
        // AWMax: 0.85
        // AWMin: 0
        // BBE: "22/02/2020"
        // HistamineMax: 500
        // HistamineMin: 0
        // PHCOAMax: 6
        // PHCOAMin: 5
        // PHControlMax: 6
        // PHControlMin: 5
        // PO: "PO123456"
        // PORD: "22/02/2020"
        // Priority: "normal"
        // ProductName: "ลูกยอด"
        // Quantity: "2088"
        // Recheck: 0
        // SPG: 100
        // SaltCOAMax: 29
        // SaltCOAMin: 23
        // SaltControlMax: 29
        // SaltControlMin: 23
        // Size: "12*199ml"
        // Status: "Waitingtocheck "
        // TSSMax: 100
        // TSSMin: 0
        // TnMain: 20.8
        // TnMax: 100
        // idOrder: 10
        // idOrders: 10
        // idPdSpecificChem: 1
        // idRealTimeOrder: 1
        // idScfChem: 1
        // idScfMicro: 1
        // name: "CN"
        // timestamp:
      }
      
  })
  }, [])

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Latest Transaction</CardTitle>
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  {/* <th style={{ width: "20px" }}>
                    <div className="form-check font-size-16 align-middle">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customCheck1"
                      >
                        &nbsp;
                      </label>
                    </div>
                  </th> */}
                  <th className="align-middle">LOT</th>
                  <th className="align-middle">PO Number</th>
                  <th className="align-middle">Product Name</th>
                  <th className="align-middle">Specific</th>
                  <th className="align-middle">Status</th>
                  <th className="align-middle">Priority</th>
                  {/* <th className="align-middle">Recheck</th> */}
                  
                  <th className="align-middle">Detail</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, key) => (
                  <tr key={"_tr_" + key}>
                    {/* <td>
                      <div className="form-check font-size-16">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={transaction.id}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={transaction.id}
                        >
                          &nbsp;
                        </label>
                      </div>
                    </td> */}
                    <td>
                      <Link to="#" className="text-body fw-bold">
                        {" "}
                        BBE: {transaction.BBE},<br/>
                        PORD: {transaction.PORD}
                      </Link>{" "}
                    </td>
                    <td>{transaction.PO}</td>
                    <td>{transaction.ProductName}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.Status}</td>
                    {/* <td>{() => {
                      if(transaction.Status == 'Waitingtocheck'){
                        return(<span className="badge bg-warning font-size-10">Waiting to check</span>)
                      }
                    }}</td> */}
                    <td>{transaction.Priority}</td>
                    
                    <td>{transaction.detail}</td>
                    {/* <td>
                      <Badge
                        className={
                          "font-size-11 badge-soft-" + transaction.badgeClass
                        }
                        color={transaction.badgeClass}
                        pill
                      >
                        {transaction.Priority}
                      </Badge>
                    </td> */}
                    {/* <td>
                      <i
                        className={"fab " + transaction.methodIcon + " me-1"}
                      ></i>{" "}
                      {transaction.name}
                    </td> */}
                    
                    {/* <td>
                      <Button
                        type="button"
                        color="primary"
                        size="sm"
                        className="btn-rounded waves-effect waves-light"
                      >
                        View Details
                      </Button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default LatestTranaction
