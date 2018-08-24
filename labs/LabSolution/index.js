

class CrimiData extends React.Component {
    constructor(){
        super(); 
        this.state = { data:[]};
    }

    componentWillMount(){
        fetch("/data.json")
        .then( response => response.json())
        .then(data => this.setState({data:data}));
    }

    render() {
       return <CrimiBoard lanes={this.state.data}></CrimiBoard>
    }
}

class CrimiBoard extends React.Component {
    constructor(){
        super(); 
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            message:"test",
            title:""
        }
    }
    handleInput(event){
        this.state.title = event.target.value;
        console.log("state", this.state);
    }

    render(){
        let style = {
            display:'flex',
        };
        return (
            <div><input type="text" placeholder="title" value={this.state.title} onChange={this.handleInput} />
            <div style={style}>
            
            { this.props.lanes.map((lane) =>  <Lane key={lane.id} title={lane.title} cards={lane.cards} />) }
            </div>
            </div>
            
        );
    }
}

class Lane extends React.Component {
    render(){
        let style = {
            color:'black',
            paddingLeft:'100px'
        };

        return (
            <div className="lane" style={style}>
                <h1>{this.props.title}</h1>
                { this.props.cards.map((card) => <Card key={card.id} title={card.title} description={card.description} link={card.link} />) }
            </div>
        )
    }
}

class Card extends React.Component {
    render(){
        let style = {
            boxShadow:'5px 5px 5px #ccc',
            padding:'15px',
            marginBottom:'20px'
        }
        return (
            <div className="card" style={style} >
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <a href={this.props.link}>{this.props.link}</a>
                <Like />
            </div>
        )
    }
}

class Like extends React.Component {
    constructor(){
        super();
        this.state = { likes:0, dislikes:0 }
        this.handleDislike = this.handleDislike.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }
    handleLike(){
        this.setState({likes:(this.state.likes+1)});
    }
    handleDislike(){
        this.setState({dislikes:(this.state.dislikes+1)})
    }

    render() {
        let style = {
            border:'0px solid black',
            padding:5,
            marginTop:15,
            display:'flex',
            justifyContent:'flex-end'
        };

        let spanstyle = {
            marginRight:20,
            marginLeft:5
        }

       return (
            <div style={style}>
                {this.state.likes}{" "}
                <span style={spanstyle} onClick={this.handleLike} dangerouslySetInnerHTML={{__html:'&#x1F44D;'}}></span>
                {this.state.dislikes}{" "}
                <span style={spanstyle} onClick={this.handleDislike} dangerouslySetInnerHTML={{__html:'&#x1F44E;'}}></span>
            </div>
       )
    }
}

ReactDOM.render(<CrimiData />, document.querySelector("#root"));