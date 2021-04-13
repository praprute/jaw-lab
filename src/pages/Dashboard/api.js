const API = "http://localhost:3031/api"

export const getRealTimeOrder = (token) => {
    return fetch(`${API}/readRealTimeOrder`, {
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