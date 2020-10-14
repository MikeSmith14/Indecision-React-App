import React from 'react'
import AddOption from './AddOption'
import Action from './Action'
import Header from './Header'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
    state = {
      options: [],
      selectedOption: undefined
    };
    
    //Handles logic for Remove all button
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    //Handles logic to remove specific option
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
          options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    };

    //Randomly picks option upon click of "What should I do?"
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
          selectedOption: option
        }));
    };

    //Handles logic and wiring of Add option button
    handleAddOption = (option) => {
        if(!option) {
            return 'Enter valid value to add item'
        } else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }))
    };

    //Clears the modal selectedOption state
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
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


    //Renders to the HTML doc
    render() {
        const subtitle = 'Put your life in the hands of a computer'
        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                 />
            </div>
        )
    }
}