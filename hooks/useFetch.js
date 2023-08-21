import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (endpoint,query) =>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
     
    

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
          'X-RapidAPI-Key': '9712cdc7d7msh7a3ece813a3b14cp130984jsn1eeca33a8ee4',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

      const fetchData = async () =>{

        setLoading(true);
        try{
            const response = await axios.request(options)
            setData(response.data.data)
            setLoading(false)
        }catch(e){
          setError(e)
          alert('There is a error',error)
        } finally{
            setLoading(false)
        }
       
      }

      useEffect(()=>{
        fetchData();
      },[])
      
      const refetch = () =>{
        setLoading(true);
        fetchData();
      }
        return {data,loading,error,refetch}
    }

    export default useFetch