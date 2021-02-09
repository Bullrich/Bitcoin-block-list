import {Divider, List, ListItem, ListItemText} from "@material-ui/core";
import React from "react";
import {BlockDefinition} from "./BlockData";
import moment from 'moment'
import {RouteComponentProps, withRouter} from "react-router";
import {fetchBlocks} from "../network/dataFetcher";
import {shortenHash} from "../utils/utils";

class BlockList extends React.Component<RouteComponentProps, { blocks: BlockDefinition[], error: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {blocks: [], error: false}
    }

    componentDidMount() {
        fetchBlocks()
            .then((data) => this.setState({blocks: data.blocks}))
            .catch(e => this.setState({error: true}));
    }

    renderBlocks() {
        return this.state.blocks.reverse().map(({hash, height, time}) => {
            const shortHash = shortenHash(hash);

            return (<div key={hash}>
                <Divider/>
                <ListItem button onClick={() => this.props.history.push(`/${hash}`)}>
                    <ListItemText primary={height}/>
                    <ListItemText primary={this.timeSince(time)}/>
                    <ListItemText primary={shortHash}/>
                </ListItem>
            </div>);
        })
    }

    render() {
        return (
            <List component="nav" aria-label="mailbox folders">
                <ListItem>
                    <ListItemText primary="Height"/>
                    <ListItemText primary="Time"/>
                    <ListItemText primary="Hash"/>
                </ListItem>
                {this.state.blocks !== null ? this.renderBlocks() : ""}
            </List>
        )
    }

    timeSince(date: number) {
        return moment.unix(date).fromNow();
    }
}

export default withRouter(BlockList);