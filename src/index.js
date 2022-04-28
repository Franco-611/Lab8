import { React, useState } from 'react'
import ReactDOM from 'react-dom'
import Laberinto from './Laberinto.js'
import telas from '../img/tela.png'

const App = () => {
  const [activo, setActivo] = useState(false)

  return (
    <div css={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', aligneself: 'center', backgroudColor: 'grey',
    }}
    >
      {!activo ? (
        <div css={{
          marginTop: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey',
        }}
        >
          <h1 css={{
            color: 'white', textAlign: 'center', backgroudColor: 'grey', fontFamily: 'Cursive',
          }}
          >
            Ghost Maze
          </h1>
          <div css={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey',
          }}
          >
            <div css={{
              backgroundImage: `url(${telas})`, width: '450px', height: '450px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
            }}
            />
            <button type="button" css={{ width: '90px', height: '50px', borderRadius: '10px' }} onClick={() => { setActivo(true) }}>Empezar</button>
            <div css={{
              backgroundImage: `url(${telas})`, width: '450px', height: '450px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
            }}
            />
          </div>
        </div>
      )
        : (
          <Laberinto />
        )}

    </div>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root'),

)
