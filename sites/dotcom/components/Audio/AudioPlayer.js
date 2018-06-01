// @flow
import { Component } from '@guardian/guui';

import Time from './Time';

const BUCKET_COUNT = 100;
const TICK = 500;

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
                this.setState({ 
                    ready: true, 
                    duration: this.audio.duration
                });
            }, { once: true });
            this.audio.addEventListener('timeupdate', this.playing);
            this.context = new window.AudioContext();
            this.analyser = this.context.createAnalyser();
            this.analyser.fftSize = 256;
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
            this.source = this.context.createMediaElementSource(this.audio);
            this.source.connect(this.analyser);
        }
        this.state = {
            ready: false,
            playing: false,
            currentTime: 0,
            interval: 1,
            buckets: []
        };
    }
    
    componentDidMount() {
    }

    play = () => {
        this.setState({ playing: !this.state.playing })
        if (this.state.playing) {
            this.audio.play();
            if (!this.state.ready) {
                this.audio.addEventListener('durationchange', () => {
                    const interval = this.audio.duration / BUCKET_COUNT;
                    this.sample();
                    this.setState({ 
                        interval,
                        sampler: window.setInterval(this.sample, interval * 1000)
                    });
                    window.requestAnimationFrame(this.draw);
                }, { once: true });
            } else {
                this.sample();
                this.setState({ 
                    sampler: window.setInterval(this.sample, this.state.interval * 1000)
                });
                window.requestAnimationFrame(this.draw);
            }
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
    
    sample = () => {
        this.setState(() => {
            this.analyser.getByteFrequencyData(this.dataArray);
            const factor = Math.max(1, ...this.dataArray);
            const mean = this.dataArray.reduce((res, x) => res + x, 0) / this.dataArray.length;
            const barHeight = mean / factor * this.canvasH;
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
                : Math.floor(playOffset * 255 / this.state.interval);
            this.drawing.fillStyle = `rgb(${intensity},0,0)`;
            this.drawing.fillRect(barOffset, this.canvasH - barHeight, barWidth, barHeight);
        });

        if (this.state.playing) {
            window.setTimeout(() => window.requestAnimationFrame(this.draw), TICK);
        }
    }

    render({ sourceUrl, mediaId }, { ready, playing, currentTime, duration }) {
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
                <canvas ref={this.setCanvas} width="1000"></canvas>
            </div>
        );
    }
}
