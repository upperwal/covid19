import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import Sketch from "react-p5";

import {
  BALL_RADIUS,
  CANVAS_SIZE,
  DESKTOP_CANVAS_SIZE,
  STARTING_BALLS,
  RUN,
  STATIC_PEOPLE_PERCENTATGE,
  STATES,
  COUNTERS,
  COLORS,
  TOTAL_TICKS,
  resetRun
} from './options.js'

import { Ball } from './Ball.js'
import './Simulation.scss'

const matchMedia = window.matchMedia('(min-width: 800px)')

let isDesktop = matchMedia.matches

class SimulationComponent extends React.Component {

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

        this.state = {
            healthy: 0
        }
    }

    /* domElements = Object.fromEntries(
        Object.keys(COUNTERS).map(state => {
            const el = document.getElementById(state)
            if (el) {
                el.parentNode.style = `color: ${COLORS[state]}`
            }
            return [state, document.getElementById(state)]
        })
    ) */

    updateGraph = () => {
        let y = 0
        
        const rects = Object.entries(RUN.results).map(([state, count]) => {
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
        resetRun()
    }

    updateCount = (sketch) => {
        if (RUN.tick < TOTAL_TICKS) {
            // calculate max concurrent infected
            if (RUN.results[STATES.infected] > RUN.results['max-concurrent-infected']) {
                RUN.results['max-concurrent-infected']++
            }

            Object.keys(this.countersRef).forEach((state) => {
                this.countersRef[state].current.innerText = RUN.results[state]
            })

            if (isDesktop) {
                RUN.tick % 2 === 0 && this.updateGraph()
            } else {
                RUN.tick % 4 === 0 && this.updateGraph()
            }
        }

        if (RUN.tick === TOTAL_TICKS) {
            this.startBalls(sketch)
            this.resetValues()
            //replayElement.style.display = 'flex'
        } else {
            RUN.tick++
        }
    }

    startBalls = (sketch) => {
        let id = 0
        this.balls = []
        Object.keys(STARTING_BALLS).forEach(state => {
            Array.from({ length: STARTING_BALLS[state] }, () => {
                const hasMovement = RUN.filters.stayHome ? sketch.random(0, 100) < STATIC_PEOPLE_PERCENTATGE || state === STATES.infected : true

                this.balls[id] = new Ball({
                    id,
                    sketch,
                    state,
                    hasMovement,
                    x: sketch.random(BALL_RADIUS, sketch.width - BALL_RADIUS),
                    y: sketch.random(BALL_RADIUS, sketch.height - BALL_RADIUS)
                })
                id++
            })
        })
    }

    createCanvas = (sketch, parentRef) => {
        const { height, width } = isDesktop ? DESKTOP_CANVAS_SIZE : CANVAS_SIZE
        sketch.createCanvas(550, 450).parent(parentRef)
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
            RUN.filters.death = !RUN.filters.death
            document.getElementById('death-count').classList.toggle('show', RUN.filters.death)
            this.startBalls(sketch)
            resetValues()
        }

        stayHomeFilter.onchange = () => {
            RUN.filters.stayHome = !RUN.filters.stayHome
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
        const { t } = this.props;
        
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

const SimulationTrans = withTranslation()(SimulationComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Simulation() {
  return (
    <Suspense fallback="loading">
      <SimulationTrans />
    </Suspense>
  );
}
