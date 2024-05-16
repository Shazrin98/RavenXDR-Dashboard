<template>
  <div>
    <!-- ///////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="row">
      <div class="col-lg-8">
        <card>
          <div class="row">
            <div>
              <select v-model="selectedTimeRange" @change="handleTimeRangeChange" class="search-timerange">
                <option value="" disabled selected>Time Range</option>
                <option value="5m">Last 5 minutes</option>
                <option value="10m">Last 10 minutes</option>
                <option value="30m">Last 30 minutes</option>
                <option value="1h">Last 1 hour</option>
                <option value="1d">Last 1 day</option>
                <option value="7d">Last 7 days</option>
              </select>
            </div>

            <div>
              <datepicker v-model="customStartDate" placeholder="Start Date" @input="handleCustomStartDateChange"
                class="datepicker-style"></datepicker>
            </div>
            <div>
              <datepicker v-model="customEndDate" placeholder="End Date" @input="handleCustomEndDateChange"
                class="datepicker-style"></datepicker>
            </div>

            <div>
              <base-button type="success" icon size="md" class="search-button">
                <i class="tim-icons icon-zoom-split"></i>
              </base-button>
            </div>
          </div>
          <div class="row">
            <button @click="resetFilters" class="reset-button">Reset Filters</button>
          </div>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <p class="text-success">Refresh Switch</p>
          <div class="row-refresh">
            <div>
              <input type="checkbox" v-model="autoRefresh" id="autoRefresh" class="refresh-checkbox">
            </div>
            <div>
              <select v-model="refreshRate" class="refresh-dropdown">
                <option value="" disabled selected>Choose Refresh Rate</option>
                <option value="10000">Every 10 seconds</option>
                <option value="60000"> Every 1 minute</option>
              </select>
            </div>
          </div>
        </card>
      </div>
    </div>
    <!-- //////////////////////////////////////////////////////////////////////////////////// -->
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{ $t("dashboard.totalCombination") }}
                  Traffic
                </h5>
                <h2 class="card-title text-warning">
                  {{ $t("dashboard.traffic") }}
                  Activity
                </h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle" :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories" :key="option"
                    class="btn btn-sm btn-primary btn-simple" :class="{ active: selectedOption === option }"
                    :id="index">
                    <input type="radio" @click="initBigChart(option)" name="options" autocomplete="off"
                      :checked="selectedOption === option" />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%" ref="bigChart" chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData" :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops" :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <!-- ////////////////////////////////////////////////////////////////////// -->
    <div class="row">
      <!-- /////////////////////////////////////////////////////////////////////// -->
      <div class="col-lg-6 col-md-12">
        <card>
          <gauge :title="'Risk Scale Meter'" :value="riskyEventPercentage" />
        </card>
      </div>
      <!-- /////////////////////////////////////////////////////////////////// -->
      <div class="col-lg-6 col-md-12" :class="{ 'text-right': isRTL }">
        <div class="row">
          <div class="col-lg-12" :class="{ 'text-right': isRTL }">
            <card>
              <template slot="header">
                <h5 class="card-category text-info">
                  <i class="tim-icons icon-delivery-fast text-success"></i>
                  {{ $t("dashboard.allowedTraffic") }}
                </h5>
                <h3 class="card-title">
                  <i class="tim-icons icon-delivery-fast text-success"></i>
                  {{ formatNumber(allowedTraffic) }}
                </h3>
              </template>
            </card>
          </div>
          <div class="col-lg-12" :class="{ 'text-right': isRTL }">
            <card>
              <template slot="header">
                <h5 class="card-category text-info">
                  <i class="tim-icons icon-delivery-fast text-success"></i>
                  {{ $t("dashboard.droppedTraffic") }}
                </h5>
                <h3 class="card-title">
                  <i class="tim-icons icon-delivery-fast text-success"></i>
                  {{ formatNumber(droppedTraffic) }}
                </h3>
              </template>
            </card>
          </div>
        </div>
      </div>
      <!-- //////////////////////////////////////////////////////////////////////// -->
    </div>
    <!-- //////////////////////////////////////////////////////////////////////////////////// -->
    <div class="row">
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.droppedTrafficSeverityGovNet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="severityData in droppedTrafficSeverityGovNet" :key="severityData.key">
                {{ severityData.key }}:
                {{ formatNumber(severityData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.droppedTrafficSeverityInternet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="severityData in droppedTrafficSeverityInternet" :key="severityData.key">
                {{ severityData.key }}:
                {{ formatNumber(severityData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-globe-2 text-success"></i>
              {{ $t("dashboard.top5CountryTrafficAllowed") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="countryData in top5CountryTrafficAllowed" :key="countryData.key">
                {{ countryData.key }}: {{ formatNumber(countryData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-globe-2 text-success"></i>
              {{ $t("dashboard.top5CountryTrafficBlocked") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="countryData in top5CountryTrafficBlocked" :key="countryData.key">
                {{ countryData.key }}: {{ formatNumber(countryData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12" :class="{ 'text-right': isRTL }">
        <card>
          <h5 class="card-category text-info">
            <i class="tim-icons icon-single-02 text-success"></i>
            {{ $t("dashboard.vpnUsersConnected") }}
          </h5>
          <ul class="list-group list-group-flush list-unstyled">
            <li v-for="vpnUserData in vpnUsersConnected" :key="vpnUserData.key">
              <i class="tim-icons icon-single-02 text-success"></i>
              {{ vpnUserData.key }}: {{ formatNumber(vpnUserData.docCount) }}
            </li>
          </ul>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.successfulReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ formatNumber(successfulReceivedEmail) }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.quarantinedReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ formatNumber(quarantinedReceivedEmail) }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.failedReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ formatNumber(failedReceivedEmail) }}
            </h3>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10AppsUsedInternally") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="appData in top10AppsUsedInternally" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10RequestedAppsGovNet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="appData in top10RequestedAppsGovNet" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10RequestedAppsInternet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="appData in top10RequestedAppsInternet" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </div>
    <!-- ////////////////////////////////////////////////////////////////////////////// -->
    <div class="row">
      <!-- /////////////////////////////////////////////////////////////////////// -->
      <div class="col-lg-12 col-md-12" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Endpoint Severity</h5>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%" chart-id="blue-bar-chart" :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops" :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
      <!-- //////////////////////////////////////////////////////////////////////// -->
    </div>
    <!-- ////////////////////////////////////////////////////////////////////////////// -->
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import Gauge from "@/components/Gauge/Gauge.vue";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import * as apiService from "@/services/api.service";
//////////////////////////////////////////////////////////////////////////////
import Datepicker from 'vuejs-datepicker'; // Import the Datepicker component
import { format } from 'date-fns';
import VueTimepicker from 'vue-time-picker';

export default {
  components: {
    LineChart,
    BarChart,
    Gauge,
    Datepicker,
    VueTimepicker,
  },
  data() {
    return {
      autoRefresh: false,
      refreshRate: 0,
      ////////////////////////////////////////////////
      selectedTimeRange: '',
      customStartDate: null,
      customEndDate: null,
      customStartDatePlaceholder: 'Choose a START date',
      customEndDatePlaceholder: 'Choose an END date',
      ////////////////////////////////////////////////
      riskyEventPercentage: 0,
      timeRange: {},
      allowedTraffic: 0,
      droppedTraffic: 0,
      droppedTrafficSeverityGovNet: 0,
      droppedTrafficSeverityInternet: 0,
      top5CountryTrafficAllowed: 0,
      top5CountryTrafficBlocked: 0,
      vpnUsersConnected: 0,
      successfulReceivedEmail: 0,
      quarantinedReceivedEmail: 0,
      failedReceivedEmail: 0,
      top10AppsUsedInternally: 0,
      top10RequestedAppsGovNet: 0,
      top10RequestedAppsInternet: 0,
      selectedOption: "Allowed",
      bigLineChart: this.initializeBigLineChart(),
      blueBarChart: this.initializeBlueBarChart(),
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategoriesTraffic");
    },
  },
  async created() {
    this.$root.$on("timeRangeChanged", this.fetchData);
  },
  beforeDestroy() {
    this.$root.$off("timeRangeChanged", this.fetchData);
    if (this.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
  methods: {
    ///////////////////////////////////////////////////////////////////////
    resetFilters() {
      this.selectedTimeRange = '',
        this.customStartDate = null,
        this.customEndDate = null,
        this.fetchData(this.selectedTimeRange);
    },
    ////////////////////////////////////////////////////////////////////////
    handleTimeRangeChange() {
      const selectedTimeRange = this.selectedTimeRange;
      this.selectedTimeRange = selectedTimeRange;
      this.customStartDate = null;
      this.customEndDate = null;
      this.fetchTimeDateData();
      console.log("handleTimeRangeChange this.selectedTimeRange:", this.selectedTimeRange);
    },
    handleCustomStartDateChange() {
      const selectedStartDate = this.customStartDate;
      const formattedStartDate = format(selectedStartDate, 'yyyy-MM-dd');
      this.customStartDate = formattedStartDate;
      this.selectedTimeRange = '';
      this.fetchTimeDateData();
      console.log("handleCustomStartDateChange this.customStartDate:", this.customStartDate);

    },
    handleCustomEndDateChange() {
      const selectedEndDate = this.customEndDate;
      const formattedEndDate = format(selectedEndDate, 'yyyy-MM-dd');
      this.customEndDate = formattedEndDate;
      this.selectedTimeRange = '';
      this.fetchTimeDateData();
      console.log("handleCustomEndDateChange this.customEndDate:", this.customEndDate);
    },
    async fetchTimeDateData() {
      try {
        let timeRange;
        if (this.selectedTimeRange !== '') {
          // Use predefined time range
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
          // Use custom date range if selected
          timeRange = {
            gte: this.customStartDate,
            lte: this.customEndDate,
            format: 'yyyy-MM-dd',
          };
        }

        this.fetchData(timeRange);

        console.log("fetchTimeDateData timeRange:", timeRange);


      } catch (error) {
        console.error('Error fetching TimeDate data:', error);
      }
    },
    //////////////////////////////////////////////////////////////////////////////
    initializeBigLineChart() {
      return {
        allData: [],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
            "1 Week Ago",
            "2 Weeks Ago",
            "3 Weeks Ago",
            "4 Weeks Ago",
            "5 Weeks Ago",
            "6 Weeks Ago",
            "7 Weeks Ago",
          ],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      };
    },
    initializeBlueBarChart() {
      return {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ['INFO', 'High', 'Low', 'Informational', 'Medium'],
          datasets: [
            {
              label: "Severity Counts",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 0,
              borderDash: [],
              borderDashOffset: 0.0,
              backgroundColor: "#5a8dee", // Bar color
              data: [0, 0, 0, 0, 0]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      };
    },
    async fetchData(timeRange = this.timeRange) {
      this.timeRange = timeRange || {
        gte: this.$route.query.gte,
        lte: this.$route.query.lte,
        format: "yyyy-MM-dd",
      };

      try {
        const responses = await Promise.all([
          apiService.getAllowedTraffic(this.timeRange),
          apiService.getDroppedTraffic(this.timeRange),
          apiService.getSuccessfulReceivedEmail(this.timeRange),
          apiService.getQuarantinedReceivedEmail(this.timeRange),
          apiService.getFailedReceivedEmail(this.timeRange),
          apiService.getDroppedTrafficSeverityGovNet(this.timeRange),
          apiService.getDroppedTrafficSeverityInternet(this.timeRange),
          apiService.getTop5CountryTrafficAllowed(this.timeRange),
          apiService.getTop5CountryTrafficBlocked(this.timeRange),
          apiService.getVpnUsersConnected(this.timeRange),
          apiService.getTop10AppsUsedInternally(this.timeRange),
          apiService.getTop10RequestedAppsGovNet(this.timeRange),
          apiService.getTop10RequestedAppsInternet(this.timeRange),
          apiService.getTotalEventNumbers(),
          apiService.getRiskyEventNumbers(),
          apiService.getEndpointSeverityNumbers(this.timeRange)
        ]);

        this.allowedTraffic = responses[0]?.count || 0;
        this.droppedTraffic = responses[1]?.count || 0;
        this.successfulReceivedEmail = responses[2]?.count || 0;
        this.quarantinedReceivedEmail = responses[3]?.count || 0;
        this.failedReceivedEmail = responses[4]?.count || 0;
        this.droppedTrafficSeverityGovNet = this.extractBuckets(responses[5], 'top_attacks');
        this.droppedTrafficSeverityInternet = this.extractBuckets(responses[6], 'top_attacks');
        this.top5CountryTrafficAllowed = this.extractBuckets(responses[7], 'top_countries');
        this.top5CountryTrafficBlocked = this.extractBuckets(responses[8], 'top_countries');
        this.vpnUsersConnected = this.extractBuckets(responses[9], 'top_users');
        this.top10AppsUsedInternally = this.extractBuckets(responses[10], 'top_websites');
        this.top10RequestedAppsGovNet = this.extractBuckets(responses[11], 'top_websites');
        this.top10RequestedAppsInternet = this.extractBuckets(responses[12], 'top_websites');

        const totalEventCount = responses[13].aggregations.total_count.doc_count;
        const riskyEventCount = responses[14].count;
        this.riskyEventPercentage = Number(((riskyEventCount / totalEventCount) * 100).toFixed(2));

        this.updateBlueBarChart(responses[15].aggregations.severity_counts.buckets);
      } catch (error) {
        console.error("Error fetching data from APIs:", error);
      }
    },
    extractBuckets(response, aggregationKey) {
      return response.aggregations[aggregationKey]?.buckets.map((bucket) => ({
        key: bucket.key,
        docCount: bucket.doc_count,
      })) || [];
    },
    updateBlueBarChart(buckets) {
      const labels = buckets.map(bucket => bucket.key);
      const counts = buckets.map(bucket => bucket.doc_count);
      const backgroundColors = labels.map(label => {
        switch (label.toLowerCase()) {
          case "info":
          case "informational":
            return "green";
          case "low":
          case "medium":
            return "yellow";
          case "high":
          case "critical":
            return "red";
          default:
            return "#5a8dee"; // Default color
        }
      });

      this.blueBarChart.chartData = {
        labels,
        datasets: [
          {
            label: "Severity Counts",
            fill: true,
            borderColor: config.colors.info,
            borderWidth: 0,
            borderDash: [],
            borderDashOffset: 0.0,
            data: counts,
            backgroundColor: backgroundColors,
          }
        ]
      };
    },
    async fetchDataForWeek(weekNumber, selectedOption) {
      try {
        const [allowedTrafficResponse, droppedTrafficResponse] = await Promise.all([
          apiService[`getAllowedTrafficWeek${weekNumber}`](),
          apiService[`getDroppedTrafficWeek${weekNumber}`]()
        ]);

        const weekTraffic = selectedOption === "Allowed" ? allowedTrafficResponse.count : droppedTrafficResponse.count;

        return { weekTraffic };
      } catch (error) {
        console.error(`Failed to fetch traffic data for week ${weekNumber}:`, error);
        throw new Error(`Failed to fetch traffic data for week ${weekNumber}: ${error.message}`);
      }
    },
    async initBigChart(selectedOption) {
      let index = 1;
      const weekNumber = index;

      try {
        const promises = [];
        let chartData = {
          datasets: [],
          labels: [
            "1 Week Ago",
            "2 Weeks Ago",
            "3 Weeks Ago",
            "4 Weeks Ago",
            "5 Weeks Ago",
            "6 Weeks Ago",
            "7 Weeks Ago",
          ],
        };

        for (let i = 1; i <= 7; i++) {
          promises.push(this.fetchDataForWeek(i, selectedOption));
        }

        const results = await Promise.all(promises);
        const trafficData = results.map(result => result.weekTraffic);

        const dataset = {
          data: trafficData,
          fill: true,
          borderColor: selectedOption === "Allowed" ? config.colors.primary : config.colors.danger,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: selectedOption === "Allowed" ? config.colors.primary : config.colors.danger,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: selectedOption === "Allowed" ? config.colors.primary : config.colors.danger,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
        };

        chartData.datasets.push(dataset);
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
        this.selectedOption = selectedOption;
      } catch (error) {
        console.error(
          `Error initializing chart for week ${weekNumber}:`,
          error
        );
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
  },
  async mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    await this.initBigChart(this.selectedOption);
    await this.fetchTimeDateData();/////////////////////////////////////////////////////////////////////
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

.datepicker-style {
  height: 40px;
  line-height: 40px;
  /* margin-top: 5px; */
  margin-left: 5px;
  font-family: Arial;
}

.search-timerange {
  color: black;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
  /* margin-top: 5px; */
  font-family: arial;
  height: 45px;
  line-height: 40px;
  width: 170px
}

.reset-button {
  color: black;
  background-color: grey;
  border: 2px solid grey;
  border-radius: 5px;
  padding: 2px 20px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 10px;
  height: 40px;
  width: 150px;
}

.search-button {
  margin-top: 5px;
  margin-left: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.row-refresh {
  display: flex;
  align-items: center;
  justify-content: left;
}

.refresh-checkbox {
  border-radius: 5px;
}

.refresh-dropdown {
  margin-left: 5px;
  border-radius: 5px;
}
</style>
