let component = React.createClass({
    render: () => {
        return (<h1>hello world </h1>);
    }
});
ReactDOM.render(<component>react dom rendered</component>, document.getElementById('component'));
