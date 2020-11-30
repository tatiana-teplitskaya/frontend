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
const TextFieldWithValidation = withStyles({
    root: {
      marginBottom: "10px",
      "& input:invalid:focus": {
        borderColor: "red",
      },
    },
  })(TextField);

  const SelectWithValidation = withStyles({
    root: {
      "& input:invalid:focus ~ fieldset": {
        borderColor: "red",
      },
    },
  })(Select);

class NewFilm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: 0,
            format: '',
            stars: '',
            //file: '',
            fileError: ''
    }
    }
    

    handleInputChange = e => {
        this.setState( prev => (
            e.target.name === 'stars' ?
                {...prev, ...{
                    [e.target.name]: e.target.value.split(',')
                }}
            :
                {...prev, ...{
                [e.target.name]: e.target.value
        }}))
    }

    // handleChangeFile = e => {
    //     console.log(e.target)
    //     this.setState( prev => (
    //             {...prev, ...{
    //             file: e.target.file.files[0]
    //     }}))
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        const newFilm = {
            id: Date.now().toString(),
            title: this.state.title,
            year: this.state.year,
            format: this.state.format,
            stars: this.state.stars
        };
        console.log(newFilm);
        this.props.addFilm(newFilm);

        //this.props.onFilmAdd(newFilm);
        //this.props.onNewFilm();
        this.setState({
            title: '',
            year: 0,
            format: '',
            stars: []
        })
    }

    handleSubmitFile = async (e) => {
        e.preventDefault();
        const file = e.target.file.files[0];
        console.log(e.target)
        if (file.type === "text/plain") {
          let newFilms = [];
          var reader = new FileReader();
          reader.readAsText(file);
          reader.onload = e => {
            newFilms = getArrOfFilms(reader.result.split("\n"));
            newFilms.forEach(film => this.props.addFilm(film));
          };
        } else {
            this.setState({
                file: '',
                fileError: 'Please choose .txt file'
            })
            console.log('else');
        }
      };

    render () {
        return (
            <div>
                <NavBar />
                <div>
                    <form onSubmit={this.handleSubmitFile}>
                        <TextField 
                        error
                        type="file" 
                        required id="file" 
                        label="File"
                        helperText={this.state.fileError} 
                        />
                        <div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Add
                        </Button>
                        </div>
                    </form>
                </div>
                <div>
                <form onSubmit={this.handleSubmit}>
                <div className='new-film'>
                    <TextFieldWithValidation 
                        error={false}
                        required
                        variant='outlined' 
                        label="Title"
                        value={this.state.title}
                        name='title'
                        onChange={this.handleInputChange}
                    />
                    <TextFieldWithValidation
                        variant='outlined'
                        inputProps={{ max: "2021", min: "1895" }}
                        required
                        type='number'
                        label='Year'
                        value={this.state.year}
                        name='year'
                        onChange={this.handleInputChange}
                    />
                    <InputLabel id="format-label">Format</InputLabel>
                        <SelectWithValidation
                            required
                            variant="outlined"
                            size="small"
                            labelId="format-label"
                            id="format-id"
                            value={this.state.format}
                            name='format'
                            onChange={this.handleInputChange}
                        >
                            <MenuItem value="DVD">DVD</MenuItem>
                            <MenuItem value="VHS">VHS</MenuItem>
                            <MenuItem value="Blu-Ray">Blu-Ray</MenuItem>
                        </SelectWithValidation>
                    <TextFieldWithValidation
                        label='Stars'
                        variant='outlined'
                        inputProps={{ pattern: "^[A-Za-zА-Яа-яЁё ]*$" }}
                        value={this.state.stars}
                        name='stars'
                        onChange={this.handleInputChange}
                    />
                    <div className='NewFilm__footer'>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Add
                        </Button>
                    </div>
                    <div>
                    </div>
                </div>
            </form>
                </div>
            </div>
            

        );  
    }
        
}

const mapDispatchToProps = {
    addFilm
}

export default connect(null, mapDispatchToProps)(NewFilm);