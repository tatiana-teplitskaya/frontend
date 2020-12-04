import { toast } from "react-toastify";

export async function getFilms(){
    try {
        const response = await fetch('http://localhost:8080/films');
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getFilmById(id){
    try {
        const response = await fetch(`http://localhost:8080/about/${id}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getFilmsBySearch(search){
        try {
            const response = await fetch(`http://localhost:8080/films/search?title=${search.title}&star=${search.star}`);
            const json = await response.json();
            return json;
        } catch(error) {
            console.log(error);
            throw new Error(error);
        }
}

export async function deleteFilmById(id){
    try {
        const response = await fetch('http://localhost:8080/films/' + id, {
                method: 'DELETE'
            });
        return response;
        } catch(error) {
            console.log(error);
            throw new Error(error);
        }
}

export async function sendFilm(film){
        const response = await fetch('http://localhost:8080/films', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(film)
        });
        // const status = response.status;
        // if (status == 200) {
        //     toast.success('Movie was successfully created');
        // } else {
        //     toast.error(response.statusText);
        // }
        // console.log(status);
        return response;


    
}