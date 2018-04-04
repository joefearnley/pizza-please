<template>
  <div class="container">
    <div class="section">
      <h1 class="title has-text-centered">
        Pizza, Please
        <img src="http://media.tumblr.com/tumblr_l27r5obs2N1qz98xr.png" alt="pizza" height="35" width="35">
      </h1>
      <div class="columns is-centered">
        <div class="column is-6">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input
                v-model="city" 
                class="input" 
                type="text" 
                placeholder="Enter City"
              >
            </p>
            <p class="control">
              <a 
                v-bind:class="{ 'is-loading': isLoading }"
                @click="search()"
                class="button is-success"
              >
                Search
              </a>
            </p>
          </div>
          <div v-show="hasError" class="field">
            <p class="help is-danger">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="columns is-multiline is-centered">
        <div class="column is-10 has-text-right" v-show="resultsLoaded">
          <h2>Results for <strong>{{ city }}</strong></h2>
        </div>
        <div class="column is-10"  v-show="resultsLoaded" v-for="location in locations" :key="location.id">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img :src="location.image_url" :alt="location.name">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-8">{{ location.name }}</p>
                  <p class="subtitle">
                    <img :src="location.rating_img_url_large" height="15" width="100">
                  </p>
                </div>
              </div>

              <div class="content">
                <p><em>"{{ location.snippet_text }}"</em></p>
                <p>
                  <i class="fas fa-map-marker"></i>
                  {{ location.location.display_address[0] }}<br>
                  {{ location.location.display_address[1] }}
                </p>
                <i class="fas fa-tags"></i>
                <a 
                  v-for="category in location.categories" 
                  :key="category.id"
                  :href="`https://www.yelp.com/search?find_desc=${category}&find_loc=${city}&ns=1`" 
                  target="_blank">
                  #{{ category[0] }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PizzaPlaces",
  data() {
    return {
      locations: [],
      city: "",
      isLoading: false,
      hasError: false,
      errorMessage: '',
      searchUrl: "https://pizza-please.herokuapp.com/search",
      resultsLoaded: false,
    };
  },
  methods: {
    search: function() {
      this.hasError = false;
      this.resultsLoaded = false;
      if (this.city === "") {
        this.hasError = true;
        this.errorMessage = 'Please enter City';
        return;
      }

      this.isLoading = true;
      axios
        .get(this.searchUrl, {
          params: {
            city: this.city
          }
        })
        .then(response => {
          this.locations = response.data.locations;
          this.resultsLoaded = true;
          this.isLoading = false;
        })
        .catch(err => {
          this.errorMessage = err.message;
          this.hasError = true;
          this.isLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.help {
  margin-left: 5px;
}

.subtitle {
  line-height: normal;
}

.fa-tags {
  font-size: 25px;
  margin-right: 10px;
}

.fa-map-marker {
  font-size: 35px;
  float: left;
  margin-right: 10px;
}
</style>
