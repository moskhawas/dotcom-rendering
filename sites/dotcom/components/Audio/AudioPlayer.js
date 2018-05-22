// @flow
import { Component } from '@guardian/guui';

import Time from './Time';

export default class AudioPlayer extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            playing: false,
            currentTime: 0,
            track: 0
        }
    }

    componentDidMount() {
        const audio = this.base.children[0];
        this.setState({ audio });
        audio.addEventListener('durationchange', () => {
            this.setState({ ready: true, duration: audio.duration });
        });
        audio.addEventListener('timeupdate', this.updateTime);
    }

    play = () => {
        this.setState({ playing: !this.state.playing })
        if (this.state.playing) {
            this.state.audio.play();
        } else {
            this.state.audio.pause();
        }
    }

    playing = () => {
        this.setState({ 
            currentTime: this.state.audio.currentTime
        });
    }

    seek = e => {
        this.state.audio.currentTime = e.target.value * this.state.audio.duration / 100;
    }

    render({ sourceUrl, mediaId }, { ready, playing, currentTime, duration, track }) {
        return (
            <div>
                <audio controls="controls" data-media-id={mediaId} preload="none" controlslist="nodownload">
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
            </div>
        );
    }
}
