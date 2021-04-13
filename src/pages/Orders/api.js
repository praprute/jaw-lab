// import { API } from './../../configAPI'
const API = "http://localhost:3031/api"

export const getAllOrder = (token) => {
    return fetch(`${API}/readAllOrder`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        //   body : JSON.stringify({id : farmer})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };

export const getRecheckOrder = (token) => {
    return fetch(`http://localhost:3031/api/readRecheckOrder`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        //   body : JSON.stringify({id : farmer})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  }

export const readOrderById = (token,idOrders) => {
      
      var id = {
          idOrders:idOrders
      }
    //   console.log(id)
    
    return fetch(`${API}/readOrderById`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body : JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };

export const readAllSpecificChemById = (token,idPdSpecificChem) => {
    
    var id = {
        idPdSpecificChem:idPdSpecificChem
    }

    return fetch(`${API}/readAllSpecificChemById`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body : JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  }

export const readAllSpecificBioById = (token,idPdSpecificMicro) => {
    
    var id = {
        idPdSpecificMicro:idPdSpecificMicro
    }

    return fetch(`${API}/readAllSpecificBioById`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body : JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  }

export const readTestResultlasted = (token,idOrders) => {
      
    var id = {
        idOrders:idOrders
    }
  //   console.log(id)
  
  return fetch(`${API}/readTestReportlasted`, {
      method: "POST",
      headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
          Authorization:`Bearer ${token}`
        },
        body : JSON.stringify(id)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const readIdChemCheckbox = (token) => {
    return fetch(`${API}/readIdChemCheckbox`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        //   body : JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const readIdMicroCheckbox = (token) => {
    return fetch(`${API}/readIdMicroCheckbox`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        //   body : JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const addOrder = (token, index) => {
    return fetch(`${API}/addOrder`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body : JSON.stringify(index)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
// const fetchDetail = (token, idOrders) => {
  //   readTestResultlasted(token, idOrders).then(data => {
  //     console.log(' readTestResultlasted :',data)
  //     if(data){
  //       if(data.success == 'success'){
  //         if(!data.message){
  //           return null
  //         }else{
  //           setdetail(data.message)
  //           onAddDetail(data.message)
  //         }
  //       }
  //     }else{
  //       return null
  //     }
  //   })
  // }