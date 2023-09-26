<template>
  <main class="container">
    <nav>
      <div class="link">
        <router-link to="/" style="color: white; text-decoration: none"
          >LOGIN</router-link
        >
        <router-link to="/completed" style="color: white; text-decoration: none"
          >COMPLETATI</router-link
        >
      </div>
    </nav>
    <h1 class="welcome">Benvenuto {{ username }}</h1>

    <section>
      <form @submit.prevent="addTodo">
        <h4>Cosa vuoi aggiungere alla lista?</h4>
        <div class="addToDo">
          <v-text-field
            label="Inserisci la tua attività"
            hide-details="auto"
            type="text"
            v-model="input_content"
          ></v-text-field>
          <v-btn
            color="primary"
            elevation="2"
            rounded
            type="submit"
            value="Add todo"
            >Add todo</v-btn
          >
        </div>
      </form>
    </section>

    <section>
      <div v-if="todos_asc.length > 0">
        <h4>TODO LIST:</h4>
        <div v-for="(todo, index) in todos_asc" :key="index" class="todo-item">
          <input type="checkbox" v-model="todo.done" />
          <input type="text" v-model="todo.content" />
          <v-btn
            style="color: white; background-color: red"
            elevation="2"
            rounded
            @click="removeTodo(todo)"
            >Elimina</v-btn
          >
        </div>
        <div class="archive">
          <v-btn elevation="2" outlined @click="archive"
            >Archivia completati</v-btn
          >
        </div>
      </div>
      <div v-else>
        <span>There are no tasks</span>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      username: "",
      input_content: "",
      todos: [],
      completedTodos: [],
    };
  },

  computed: {
    todos_asc() {
      return this.todos.slice().sort((a, b) => a.createdAt - b.createdAt);
    },
  },

  methods: {
    addTodo() {
      if (this.input_content.trim() === "") return;
      this.todos.push({
        content: this.input_content,
        done: false,
        createdBy: this.username,
        createdAt: Date.now(),
      });
      this.input_content = "";
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },
    archive() {
      const completed = this.todos.filter((todo) => todo.done);
      this.completedTodos.push(
        ...completed.map((todo) => ({ ...todo, doneBy: this.username }))
      );
      this.todos = this.todos.filter((todo) => !todo.done);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem(
        "completedTodos",
        JSON.stringify(this.completedTodos)
      );
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
  watch: {
    todos: {
      handler(newVal) {
        this.saveToLocalStorage();
      },
      deep: true,
    },
    username(newVal) {
      localStorage.setItem("username", newVal);
    },
  },

  mounted() {
    try {
      this.username = localStorage.getItem("username") || "";
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
      this.completedTodos =
        JSON.parse(localStorage.getItem("completedTodos")) || [];
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
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  gap: 30px;
}

.todo-item {
  display: flex;
  margin-bottom: 8px;
  gap: 5px;
}

.addToDo {
  display: flex;
  align-items: center;
}

.link {
  display: flex;
  gap: 10px;
}

.archive {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
