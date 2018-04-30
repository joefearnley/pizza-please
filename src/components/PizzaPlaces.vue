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
                  countries: ['US'],
                  templates: {
                    value: suggestion => `${suggestion.name}, ${abbriviateState(suggestion.administrative)}` 
                  }
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
          <h2>
            Results for 
            <strong>
              {{ cityForm.country.data.name }}, 
              {{ abbriviateState(cityForm.country.data.administrative) }}
            </strong>
          </h2>
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
                  <star-rating :read-only="true" :rating="location.rating"></star-rating>
                </p>
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  {{ location.location.display_address[0] }}<br>
                  {{ location.location.display_address[1] }}
                </p>
                <i class="fas fa-tags"></i>
                <a v-for="category in location.categories" 
                  :key="category.id"
                  :href="`https://www.yelp.com/search?find_desc=${category.title}&find_loc=${cityForm.country.label}&ns=1`" 
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
  mounted: function () {
    document
      .querySelector(".ap-icon-clear")
      .addEventListener("click", e => this.resultsLoaded = false);
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
      }
    };
  },
  methods: {
    search: function() {
      if (!this.cityForm.country.label) {
        this.hasError = true;
        this.resultsLoaded = false;
        this.errorMessage = "Please enter City";
        return;
      }

      const loadingComponent = this.$loading.open({
        container: null
      });

      this.hasError = false;
      this.resultsLoaded = false;

      this.isLoading = true;
      const cityName = `${this.cityForm.country.data.name},${this.cityForm.country.data.administrative}`;

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

          loadingComponent.close();
        })
        .catch(err => {
          this.errorMessage = err.message;
          this.hasError = true;
          this.isLoading = false;
        });
    },
    abbriviateState: function(state) {
      return {
        "Alabama": "AL",
        "Alaska": "AK",
        "American Samoa": "AS",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "District Of Columbia": "DC",
        "Federated States Of Micronesia": "FM",
        "Florida": "FL",
        "Georgia": "GA",
        "Guam": "GU",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Marshall Islands": "MH",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Northern Mariana Islands": "MP",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Palau": "PW",
        "Pennsylvania": "PA",
        "Puerto Rico": "PR",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virgin Islands": "VI",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY"
      }[state];
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
