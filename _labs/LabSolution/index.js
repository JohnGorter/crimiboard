

class CrimiData extends React.Component {
    constructor(){
        super(); 
        this.state = { data:[]};
    }

    newCard(card){
        let newdata = this.state.data.slice();
        newdata.forEach(lane => {
            if (lane.title == card.selectedlane) {
                lane.cards.push({
                    id:(lane.cards.length+1), 
                    title:card.title, 
                    link:card.link, 
                    description:card.description,
                    allowLikes:card.allowLikes
                });
            }
        });
        this.setState({data:newdata});
    }

    componentWillMount(){
        fetch("/data.json")
        .then( response => response.json())
        .then(data => this.setState({data:data}));
    }

    render() {
       return <CrimiBoard lanes={this.state.data} onNewCard={this.newCard.bind(this)}></CrimiBoard>
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
            <div>
            <div style={style}>
            { this.props.lanes.map((lane) =>  <Lane key={lane.id} title={lane.title} cards={lane.cards} />) }
            </div>
            <NewCard lanes={this.props.lanes} onNewCard={this.props.onNewCard} />
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
                { this.props.cards.map((card) => 
                <Card key={card.id} title={card.title} description={card.description} link={card.link} allowLikes={card.allowLikes} />) }
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
        let likes;
        if (this.props.allowLikes) {
            likes = <Like />;
        }
        return (
            <div className="card" style={style} >
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <a href={this.props.link}>{this.props.link}</a>
                {likes}
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

class NewCard extends React.Component {
    constructor() {
        super(); 
        this.state = {
            title:"",
            description:"",
            link:"",
            selectedlane:"New",
            allowLikes:false,
        };

    }

    handleNewCard(){
        // WHAT SHOULD WE DO HERE !!
        this.props.onNewCard(this.state);
    }

    handleInput(event, a, b){
        switch(event.target.name){
            case "title": this.setState({title:event.target.value}); break;
            case "description": this.setState({description:event.target.value}); break;
            case "link": this.setState({link:event.target.value}); break;
            case "selectedlane": this.setState({selectedlane:event.target.value}); break;
            case "allowLikes": this.setState({allowLikes:!this.state.allowLikes}); break;
            default: console.log("default"); break;
        }
    }

    render(){
        let formcomplete = (this.state.title && this.state.description);
        let style = {
            padding:20,
            border:'1px solid black'
        };
        return (
            <div style={style}>
                <h1>Add a new CRIMI investigation to the CrimiBoard</h1>
                <dl>
                    <dt>Title:</dt>
                    <dd><input type="text" name="title" value={this.state.title} onChange={this.handleInput.bind(this)}/></dd>
                    <dt>Description:</dt>
                    <dd><textarea name="description" value={this.state.description} onChange={this.handleInput.bind(this)}/></dd>
                    <dt>Link:</dt>
                    <dd><input type="text" name="link" value={this.state.link} onChange={this.handleInput.bind(this)}/></dd>
                    <dt>Lane:</dt>
                    <dd>
                        <select name="selectedlane" value={this.state.selectedlane} onChange={this.handleInput.bind(this)}>
                            { this.props.lanes.map((lane) => 
                                <option key={lane.title} value={lane.title}>{lane.title}</option>
                            )}
                        </select>
                    </dd>
                    <dt>Allow user votes:</dt>
                    <dd><input type="checkbox" name="allowLikes" checked={this.state.allowLikes} onChange={this.handleInput.bind(this)}/></dd>
                </dl>
                <button onClick={this.handleNewCard.bind(this)} disabled={!formcomplete}>Add Card</button>
            </div>
        )
    }
}

ReactDOM.render(<CrimiData />, document.querySelector("#root"));


