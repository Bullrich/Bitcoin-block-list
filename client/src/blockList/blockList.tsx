import {List, ListItem, Divider, ListItemText} from "@material-ui/core";
import React, {Component} from "react";
import BlockData, {BlockDefinition} from "./BlockData";
import moment from 'moment'
import { History } from "history";
import {RouteComponentProps, withRouter} from "react-router";

interface BlockProps {
    history: History
}


class BlockList extends React.Component<RouteComponentProps, { blocks: BlockDefinition[] }> {

    constructor(props: any) {
        super(props);

        this.state = {blocks: []}
    }


    componentDidMount() {
        const apiUrl = "http://127.0.0.1:8000/blocks";
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setState({blocks: (data as BlockData).blocks}));
    }

    renderBlocks() {
        return this.state.blocks.reverse().map(({hash, height, time}) => {
            const cleanHash = hash.replace(/^0+/, '');
            const shortHash = cleanHash.substr(0, 5);

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

    timeSince(date:number) {
        return moment.unix(date).fromNow();
    }
}

export default withRouter( BlockList);