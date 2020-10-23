import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Userslist() {

    const[userslist, setuserslist] = useState([])

    useEffect(()=> {
        axios.post('/api/user/getusers').then(
            res=>{
                console.log(res);
                setuserslist(res.data)
            }
        ).catch(err => {
            console.log(err);
        })
    }, [])

    const usersdata = userslist.map((obj) => {
        return <tr>
            <td>{obj.name}</td>
            <td>{obj.username}</td>
            <td>{obj.password}</td>
        </tr>
    })

    return (
        <div>
            <h1>Users List</h1>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>

                {usersdata}
            </table>
        </div>
    )
}

export default Userslist