<template>
  <div class="container">
    <div class="add-character">
      <h1>Characters</h1>
      <b-form-input type="text" id="character-name" v-model="name" placeholder="Character Name"/>
      <b-form-input type="text" id="character-role" v-model="role" placeholder="Character Role"/>
      <b-button variant="success" v-on:click="addCharacter()">
        Add Character
      </b-button>
      <hr>
      <b-alert show dismissable variant="danger" v-if="error">{{error}}</b-alert>
      <div class="character"
        v-for="(character, index) in characters" 
        v-bind:item="character" 
        v-bind:index="index" 
        v-bind:key="character._id">
        <div class="text">
          <p v-if="character.name">Name: {{character.name}}</p>
          <p v-if="character.role">Role: {{character.role}}</p>
          <b-button class="float-right" variant="danger" size="sm" v-on:click="deleteCharacter(character._id)">x</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterService from '../server/CharacterService';

export default {
  name: 'CharacterComponent',
  data() {
    return {
      characters: [],
      error: '',
      name: '',
      role: ''
    }
  },
  async created() {
    try {
      this.characters = await CharacterService.getCharacters();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async addCharacter() {
      if (this.name === "") {
        this.error = "No name specified";
      } else {
        this.error = "";
        await CharacterService.addCharacter(this.name, this.role);
        this.characters = await CharacterService.getCharacters();
      }
    },
    async deleteCharacter(id) {
      this.error = "";
      await CharacterService.deleteCharacter(id);
      this.characters = await CharacterService.getCharacters();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin-bottom: 0;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

.btn-sm, .btn-group-sm > .btn {
  padding: 0.025rem 0.5rem;
}

div.container {
  max-width: 800px;
  margin: 0 auto;
}

div.character {
  position: relative;
  border: 1px solid #58D6B6;
  background-color:  #B8FFE1;
  padding: 10px 10px 10px 10px;
  margin-bottom: 15px;
  overflow: hidden;
}
</style>
