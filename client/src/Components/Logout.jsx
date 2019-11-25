import React, {useEffect} from 'react'
import { Redirect } from 'react-router-dom'

const LogOut = ({onLogout})=> {


	useEffect(()=> {
        onLogout()
    }, [])
	
	
		return <Redirect to="/login" />
	
}

export default LogOut