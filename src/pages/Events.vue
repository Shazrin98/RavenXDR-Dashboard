<template>
  <div class="row">
    <div class="col-lg-12 col-md-12">
      <card class="card" :header-classes="{ 'text-right': isRTL }">
        <h4 slot="header" class="card-title">
          {{ $t("dashboard.eventsTable") }}
        </h4>
        <div class="filters">
          <div class="dropdown d-flex align-items-center">
            <input type="text" v-model="searchSrcIP" placeholder="Search Source IP"
              class="form-control col-lg-3 col-md-6 mr-2 search-ip">
            <div class="select-container">
              <select v-model="selectedSrcIP" @change="applyIPFilters">
                <option value="" disabled selected>Choose Source IP</option>
                <option v-for="option in filteredSrcIPOptions" :key="option.key" :value="option.value">{{ option.label
                  }}
                </option>
              </select>
            </div>
          </div>
          <div class="dropdown d-flex align-items-center">
            <input type="text" v-model="searchDstIP" placeholder="Search Destination IP"
              class="form-control col-lg-3 col-md-6 mr-2 search-ip">
            <div class="select-container">
              <select v-model="selectedDstIP" @change="applyIPFilters">
                <option value="" disabled selected>Choose Destination IP</option>
                <option v-for="option in filteredDstIPOptions" :key="option.key" :value="option.value">{{ option.label
                  }}
                </option>
              </select>
            </div>
          </div>
          <button @click="resetFilters" class="red-button">Reset Filters</button>
        </div>
        <div class="table-container">
          <base-table :data="tableData" :columns="columns">
            <template slot="columns">
              <th class="text-left">Timestamp</th>
              <th class="text-left">Source IP</th>
              <th class="text-left">Destination IP</th>
              <th class="text-left">Details</th>
            </template>
            <template slot-scope="{ row }">
              <td>{{ row.timestamp }}</td>
              <td>{{ row.srcip }}</td>
              <td>{{ row.dstip }}</td>
              <td class="td-actions text-left">
                <base-button type="success" size="sm" icon @click="toggleDetailData(row)">
                  <i class="tim-icons icon-zoom-split"></i>
                </base-button>
              </td>
              <div v-if="row.showDetailData" class="detail-data">
                <pre>{{ row.data }}</pre>
              </div>
            </template>
          </base-table>
        </div>
      </card>
    </div>
  </div>
  </div>
</template>
<script>
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import * as apiService from "@/services/api.service";
import { BaseTable } from "@/components";

export default {
  components: {
    TaskList,
    UserTable,
    BaseTable,
  },
  data() {
    return {
      tableData: [],
      columns: ["timestamp", "dstip", "srcip", "actions"],
      selectedSrcIP: '',
      selectedDstIP: '',
      srcIPOptions: [],
      dstIPOptions: [],
      searchSrcIP: '',
      searchDstIP: '',
      timeRange: {},
      ///////////////////////////////////////////////////////////////////////
    };
  },
  computed: {
    ////////////////////////////////////////////////////////////////////////////
    filteredSrcIPOptions() {
      return this.srcIPOptions.filter(option =>
        option.label.toLowerCase().includes(this.searchSrcIP.toLowerCase())
      );
    },
    filteredDstIPOptions() {
      return this.dstIPOptions.filter(option =>
        option.label.toLowerCase().includes(this.searchDstIP.toLowerCase())
      );
    },
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
  async created() {
    this.$root.$on("timeRangeChanged", this.fetchData);
  },

  destroyed() {
    this.$root.$off("timeRangeChanged", this.fetchData);
  },
  methods: {
    ////////////////////////////////////////////////////////////////////////////////
    toggleDetailData(row) {
      row.showDetailData = !row.showDetailData;
    },
    resetFilters() {
      this.selectedSrcIP = '';
      this.selectedDstIP = '';
      this.searchSrcIP = '';
      this.searchDstIP = '';
      this.applyIPFilters();
    },
    async applyIPFilters() {
      try {
        const selectedSrcIP = this.selectedSrcIP;
        const selectedDstIP = this.selectedDstIP;
        const timeRange = this.timeRange || {
          gte: this.$route.query.gte,
          lte: this.$route.query.lte,
          format: "yyyy-MM-dd",
        };
        const filteredEventDataResponse = await apiService.getFilteredEventData(
          selectedSrcIP,
          selectedDstIP,
          timeRange
        );
        this.tableData = filteredEventDataResponse.hits.hits.map((hit) => {
          const timestamp = hit._source.timestamp;
          const srcip = hit._source.data.src || hit._source.data.srcip || hit._source.data.SrcIP;
          const dstip = hit._source.data.dst || hit._source.data.dstip || hit._source.data.DstIP;
          const data = hit._source.data;
          return {
            data: data,
            timestamp: timestamp,
            dstip: dstip,
            srcip: srcip,
            actions: null,
            showDetailData: false,
          };
        });
      } catch (error) {
        console.error("Error applying IP filters:", error);
      }
    },
    //////////////////////////////////////////////////////////////////
    async fetchData(timeRange) {
      try {
        if (!timeRange) {
          this.timeRange = {
            gte: this.$route.query.gte,
            lte: this.$route.query.lte,
            format: "yyyy-MM-dd",
          };
          timeRange = this.timeRange;
        } else {
          this.timeRange = timeRange;
        }

        // All Event Data
        const allEventDataResponse = await apiService.getAllEventData(timeRange);
        const allEventDataHits = allEventDataResponse.hits.hits;
        this.tableData = allEventDataHits.map((hit) => {
          const timestamp = hit._source.timestamp;
          const srcip = hit._source.data.src || hit._source.data.srcip || hit._source.data.SrcIP;
          const dstip = hit._source.data.dst || hit._source.data.dstip || hit._source.data.DstIP;
          const data = hit._source.data;
          return {
            data: data,
            timestamp: timestamp,
            dstip: dstip,
            srcip: srcip,
            actions: null, // Placeholder for action button data
            showDetailData: false, // Flag to control detail visibility
          };
        });

        // Source IP Filter Options
        const filterSrcipOptionsResponse = await apiService.getFilterSrcipOptions(timeRange);
        const filterSrcipOptionsBuckets =
          filterSrcipOptionsResponse.aggregations.unique_source_ips.buckets;
        const srcIPOptionsData = filterSrcipOptionsBuckets.map((bucket) => ({
          key: bucket.key,
          value: bucket.key,
          label: bucket.key,
        }));
        this.srcIPOptions = srcIPOptionsData;

        // Destination IP Filter Options
        const filterDstipOptionsResponse = await apiService.getFilterDstipOptions(timeRange);
        const filterDstipOptionsBuckets =
          filterDstipOptionsResponse.aggregations.unique_destination_ips.buckets; // Corrected
        const dstIPOptionsData = filterDstipOptionsBuckets.map((bucket) => ({
          key: bucket.key,
          value: bucket.key,
          label: bucket.key,
        }));
        this.dstIPOptions = dstIPOptionsData;
        ////////////////////////////////////////////////////////////////////////////////////////

      } catch (error) {
        console.error("Error fetching data from APIs:", error);
      }
    },
    formatNumber(number) {
      if (Number.isInteger(number)) {
        return number.toLocaleString();
      } else {
        return number.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    },
  },
  async mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style>
@import "~@fortawesome/fontawesome-free/css/all.css";

.detail-data {
  list-style: none;
  padding: 10px;
  margin: 5px;
  font-family: monospace;
  font-size: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.table-container {
  max-height: 500px;
  overflow-y: auto;
}

.search-ip {
  color: white;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 5px;
}

.red-button {
  color: black;
  background-color: red;
  border: 2px solid red;
  border-radius: 5px;
  padding: 2px 20px;
  font-size: 10px;
  cursor: pointer;
  margin: 5px;
}

.select-container {
  display: flex;
  align-items: center;
}

.select-container select {
  width: 200px;
}

</style>
