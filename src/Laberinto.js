import React, { useEffect, useRef, useState } from 'react'
import flotando from '../img/quieto.gif'
import der from '../img/der.gif'
import izq from '../img/izq.gif'
import arriba from '../img/arriba.gif'
import ganaste from '../img/ganaste.gif'
import pared from '../img/paredes.jpg'
import fin from '../img/fin.jpg'
import telas from '../img/tela.png'
import musica from '../img/audio.mp3'

const Jug = ({ setMovimiento, setImagen, setMas }) => {
  const mass = useRef(true)

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'a':
        case 'ArrowLeft':
          setImagen(izq)
          setMovimiento('izq')
          setMas(!mass.current)
          mass.current = !mass.current
          break
        case 'd':
        case 'ArrowRight':
          setImagen(der)
          setMovimiento('dere')
          setMas(!mass.current)
          mass.current = !mass.current
          break
        case 'w':
        case 'ArrowUp':
          setImagen(arriba)
          setMovimiento('arriba')
          setMas(!mass.current)
          mass.current = !mass.current
          break
        case 's':
        case 'ArrowDown':
          setImagen(flotando)
          setMovimiento('abajo')
          setMas(!mass.current)
          mass.current = !mass.current
          break
        default:
          break
      }
    })
  }, [])
}

const Laberinto = () => {
  const x = useRef(1)
  const y = useRef(1)
  const prim = useRef(true)
  const [altura, setAltura] = useState(4)
  const [ancho, setAncho] = useState(4)
  const [partes, setPartes] = useState([])
  const [movimiento, setMovimiento] = useState('')
  const [imagen, setImagen] = useState(flotando)
  const [mas, setMas] = useState(true)
  const [victoria, setVictoria] = useState(false)

  useEffect(() => {
    const audio = new Audio(musica)

    if (prim.current === true) {
      audio.load()
      audio.play()
      audio.loop = true
      prim.current = false
    }
  }, [])

  const fetchLaberinto = async () => {
    x.current = 1
    y.current = 1
    setVictoria(false)
    setImagen(flotando)
    const response = await fetch(`https://maze.juanelcaballo.club/?type=json&w=${ancho}&h=${altura}`).then((res) => res.json()).then((responseInJSON) => (responseInJSON))
    setPartes([...response])
  }

  useEffect(() => {
    const tempo = [...partes]
    if (movimiento === 'izq') {
      if (tempo[x.current][y.current - 1] === ' ') {
        tempo[x.current][y.current - 1] = 'p'
        tempo[x.current][y.current] = ' '
        y.current -= 1
        setPartes(tempo)
      } else if (tempo[x.current][y.current - 1] === 'g') {
        tempo[x.current][y.current - 1] = 'p'
        tempo[x.current][y.current] = ' '
        y.current -= 1
        setPartes(tempo)
        setImagen(ganaste)
        setTimeout(() => { setVictoria(true) }, 2500)
      }
    } else if (movimiento === 'dere') {
      if (tempo[x.current][y.current + 1] === ' ') {
        tempo[x.current][y.current + 1] = 'p'
        tempo[x.current][y.current] = ' '
        y.current += 1
        setPartes(tempo)
      } else if (tempo[x.current][y.current + 1] === 'g') {
        tempo[x.current][y.current + 1] = 'p'
        tempo[x.current][y.current] = ' '
        y.current += 1
        setPartes(tempo)
        setImagen(ganaste)
        setTimeout(() => { setVictoria(true) }, 2500)
      }
    } else if (movimiento === 'arriba') {
      if (tempo[x.current - 1][y.current] === ' ') {
        tempo[x.current - 1][y.current] = 'p'
        tempo[x.current][y.current] = ' '
        x.current -= 1
        setPartes(tempo)
      } else if (tempo[x.current - 1][y.current] === 'g') {
        tempo[x.current - 1][y.current] = 'p'
        tempo[x.current][y.current] = ' '
        x.current -= 1
        setPartes(tempo)
        setImagen(ganaste)
        setTimeout(() => { setVictoria(true) }, 2500)
      }
    } else if (movimiento === 'abajo') {
      if (tempo[x.current + 1][y.current] === ' ') {
        tempo[x.current + 1][y.current] = 'p'
        tempo[x.current][y.current] = ' '
        x.current += 1
        setPartes(tempo)
      } else if (tempo[x.current + 1][y.current] === 'g') {
        tempo[x.current + 1][y.current] = 'p'
        tempo[x.current][y.current] = ' '
        x.current += 1
        setPartes(tempo)
        setImagen(ganaste)
        setTimeout(() => { setVictoria(true) }, 2500)
      }
    }
  }, [mas])

  return (
    <div css={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey',
    }}
    >

      {!victoria ? (

        <div css={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey',
        }}
        >

          <h1 css={{
            color: 'white', textAlign: 'center', backgroudColor: 'grey',
          }}
          >
            Laberinto
          </h1>

          <div css={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', aligneself: 'center',
          }}
          >
            <input css={{ width: '70px', height: '25px', margin: '5px' }} onChange={(e) => setAltura(e.target.value)} value={altura} />
            <input css={{ width: '70px', height: '25px', margin: '5px' }} onChange={(e) => setAncho(e.target.value)} value={ancho} />
            <button
              type="button"
              onClick={() => fetchLaberinto()}
              css={{
                width: '70px', height: '25px', borderRadius: '10px', padding: '1px',
              }}
            >
              Actualizar
            </button>
          </div>

          <div css={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', aligneself: 'center', marginTop: '20px', backgroundColor: 'white',
          }}
          >
            <Jug setMovimiento={setMovimiento} setImagen={setImagen} setMas={setMas} />
            {partes.map((ele, i) => (
              <div key={i.id} css={{ display: 'flex', flexDirection: 'row' }}>
                {
                                ele.map((xi, ii) => {
                                  if (xi === 'p') {
                                    return (
                                      <div
                                        key={ii.id}
                                        css={{
                                          backgroundImage: `url(${imagen})`, width: '60px', height: '60px', backgroundSize: 'contain',
                                        }}
                                      />
                                    )
                                  } if (xi === 'g') {
                                    return (
                                      <div
                                        key={ii.id}
                                        css={{
                                          backgroundImage: `url(${fin})`, width: '60px', height: '60px', backgroundSize: 'contain',
                                        }}
                                      />
                                    )
                                  } if (xi !== ' ') {
                                    return (
                                      <div
                                        key={ii.id}
                                        css={{
                                          backgroundImage: `url(${pared})`, width: '60px', height: '60px', backgroundSize: 'contain',
                                        }}
                                      />
                                    )
                                  }
                                  return (
                                    <div css={{ width: '60px', height: '60px' }} />
                                  )
                                })
                            }
              </div>
            ))}
          </div>

        </div>
      )
        : (
          <div css={{
            marginTop: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey',
          }}
          >
            <h1 css={{
              color: 'white', textAlign: 'center', backgroudColor: 'grey', fontFamily: 'Cursive',
            }}
            >
              Ghost Maze terminado
            </h1>
            <div css={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey',
            }}
            >
              <div css={{
                backgroundImage: `url(${telas})`, width: '450px', height: '450px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
              }}
              />
              <button type="button" css={{ width: '90px', height: '50px', borderRadius: '10px' }} onClick={() => { fetchLaberinto() }}>Reiniciar</button>
              <div css={{
                backgroundImage: `url(${telas})`, width: '450px', height: '450px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
              }}
              />
            </div>
          </div>
        )}
    </div>
  )
}
export default Laberinto
