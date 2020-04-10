import React from 'react';
import Sketch from "react-p5";

import {
  BALL_RADIUS,
  CANVAS_SIZE,
  DESKTOP_CANVAS_SIZE,
  STARTING_BALLS,
  STATES,
  COLORS,
  DEFAULT_FILTERS,
  TOTAL_TICKS
} from './options.js'

import { Ball } from './Ball.js'
import './Simulation.scss'

const matchMedia = window.matchMedia('(min-width: 800px)')

let isDesktop = matchMedia.matches

class Simulation extends React.Component {

    graphPoint = 0
    graphList = ''
    balls = []

    constructor(props) {
        super(props)

        this.countersRef = {
            infected: React.createRef(),
            well: React.createRef(),
            recovered: React.createRef(),
            death: React.createRef()
        }

        this.graphRef = React.createRef()
        this.canvasRef = React.createRef()

        this.runState = { 
            filters: { ...DEFAULT_FILTERS },
            results: { ...STARTING_BALLS },
            config: {
                STATIC_PEOPLE_PERCENTATGE: props.motion_percentage
            },
            tick: 0
        }
    }

    updateGraph = () => {
        let y = 0
        const rects = Object.entries(this.runState.results).map(([state, count]) => {
            const color = COLORS[state]
            if (count > 0) {
                const percentatge = count / 200 * 100
                const rect = `<rect height="${percentatge}" y="${y}" width="1" fill="${color}"></rect>`
                y += percentatge
                return rect
            }
            return ''
        }).join('')

        const newGraphPoint = `<g transform="translate(${this.graphPoint},0)">${rects}</g>`
        this.graphPoint++


        this.graphRef.current.insertAdjacentHTML('beforeend', newGraphPoint)
    }

    resetValues = (isDesktopNewValue = isDesktop) => {
        this.graphRef.current.innerHTML = ''
        //replayElement.style.display = 'none'
        this.graphPoint = 0
        isDesktop = isDesktopNewValue
        this.resetRun()
    }

    resetRun = () => {
        this.runState.results = { ...STARTING_BALLS }
        this.runState.tick = 0
    }

    updateCount = (sketch) => {
        if (this.runState.tick < TOTAL_TICKS) {
            // calculate max concurrent infected
            if (this.runState.results[STATES.infected] > this.runState.results['max-concurrent-infected']) {
                this.runState.results['max-concurrent-infected']++
            }

            Object.keys(this.countersRef).forEach((state) => {
                this.countersRef[state].current.innerText = this.runState.results[state]
            })

            if (isDesktop) {
                this.runState.tick % 2 === 0 && this.updateGraph()
            } else {
                this.runState.tick % 4 === 0 && this.updateGraph()
            }
        }

        if (this.runState.tick === TOTAL_TICKS) {
            this.startBalls(sketch)
            this.resetValues()
            //replayElement.style.display = 'flex'
        } else {
            this.runState.tick++
        }
    }

    startBalls = (sketch) => {
        let id = 0
        this.balls = []
        Object.keys(STARTING_BALLS).forEach(state => {
            Array.from({ length: STARTING_BALLS[state] }, () => {
                const hasMovement = this.runState.filters.stayHome ? sketch.random(0, 100) < this.runState.config.STATIC_PEOPLE_PERCENTATGE || state === STATES.infected : true

                this.balls[id] = new Ball({
                    id,
                    sketch,
                    state,
                    hasMovement,
                    x: sketch.random(BALL_RADIUS, sketch.width - BALL_RADIUS),
                    y: sketch.random(BALL_RADIUS, sketch.height - BALL_RADIUS)
                }, this.runState)
                id++

                return null
            })


            return null
        })
    }

    createCanvas = (sketch, parentRef) => {
        const { height, width } = isDesktop ? DESKTOP_CANVAS_SIZE : CANVAS_SIZE
        sketch.createCanvas(height, width).parent(parentRef)
    }

    setup = (sketch, parentRef) => {
        this.createCanvas(sketch, parentRef)
        this.startBalls(sketch)

        matchMedia.addListener(e => {
            isDesktop = e.matches
            this.createCanvas(sketch, parentRef)
            this.startBalls(sketch)
            this.resetValues()
        })

        /* replayButton.onclick = () => {
            this.startBalls(sketch)
            resetValues()
        }

        deathFilter.onclick = () => {
            this.runState.filters.death = !this.runState.filters.death
            document.getElementById('death-count').classList.toggle('show', this.runState.filters.death)
            this.startBalls(sketch)
            resetValues()
        }

        stayHomeFilter.onchange = () => {
            this.runState.filters.stayHome = !this.runState.filters.stayHome
            this.startBalls(sketch)
            resetValues()
        } */
    }

    draw = (sketch) => {
        sketch.background('white')
        this.balls.forEach(ball => {
            ball.checkState()
            ball.checkCollisions({ others: this.balls })
            ball.move()
            ball.render()
        })
        this.updateCount(sketch)
    }


    render() {
        return (
            <div className="viz-box">
                <div className="count">
                    <div className="healthy">Healthy<br /><span ref={this.countersRef.well}></span></div>
                    <div className="sick">Sick<br /><span ref={this.countersRef.infected}>0</span></div>
                    <div className="recovered">Recovered<br /><span ref={this.countersRef.recovered}>0</span></div>
                    <div className="deaths">Deaths<br /><span ref={this.countersRef.death}>0</span></div>
                </div>
                <svg ref={this.graphRef} version="1.1" xmlns="http://www.w3.org/2000/svg" height="100" width="100%" aria-labelledby="Graph of virus spread" role="img">
                    <title>Graph of virus spread</title>
                </svg>
                <Sketch ref={this.canvasRef} setup={this.setup} draw={this.draw} />
            </div>
        );
    }
}


export default Simulation
