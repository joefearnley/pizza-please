<template>
  <div id="app">
    <PizzaPlaces/>
  </div>
</template>

<script>
import PizzaPlaces from "./components/PizzaPlaces";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";

export default {
  name: "App",
  components: {
    PizzaPlaces,
    FontAwesomeIcon
  }
};
</script>

<style>

</style>
