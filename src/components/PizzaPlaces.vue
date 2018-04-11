  <template>
  <div class="container">
    <div class="section">
      <h1 class="title has-text-centered">
        Pizza, Please
        <img src="http://media.tumblr.com/tumblr_l27r5obs2N1qz98xr.png" 
          alt="pizza" 
          height="35" 
          width="35">
      </h1>
      <div class="columns is-centered">
        <div class="column is-6">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <places
                v-model="cityForm.country.label"
                placeholder="Enter City"
                @change="val => { cityForm.country.data = val }"
                :options="{ 
                  language: 'en_US', 
                  type: 'city', 
                  countries: ['US']
                }">
              </places>
            </p>
            <p class="control">
              <a v-bind:class="{ 'is-loading': isLoading }"
                @click="search()"
                class="button is-primary">
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
          <h2>Results for <strong>{{ cityForm.country.data.name }}, {{ cityForm.country.data.administrative }}</strong></h2>
        </div>
        <div class="column is-10" 
          v-show="resultsLoaded" 
          v-for="location in locations" 
          :key="location.id">
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
                <p>
                  <star-rating :read-only="true" 
                    :rating="4.3" 
                    :increment="0.01">
                  </star-rating>
                </p>
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  {{ location.location.display_address[0] }}<br>
                  {{ location.location.display_address[1] }}
                </p>
                <i class="fas fa-tags"></i>
                <a v-for="category in location.categories" 
                  :key="category.id"
                  :href="`https://www.yelp.com/search?find_desc=${category}&find_loc=${city}&ns=1`" 
                  target="_blank">
                  #{{ category.title }}
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
import { StarRating } from "vue-rate-it";
import Places from "vue-places";

export default {
  name: "PizzaPlaces",
  components: {
    StarRating,
    Places
  },
  data() {
    return {
      locations: [],
      isLoading: false,
      hasError: false,
      errorMessage: "",
      searchUrl: "https://pizza-search-uywnphitjm.now.sh/search",
      resultsLoaded: false,
      cityForm: {
        country: {
          label: null,
          data: {}
        }
      },
      loadingComponent: null
    };
  },
  methods: {
    search: function() {
      if (!this.cityForm.country.label) {
        this.hasError = true;
        this.errorMessage = "Please enter City";
        return;
      }

      this.$loading.open({
        container: null
      });

      this.hasError = false;
      this.resultsLoaded = false;
      this.isLoading = true;
      const cityName = `
        ${this.cityForm.country.data.name}, 
        ${this.cityForm.country.data.administrative}
      `;

      axios
        .get(this.searchUrl, {
          params: {
            city: cityName
          }
        })
        .then(response => {
          this.locations = response.data.locations;
          this.resultsLoaded = true;
          this.isLoading = false;

          this.$loading.close();
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

.fa-map-marker-alt {
  font-size: 35px;
  float: left;
  margin-right: 10px;
}
</style>
