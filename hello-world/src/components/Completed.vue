<template>
  <main class="container">
    <nav class="link">
      <router-link to="/" style="color: white; text-decoration: none"
        >LOGIN</router-link
      >
      <router-link to="/home" style="color: white; text-decoration: none"
        >TODO</router-link
      >
    </nav>
    <div>
      <h1 class="welcome">COMPLETATI</h1>

      <v-text-field
        color="rgb(79,108,205)"
        type="search"
        @input="search"
        v-model="searchQuery"
        label="Cerca"
      ></v-text-field>

      <select
        class="select"
        v-model="selectedCreator"
        @change="filterByCreator"
      >
        <option value="">Tutti</option>
        <option v-for="creator in creators" :key="creator.id" :value="creator">
          {{ creator }}
        </option>
      </select>

      <div v-if="completedTodos.length === 0">
        <p>Nessuna task completata</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="(todo, index) in completedTodos" :key="index">
            <strong class="name">{{ todo.doneBy }}:</strong> {{ todo.content }}
          </li>
        </ul>

        <div class="reset">
          <v-btn
            style="color: white; background-color: red"
            elevation="2"
            rounded
            @click="reset"
            >Reset</v-btn
          >
        </div>
      </div>
      <div class="button-links"></div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Completed",
  data() {
    return {
      completedTodos: [],
      originalCompletedTodos: [],
      username: "",
      creators: [],
      selectedCreator: "",
      searchQuery: "",
    };
  },
  methods: {
    // fix
    search() {
      const query = this.searchQuery.toLowerCase();
      if (query === "") {
        this.completedTodos = [...this.originalCompletedTodos];
      } else {
        const searchResults = [...this.originalCompletedTodos].filter(
          (todo) =>
            todo.content.toLowerCase().includes(query) ||
            todo.doneBy.toLowerCase().includes(query)
        );
        this.completedTodos = searchResults;
      }
    },

    filterByCreator() {
      if (this.selectedCreator === "") {
        this.completedTodos = [...this.originalCompletedTodos];
      } else {
        const filteredTodos = this.originalCompletedTodos.filter(
          (todo) => todo.doneBy === this.selectedCreator
        );
        this.completedTodos = filteredTodos;
      }
    },

    reset() {
      this.completedTodos = [];
      localStorage.removeItem("completedTodos");
    },
  },
  mounted() {
    try {
      this.username = localStorage.getItem("username") || "";
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
      this.completedTodos =
        JSON.parse(localStorage.getItem("completedTodos")) || [];
      this.creators = Array.from(
        new Set(this.completedTodos.map((todo) => todo.doneBy))
      );
      this.originalCompletedTodos = [...this.completedTodos];
    } catch (error) {
      console.error(
        "Errore durante il caricamento dei dati da localStorage:",
        error
      );
    }
  },
};
</script>

<style>
.link {
  background-color: rgb(79, 108, 205);
  padding: 5px 50px;
  border-radius: 5px;
}

.welcome,
.name {
  color: rgb(79, 108, 205);
}
.select {
  border: 1px solid black;
  border-radius: 10px;
  outline: none;
  min-width: 80px;
  text-align: center;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  gap: 30px;
}
.link {
  display: flex;
  gap: 10px;
}
.reset {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
