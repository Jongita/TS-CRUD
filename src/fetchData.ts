export const fetchRegistrations=(path:string, method:string, data:any)=>{
    let options:any={
        method:method,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    };
    
    if (data!==null) {
        options.body=JSON.stringify(data);
        //options={body:JSON.stringify(data), ...options};
    }
    return fetch(`https://registracija-fa201-default-rtdb.europe-west1.firebasedatabase.app/${path}.json`,options);
}