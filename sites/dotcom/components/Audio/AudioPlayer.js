// @flow
import { Component } from '@guardian/guui';

import Time from './Time';

const BUCKET_COUNT = 200;
const TICK = 500;

export default class AudioPlayer extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            playing: false,
            currentTime: 0,
            duration: 0,
            volume: 0,
            interval: 1,
            buckets: []
        };
    }
    
    componentDidMount() {
    }
    
    setCanvas = el => {
        this.drawing = el.getContext("2d");
        this.canvasH = el.height;
        this.canvasW = el.width;
    }

    setAudio = el => {
        this.audio = el;
        if (Number.isNaN(this.audio.duration)) {
            this.audio.addEventListener('durationchange', () => {
                this.setState({ 
                    ready: true, 
                    duration: this.audio.duration,
                    volume: this.audio.volume
                });
            }, { once: true });
        } else {
            this.setState({ 
                ready: true, 
                duration: this.audio.duration,
                volume: this.audio.volume
            });
        }
        this.audio.addEventListener('volumechange', () => {
            this.setState({ volume: this.audio.volume });
        });
        this.audio.addEventListener('timeupdate', this.playing);
        this.audio.addEventListener('seek', this.seek);
        this.context = new window.AudioContext();
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 256;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
        this.source = this.context.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
    }

    play = () => {
        this.setState({ playing: !this.state.playing })
        if (this.state.playing) {
            this.audio.play();
            const interval = this.audio.duration / BUCKET_COUNT;
            this.sample();
            this.setState({ 
                interval,
                sampler: window.setInterval(this.sample, interval * 1000)
            });
            window.requestAnimationFrame(this.draw);
        } else {
            this.audio.pause();
            window.clearInterval(this.state.sampler);
            this.setState({ sampler: null });
            window.cancelAnimationFrame(this.draw);
        }
    }

    playing = () => {
        this.setState({ currentTime: this.audio.currentTime });
    }
    
    seek = e => {
        this.audio.currentTime = e.target.value * this.audio.duration / 100;
    }
    
    volume = e => {
        this.audio.volume = e.target.value / 100;
    }

    forward = () => {
        this.audio.currentTime = Math.min(this.state.currentTime + 15, this.state.duration);
    }
    
    backward = () => {
        this.audio.currentTime = Math.max(this.state.currentTime - 15, 0);
    }

    seek = e => {
        this.setState({
            currentTime: this.audio.currentTime = this.audio.duration * e.target.value / 100
        });
    }
    
    sample = () => {
        this.setState(() => {
            this.analyser.getByteFrequencyData(this.dataArray);
            const factor = Math.max(1, ...this.dataArray);
            const mean = this.dataArray.reduce((res, x) => res + x, 0) / this.dataArray.length;
            const minHeight = this.canvasH / 10;
            const barHeight = minHeight + (mean / factor * (this.canvasH - minHeight));
            this.state.buckets.push(barHeight);
        });
    }

    draw = () => {
        this.drawing.fillStyle = 'rgb(0, 0, 0)';
        this.drawing.fillRect(0, 0, this.canvasW, this.canvasH);

        const barWidth = (this.canvasW - BUCKET_COUNT + 1) / BUCKET_COUNT;
        
        this.state.buckets.forEach((barHeight, i) => {
            const barOffset = i * (barWidth + 1);
            const playOffset = this.state.currentTime - this.state.interval * i;
            const intensity = playOffset > this.state.interval
                ? 255
                : Math.max(30, 30 + Math.floor(playOffset * 225 / this.state.interval));
            this.drawing.fillStyle = `rgb(${intensity},0,0)`;
            this.drawing.fillRect(barOffset, this.canvasH - barHeight, barWidth, barHeight);
        });

        if (this.state.playing) {
            window.setTimeout(() => window.requestAnimationFrame(this.draw), TICK);
        }
    }

    render({ sourceUrl, mediaId }, { ready, playing, currentTime, duration, volume }) {
        return (
            <div>
                <audio ref={this.setAudio} controls="controls" volume data-media-id={mediaId} preload="metadata" controlslist="nodownload">
                    <source src={sourceUrl} type="audio/mpeg" />
                </audio>
                <div>
                    <button onClick={this.play}>{playing ? "Pause" : "Play"}</button>
                    <button onClick={this.backward} disabled={!playing}>← Backward 15s</button>
                    <button onClick={this.forward} disabled={!playing}>Forward 15s →</button>
                </div>
                <div>
                    <Time t={currentTime} />
                    <div role="progressbar" aria-valuenow={ready ? currentTime / duration * 100 : 0} aria-valuemin="0" aria-valuemax="100">20 %</div>
                    <input type="range" min="0" max="100" value={ready ? currentTime / duration * 100 : 0} />
                    <input type="range" min="0" max="100" onChange={this.seek} />
                    {ready ? ( <Time t={duration} /> ) : ""}
                </div>
                <div>
                    <input type="range" min="0" max="100" value={volume * 100} />
                    <input type="range" min="0" max="100" onChange={this.volume} />
                </div>
                <canvas ref={this.setCanvas} width="1000"></canvas>
            </div>
        );
    }
}
