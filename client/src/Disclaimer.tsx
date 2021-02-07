import {Component} from "react";

export default class Disclaimer extends Component<{}, { message: string }> {
    state = {message: 'Loading'}

    constructor(props: {}) {
        super(props);

        fetch("http://localhost:8000")
            .then(resp => resp.json())
            .catch(e => console.error('error', e))
            .then(data => this.setState({message: data.message}));
    }

    render() {
        return (
            <div>
                {this.state.message}
            </div>
        )
    }
}