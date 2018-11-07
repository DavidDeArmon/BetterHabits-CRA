import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

class UserInfo extends Component{
render(){
       const {displayName,isLoaded,isEmpty} = this.props.firebase.auth 
       if(isLoaded||!isEmpty){
        return(
            <div className="Card">
                <h1 className="Header">Welcome</h1>
                <div className='userCard'>
                    <h2>{displayName}</h2>
                    <Link className='Link' to ='/login'>Log Out</Link>
                </div>
            </div>
        )
       }else{
           return(
                <div className="Card">
                    <h1 className="Header">Welcome</h1>
                    <div className='userCard'>
                        <h2>You are not logged in</h2>
                        <Link to='/login' onClick={()=>firebase.auth().signOut()}>Log Out</Link>
                    </div>
                </div>
           )
       }
}
}

export default connect(state=>state,{})(UserInfo)
