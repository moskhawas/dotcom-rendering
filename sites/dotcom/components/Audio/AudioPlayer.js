// @flow
import { Component } from '@guardian/guui';

import Time from './Time';

export default class AudioPlayer extends Component {
    constructor() {
        super();
        this.setCanvas = el => {
            this.drawing = el.getContext("2d");
            this.canvasH = el.height;
            this.canvasW = el.width;
        }
        this.setAudio = el => {
            this.audio = el;
            this.audio.addEventListener('durationchange', () => {
                this.setState({ ready: true, duration: this.audio.duration });
            });
            this.audio.addEventListener('timeupdate', this.playing);
            this.context = new window.AudioContext();
            this.analyser = this.context.createAnalyser();
            this.source = this.context.createMediaElementSource(this.audio);
            this.source.connect(this.analyser);
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        }
        this.state = {
            ready: false,
            playing: false,
            currentTime: 0,
            track: 0
        }
    }
    
    componentDidMount() {
    }

    play = () => {
        this.setState({ playing: !this.state.playing })
        if (this.state.playing) {
            this.audio.play();
            window.requestAnimationFrame(this.draw);
        } else {
            this.audio.pause();
            window.cancelAnimationFrame(this.draw);
        }
    }

    playing = () => {
        this.setState({ 
            currentTime: this.audio.currentTime
        });
        console.log(this.audio.currentTime)
    }

    seek = e => {
        this.audio.currentTime = e.target.value * this.audio.duration / 100;
    }

    draw = () => {
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.drawing.fillStyle = 'rgb(200, 200, 200)';
        this.drawing.fillRect(0, 0, this.canvasW, this.canvasH);
        this.drawing.lineWidth = 2;
        this.drawing.strokeStyle = 'rgb(0, 0, 0)';
        this.drawing.beginPath();

        const sliceWidth = this.canvasW * 1.0 / this.dataArray.length;
        let x = 0;

        for(let i = 0; i < this.dataArray.length; i++) {
            const v = this.dataArray[i] / 128.0;
            const y = v * this.canvasH/2;
    
            if (i === 0) {
              this.drawing.moveTo(x, y);
            } else {
              this.drawing.lineTo(x, y);
            }
    
            x += sliceWidth;
        }

        this.drawing.lineTo(this.canvasW, this.canvasH / 2);
        this.drawing.stroke();
        
        if (this.state.playing) {
            window.requestAnimationFrame(this.draw);
        }
    }

    render({ sourceUrl, mediaId }, { ready, playing, currentTime, duration, track }) {
        return (
            <div>
                <audio ref={this.setAudio} controls="controls" data-media-id={mediaId} preload="none" controlslist="nodownload">
                    <source src={sourceUrl} type="audio/mpeg" />
                </audio>
                <div>
                    <button onClick={this.play}>{playing ? "Pause" : "Play"}</button>
                </div>
                <div>
                    <Time t={currentTime} />
                    <input type="range" min="0" max="100" value={ready ? currentTime / duration * 100 : 0} onClick={this.seek} />
                    {ready ? ( <Time t={duration} /> ) : ""}
                </div>
                <canvas ref={this.setCanvas}></canvas>
            </div>
        );
    }
}
