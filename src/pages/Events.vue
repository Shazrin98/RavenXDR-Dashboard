<!-- ////////////////////////////////////////////////////////////////////////// -->
<template>
  <div>
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <card class="card" :header-classes="{ 'text-right': isRTL }">
          <h4 slot="header" class="card-title">
            {{ $t("dashboard.eventsTable") }}
          </h4>
          <!-- ////////////////////////////////////////////////////////////// -->
          <div class="row align-items-center">
            <!-- ////////////////////////////////////////////////////////// -->
            <div class="col-lg-10 d-flex flex-column">
              <div class="d-flex">
                <input type="text" v-model="searchSrcIP" placeholder="Source IP" class="search-ip">
                <input type="text" v-model="searchDstIP" placeholder="Destination IP" class="search-ip">
                <select class="search-timerange" v-model="selectedTimeRange" @change="handleTimeRangeChange">
                  <option value="" disabled selected>Time Range</option>
                  <option value="5m">Last 5 minutes</option>
                  <option value="10m">Last 10 minutes</option>
                  <option value="30m">Last 30 minutes</option>
                  <option value="1h">Last 1 hour</option>
                  <option value="1d">Last 1 day</option>
                  <option value="7d">Last 7 days</option>
                </select>

                <datepicker v-model="customStartDate" placeholder="Start Date" @input="handleCustomStartDateChange" class="datepicker-style">
                </datepicker>
                <datepicker v-model="customEndDate" placeholder="End Date" @input="handleCustomEndDateChange" class="datepicker-style"></datepicker>
              </div>
            </div>
            <div class="col-lg-2 d-flex">
              <!-- ////////////////////////////////////////////////// -->
              <base-button @click="applyFilters" type="info" class="search-button"><i
                  class="tim-icons icon-zoom-split"></i></base-button>
              <!-- ///////////////////////////////////////////////// -->
            </div>
          </div>
          <div class="row">
            <button @click="resetFilters" class="reset-button">Reset Filters</button>
          </div>
          <!-- ////////////////////////////////////////////////////////////// -->
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
//////////////////////////////////////////////////
import Datepicker from 'vuejs-datepicker'; // Import the Datepicker component
import { format } from 'date-fns';

export default {
  components: {
    TaskList,
    UserTable,
    BaseTable,
    Datepicker,
  },
  data() {
    return {
      ////////////////////////////////////////////////
      selectedTimeRange: '',
      customStartDate: null,
      customEndDate: null,
      tableData: [],
      columns: ["timestamp", "dstip", "srcip", "actions"],
      selectedSrcIP: '',
      selectedDstIP: '',
      srcIPOptions: [],
      dstIPOptions: [],
      searchSrcIP: '',
      searchDstIP: '',
      timeRange: {},
    };
  },
  computed: {
    ////////////////////////////////////////////////////////////////////////////
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
  methods: {
    ///////////////////////////////////////////////////////////////////////
    handleTimeRangeChange() {
      const selectedTimeRange = this.selectedTimeRange;
      this.selectedTimeRange = selectedTimeRange;
      this.customStartDate = null;
      this.customEndDate = null;
      console.log("handleTimeRangeChange this.selectedTimeRange:", this.selectedTimeRange);
    },
    handleCustomStartDateChange() {
      const selectedStartDate = this.customStartDate;
      this.customStartDate = this.formatDate(selectedStartDate);
      this.selectedTimeRange = '';
      console.log("handleCustomStartDateChange this.customStartDate:", this.customStartDate);

    },
    handleCustomEndDateChange() {
      const selectedEndDate = this.customEndDate;
      this.customEndDate = this.formatDate(selectedEndDate);
      this.selectedTimeRange = '';
      console.log("handleCustomEndDateChange this.customEndDate:", this.customEndDate);
    },
    async applyFilters() {
      try {
        const searchSrcIP = this.searchSrcIP.trim().toLowerCase();
        const searchDstIP = this.searchDstIP.trim().toLowerCase();
        let timeRange;
        if (this.selectedTimeRange !== '') {
          const timeRangeMap = {
            '5m': { gte: 'now-5m/m', lte: 'now/m' },
            '10m': { gte: 'now-10m/m', lte: 'now/m' },
            '30m': { gte: 'now-30m/m', lte: 'now/m' },
            '1h': { gte: 'now-1h/h', lte: 'now/h' },
            '1d': { gte: 'now-1d/d', lte: 'now/d' },
            '7d': { gte: 'now-7d/d', lte: 'now/d' },
          };
          timeRange = timeRangeMap[this.selectedTimeRange];
        } else {
          timeRange = {
            gte: this.customStartDate,
            lte: this.customEndDate,
            format: 'yyyy-MM-dd',
          };
        }
        await this.fetchData({ searchSrcIP, searchDstIP, timeRange });
      } catch (error) {
        console.error("Error applying filters:", error);
      }
    },
    toggleDetailData(row) {
      row.showDetailData = !row.showDetailData;
    },
    resetFilters() {
      this.selectedTimeRange = '',
        this.customStartDate = null;
      this.customEndDate = null;
      this.selectedSrcIP = '';
      this.selectedDstIP = '';
      this.searchSrcIP = '';
      this.searchDstIP = '';
      this.timeRange = '',
        this.applyIPFilters();
    },
    async fetchAllEventData() {
      try {
        await this.fetchData({ searchSrcIP: '', searchDstIP: '', timeRange: null });
      } catch (error) {
        console.error("Error fetching all event data:", error);
      }
    },
    async fetchData({ searchSrcIP = '', searchDstIP = '', timeRange }) {
      this.timeRange = timeRange || {
        gte: this.$route.query.gte,
        lte: this.$route.query.lte,
        format: "yyyy-MM-dd",
      };

      try {
        const responses = await Promise.all([
          apiService.getFilteredEventData(searchSrcIP, searchDstIP, this.timeRange),
        ]);
        const filteredEventDataResponse = responses[0];

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
        console.error("Error fetching data from APIs:", error);
      }
    },
    formatNumber(number) {
      return Number.isInteger(number)
        ? number.toLocaleString()
        : number.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    },
    formatDate(date) {
      return date ? date.toISOString().split('T')[0] : null;
    },
  },
  async mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }

    this.fetchAllEventData();
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style scoped>
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
  color: black;
  background-color: white;
  padding: 5px;
  /* border-radius: 5px; */
  border: 1px solid #ccc;
  margin: 5px;
  font-family: arial;
  height: 45px;
  line-height: 40px;
}

.search-timerange {
  color: black;
  background-color: white;
  padding: 5px;
  /* border-radius: 5px; */
  border: 1px solid #ccc;
  margin: 5px;
  font-family: arial;
  height: 45px;
  line-height: 40px;
}

.datepicker-style {
  height: 40px;
  line-height: 40px;
  margin: 5px;
  font-family: Arial;
  /* width: 150px; */
}

.select {
  width: calc(100% - 40px);
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
}

.search-button {
  margin-left: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  cursor: pointer;
  color: white;
  height: 45px;
  /* width: 30px; */
}

.reset-button {
  color: black;
  background-color: grey;
  border: 2px solid grey;
  border-radius: 5px;
  padding: 2px 20px;
  font-size: 14px;
  cursor: pointer;
  margin: 5px;
  margin-left: 20px;
  height: 40px;
  width: 130px;
}

.d-flex {
  display: flex;
}

</style>
