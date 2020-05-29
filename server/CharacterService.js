import axios from 'axios';

const url = 'http://localhost:3000/api/characters';
// const url = 'api/characters';

// API RESTful backend
//api/characters
//api/locations

class CharacterService {
    // Get Character
    static getCharacters() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(character => ({
                        ...character,
                        createdAt: new Date(character.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    }

    // Create Character
    static addCharacter(name, role) {
        return axios.post(url, {
            name: name,
            role: role
        });
    }

    // Delete Character
    static deleteCharacter(id) {
        return axios.delete(`${url}/${id}`);
    }
}

export default CharacterService;