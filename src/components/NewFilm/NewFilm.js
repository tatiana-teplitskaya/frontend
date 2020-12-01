import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Button,
    withStyles
} from '@material-ui/core';
import './NewFilm.css';
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactTostify.css';
import { addFilm } from '../../redux/actions';
import { getArrOfFilms } from '../../helpers/filmsFormater';
import NavBar from '../NavBar/NavBar';


//toast.configure();



class NewFilm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleError: '',
            year: 0,
            yearError: '',
            format: 'DVD',
            formatError: '',
            stars: '',
            starsError: '',
            //file: '',
            fileError: '',
            file: {}
    }
    }
    

    handleInputChange = e => {
        this.setState( prev => (
            e.target.name === 'stars' ?
                {...prev, ...{
                    [e.target.name]: e.target.value.split(','),
                    [`${e.target.name}Error`]: ''
                }}
            :
                {...prev, ...{
                [e.target.name]: e.target.value,
                [`${e.target.name}Error`]: ''
        }}))
    }

    handleChangeFile = e => {
        const file = e.target.files[0];

        this.setState( prev => (
                {
                    ...prev,
                file
        }));
        if(file.type === "text/plain") {
            this.setState( prev => (
                {
                    ...prev,
                    fileError: ''
                }
            ))
        }
    }

    validate = () => {
        let isError = false;
        const errors = {
          titleError: '',
          yearError: '',
          starsError: '',
        };
    
        if (this.state.title.length < 2 || this.state.title.toString().trim().length === 0) {
          isError = true;
          errors.titleError = "Title needs to be atleast 2 characters long";
        }

        if (this.state.year < 1850 || this.state.year > 2021) {
            isError = true;
            errors.yearError = "Year must be greater than 1850 and less than 2021";
        }

        if (!(this.state.stars).toString().match(/^[A-Za-zА-Яа-яЁё, ]*$/)) {
            isError = true;
            errors.starsError = "Stars field should not contain numbers or symbols(exept ',')";
          }

    
        this.setState({
          ...this.state,
          ...errors
        });
    
        return isError;
      };

    handleSubmit = (e) => {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            const newFilm = {
                id: Date.now().toString(),
                title: this.state.title,
                year: this.state.year,
                format: this.state.format,
                stars: this.state.stars
            };
            console.log(newFilm);
            this.props.addFilm(newFilm);
            this.setState({
                title: '',
                year: 0,
                format: '',
                stars: []
            })
        }
    }

    handleSubmitFile = async (e) => {
        e.preventDefault();
        const file = e.target.file.files[0];
        console.log(e.target)
        if (file.type === "text/plain") {
            this.setState({
                fileError: ''
            }) 
            let newFilms = [];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = e => {
                newFilms = getArrOfFilms(reader.result.split("\n"));
                newFilms.forEach(film => this.props.addFilm(film));
            };
        } else {
            this.setState({
                fileError: 'Please choose .txt file'
            })
        }
      };

    render () {
        return (
            <div>
                <NavBar />
                <div className='content'>
                    <div className='block-form'>
                        <form className='new-film-form' onSubmit={this.handleSubmitFile}>
                            <div className='input-wrapper'>
                                <Button
                                    className='input-button'
                                    component="label"
                                >
                                    {
                                        this.state.file.name || 'Upload File'
                                    }
                                    <input
                                        type="file"
                                        required
                                        id="file"
                                        hidden
                                        onChange={this.handleChangeFile}
                                    />
                                </Button>
                                {this.state.fileError
                                    ? <div className='error-block'>
                                        {this.state.fileError}
                                    </div>
                                    : null
                                }
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Add
                            </Button>
                        </form>
                    </div>
                    <div className='block-form'>
                    <form className='new-film-form' onSubmit={this.handleSubmit}>
                        <TextField 
                            className='form-field'
                            error={!!this.state.titleError}
                            required
                            variant='outlined' 
                            label="Title"
                            value={this.state.title}
                            name='title'
                            onChange={this.handleInputChange}
                            helperText={this.state.titleError}
                        />
                        <TextField
                            className='form-field'
                            error={!!this.state.yearError}
                            variant='outlined'
                            required
                            type='number'
                            label='Year'
                            value={this.state.year}
                            name='year'
                            onChange={this.handleInputChange}
                            helperText={this.state.yearError}
                        />
                        <InputLabel id="format-label">Format</InputLabel>
                            <Select
                                className='form-field'
                                required
                                variant="outlined"
                                size="small"
                                labelId="format-label"
                                id="format-id"
                                value={this.state.format}
                                name='format'
                                // label='Format'
                                onChange={this.handleInputChange}
                            >
                                <MenuItem value="DVD">DVD</MenuItem>
                                <MenuItem value="VHS">VHS</MenuItem>
                                <MenuItem value="Blu-Ray">Blu-Ray</MenuItem>
                            </Select>
                            <TextField
                                className='form-field'
                                required
                                error={!!this.state.starsError}
                                label='Stars'
                                variant='outlined'
                                value={this.state.stars}
                                name='stars'
                                onChange={this.handleInputChange}
                                helperText={this.state.starsError}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Add
                            </Button>
                        <div>
                        </div>
                </form>
                    </div>
                </div>
            </div>
            

        );  
    }
        
}

const mapDispatchToProps = {
    addFilm
}

export default connect(null, mapDispatchToProps)(NewFilm);