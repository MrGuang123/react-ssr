import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { Dispatch } from 'redux'

interface Iprops {
  data: any[]
  dispatch: Dispatch
}

function About(props: Iprops) {
  const [result, setResult] = useState([])

  useEffect(() => {
    console.log('props.data', props.data);

    if (props.data) {
      return
    }

    axios.get('http://localhost:3200/getData').then(res => {
      console.log('receive data: ', res.data)
      // setResult(res.data.data)
      props.dispatch({
        type: 'change',
        payload: {
          data: res.data.data
        }
      })
    })
  }, [props.data])

  return (
    <>
      <main>
        <h2>about page</h2>
        <div>
          {
            props.data && props.data.map(item => {
              return <p key={item.id}>{`${item.id} : ${item.name}`}</p>
            })
          }
        </div>
      </main>
      <nav>
        <Link to="/">to Home</Link>
      </nav>
    </>
  );
}
About.service = {
  getData: (store) => new Promise(resolve => {
    axios.get('http://localhost:3200/getData').then(res => {
      store.dispatch({
        type: 'change',
        payload: {
          data: res.data.data
        }
      })
      resolve(res.data.data)
    })
  })
}

function mapStateToProps(state) {
  return {
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)