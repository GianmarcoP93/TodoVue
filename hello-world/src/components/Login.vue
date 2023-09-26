<template>
  <div class="container">
    <h1 class="welcome">Benvenuto</h1>
    <form @submit.prevent="login">
      <div class="login">
        <v-text-field
          label="Inserisci il tuo nome"
          hide-details="auto"
          type="text"
          v-model="name"
          class="input"
        ></v-text-field>
        <v-btn color="primary" elevation="2" rounded type="submit" class="btn"
          >Accedi</v-btn
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    login() {
      if (this.name.trim() === "") {
        alert("Inserisci un nome valido");
        return;
      }

      localStorage.setItem("username", this.name);

      this.$router.push("/home");
    },
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
.welcome {
  color: rgb(79, 108, 205);
}
.login {
  display: flex;
  align-items: center;
}
.input {
  min-height: 40px;
}
</style>
