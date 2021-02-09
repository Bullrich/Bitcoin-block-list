import {Component} from "react";
import {ChainData} from "./BlockData";
import {fetchBlockData} from "../network/dataFetcher";
import {Breadcrumbs, Button, Card, CardActions, CardContent, Link, Typography} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router";
import {shortenHash} from "../utils/utils";

interface ParamTypes {
    hash: string
}

interface DetailState {
    block?: ChainData;
    error: boolean
}

interface BlockDetailProps extends RouteComponentProps<ParamTypes> {
}


class BlockDetail extends Component<BlockDetailProps, DetailState> {
    constructor(props: BlockDetailProps) {
        super(props);
        this.state = {error: false};
    }


    componentDidMount() {
        if (this.props.match) {
            this.fetchCustomData(this.props.match.params.hash);
        }
    }

    renderBreadCrumb() {
        const history = this.props.history;
        const shortHash = shortenHash(this.props.match?.params.hash);

        console.log('hash', shortHash);
        return (
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={() => history.push("/")}>
                    Chainblocks
                </Link>
                <Typography color="textPrimary">{shortHash}</Typography>
            </Breadcrumbs>
        );
    }

    fetchCustomData(hash: string) {
        fetchBlockData(hash)
            .then((data) => this.setState({block: data}))
            .catch(e => this.setState({error: true}));
    }

    loadPreviousHash() {
        const block = this.state.block;
        if (block) {
            this.fetchCustomData(block.previous_hash);
            this.props.history.push(`/${block.previous_hash}`);
            this.setState({block: undefined});
        }
    }

    renderBlockInfo() {
        if (!this.state.block) {
            return (<Card style={{minWidth: 275}} variant="outlined">
                <CardContent>
                    <Typography style={{fontSize: 14}} color="textSecondary" gutterBottom>
                        Loading block info
                    </Typography>
                </CardContent>
            </Card>)
        }

        const hash = this.props.match.params.hash;
        const block = this.state.block;

        return (
            <Card style={{minWidth: 275}} variant="outlined">
                <CardContent>
                    <Typography style={{fontSize: 14}} color="textSecondary" gutterBottom>
                        Hash: {hash}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Block size (kB): {block.size}
                    </Typography>
                    <Typography style={{marginBottom: 12}} color="textSecondary">
                        Index: {block.index}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {" "}
                        <br/>

                        Previous Hash: {" "}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"
                            style={{margin: 'auto'}}
                            onClick={this.loadPreviousHash.bind(this)}>
                        {block.previous_hash}
                    </Button>
                </CardActions>
            </Card>
        )
    }

    render() {
        return (
            <div>
                {this.renderBreadCrumb()}
                <br/>
                {this.renderBlockInfo()}
            </div>
        );
    }
}

export default withRouter(BlockDetail);