import React, { Component} from 'react';

export default class RenderController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            count: 0
        }
        this.component = <Child num={num} />
    }
    // 比较古早的实现方式, 类似useMemo
    controlRender = () => {
        const { props } = this.component;
        if(props.num != this.state.num ) {
            return this.component = React.cloneElement(this.component, { num : this.state.num})
        }
        return this.component

    }
    render() {
        const { num, count } = this.state

        return (
            <div>

                {this.controlRender()}
                <button onClick={() => {this.setState({count: count + 1})}}>+ count:{count}</button>
                <button onClick={() => {this.setState({num: num + 1})}}>+ num: {num}</button>

            </div>
        )
    }
}
const Child = ({num}) => {

    return (
        <div>this is the child component</div>
    )
}