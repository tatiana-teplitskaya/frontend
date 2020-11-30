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
        console.log('ingetfilmbyid');
        const response = await fetch(`http://localhost:8080/films/${id}`);
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
        //const result = await response.json();
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
        return response;
}