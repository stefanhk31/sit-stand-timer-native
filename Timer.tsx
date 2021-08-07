import React from "react";
import moment from 'moment';

const initSeconds = 1200;
type props = {};
type state = {
    time: moment.Duration,
    running: boolean,
    timer: any
}

class Timer extends React.Component<props, state> {
    constructor(props: any) {
        super(props)
        this.state = {
            time: moment.duration(initSeconds, 'seconds'),
            running: false,
            timer: null
        }

        this.addTime = this.addTime.bind(this);
        this.subtractTime = this.subtractTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.countdown = this.countdown.bind(this);
        this.formatMMSS = this.formatMMSS.bind(this);
    }

    addTime() {
       this.state.time.add(1, 'minutes'); 
       
       this.setState({
            time: this.state.time
        });
    }

    subtractTime() {
        this.state.time.subtract(1, 'minutes'); 

        if (this.state.time.get('minutes') < 0) {
            this.state.time.add(1, 'minutes')
        }

        this.setState({
            time: this.state.time
        });
    }

    startTimer() {
        if (this.state.running) {
          return
        } else { 
          this.setState({
            running: true,
            timer: setInterval(this.countdown, 1000)
          })
        }
    }

    stopTimer() {
        if (!this.state.running) {
          return
        } else {          
          this.setState({
            running: false,
            timer: clearInterval(this.state.timer)
          })
        }
      }

     resetTimer() {
         this.setState({
             time: moment.duration(initSeconds, 'seconds'),
             running: false,
             timer: clearInterval(this.state.timer)
         })
     } 

    countdown() {
        if (this.state.running) {
          this.setState({
            time: this.state.time.subtract(1, 'seconds')
          })
      }
    }
  
    formatMMSS(val: any): any {
        return val < 10 ? '0' + val : val
      }

    render() {
    return (
      <div className="container m-5">
        <h4>Class-Based React</h4>
          <div className="timer-wrapper">
            <button className="col-xs-1 btn btn-primary" onClick={this.addTime}> + </button>
            <div className="col-xs-1">TIME: {this.formatMMSS(this.state.time.get('minutes'))}:{this.formatMMSS(this.state.time.get('seconds'))}</div>
            <button className="col-xs-1 btn btn-primary" onClick={this.subtractTime}> - </button>
            <button className="col-xs-1 btn btn-success" onClick={this.startTimer}>PLAY</button>
            <button className="col-xs-1 btn btn-danger" onClick={this.stopTimer}>STOP</button>
            <button className="col-xs-1 btn btn-warning" onClick={this.resetTimer}>RESET</button>
          </div>
      </div>
    );
  }
}

export default Timer;
