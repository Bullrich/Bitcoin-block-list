import {Component} from "react";
import { match } from "react-router-dom";

interface ParamTypes {
    hash: string
}


export default class BlockDetail extends Component<{  match?: match<ParamTypes>; }, any>{
    render() {
        return (
            <div>
                {this.props.match?.params.hash}
            </div>
        );
    }
}