//React App Definition
class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        try{
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
    
            if(options){
                this.setState(() => ({ options }))
            }
        }catch (e) {
            //Do nothing at all, leave as an empty array
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    //Handles logic for Remove all button
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }))
    }

    //Handles logic to remove specific option
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option
            })
        }))
    }

    //Randomly picks option upon click of "What should I do?"
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    //Handles logic and wiring of Add option button
    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add item'
        } else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }))
    }

    //Renders to the HTML doc
    render() {
        const subtitle = 'Put your life in the hands of a computer'
        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

//Header component
const Header = (props) => {
    return(
        <div>
             <h1>{props.title}</h1> 
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    )
}

Header.defaultProps = {
    title: 'Indecision'
}

//Action component for What should I do button
const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled = {!props.hasOptions}>
                    What should I do?
            </button>
        </div>
    )
}

//Options component for the options list and remove all button
const Options = (props) => {
    return (
        <div>
          <button onClick={props.handleDeleteOptions}>Remove All</button>
          {props.options.length === 0 && <p>Please add an option to get started</p>}
          {
            props.options.map((option) =>(
                <Option
                key={option} 
                optionText={option} 
                handleDeleteOption={props.handleDeleteOption}
                />
            ))
          }
        </div>
      );
}

//Option component for individual option on list
const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText)
                }}
            >
                Remove
            </button>
        </div>
    )
}

//Add option component and handles the form
class AddOption extends React.Component {
    constructor(props){
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault()
        const option = e.target.elements.option.value.trim()
        const error = this.props.handleAddOption(option)
        this.setState(() => ({ error }))
        if(!error){
            e.target.elements.option.value = ''
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

//Renders Indecision to the index.html placing into the div ID 'app'
ReactDOM.render(<IndecisionApp />, document.getElementById('app'))