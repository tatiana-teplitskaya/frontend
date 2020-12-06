import { toast } from "react-toastify";

export async function getFilms(currentPage, pageSize){
    try {
        const response = await fetch(`http://localhost:8080/films?page=${currentPage}&limit=${pageSize}`);
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
            const response = await fetch(`http://localhost:8080/films/search?title=${search.title}&star=${search.star}&page=${search.currentSearchPage}&limit=${search.pageSize}`);
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

export async function sendFile(file){
    const response = await fetch('http://localhost:8080/file', {
                method: 'POST',
                body: file
            })

    return response;
}