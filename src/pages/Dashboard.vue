<template>
  <div>
    <!-- ////////////////////////// -->

    <!-- ////////////////////////// -->
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{ $t("dashboard.totalShipments") }}
                  Traffic
                </h5>
                <h2 class="card-title text-warning">
                  {{ $t("dashboard.performance") }}
                  Activity
                </h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle" :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories" :key="option"
                    class="btn btn-sm btn-primary btn-simple" :class="{ active: bigLineChart.activeIndex === index }"
                    :id="index">
                    <input type="radio" @click="initBigChart(index)" name="options" autocomplete="off"
                      :checked="bigLineChart.activeIndex === index" />
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
    <!-- //////////////////////////// -->
    <!-- /////////////////////////////// -->
    <div class="row">
      <!-- ///////////////////////// -->
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
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
      <!-- //////////////////////////// -->
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.droppedTraffic") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ droppedTraffic }}
            </h3>
          </template>
        </card>
      </div>
      <!-- ///////////////////////// -->
    </div>
    <!-- ////////////////////////// -->
    <div class="row">
      <!-- ///////////////////////// -->
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.droppedTrafficSeverityGovNet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="severityData in droppedTrafficSeverityGovNet" :key="severityData.key">
                {{ severityData.key }}: {{ formatNumber(severityData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <!-- //////////////////////////// -->
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.droppedTrafficSeverityInternet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="severityData in droppedTrafficSeverityInternet" :key="severityData.severity">
                {{ severityData.severity }}: {{ severityData.count }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <!-- //////////////////// -->
    </div>
    <!-- ///////////////////////// -->
    <div class="row">
      <!-- ///////////////////////// -->
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-globe-2 text-success"></i>
              {{ $t("dashboard.top5CountryTrafficAllowed") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="countryData in top5CountryTrafficAllowed" :key="countryData.severity">
                {{ countryData.country }}: {{ countryData.count }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <!-- //////////////////////////// -->
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-globe-2 text-success"></i>
              {{ $t("dashboard.top5CountryTrafficBlocked") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="countryData in top5CountryTrafficBlocked" :key="countryData.severity">
                {{ countryData.country }}: {{ countryData.count }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <!-- //////////////////// -->
    </div>
    <!-- ///////////////////////////////////// -->
    <div class="row">
      <!-- //////////////////////////// -->
      <div class="col-lg-12" :class="{ 'text-right': isRTL }">
        <card>
          <h5 class="card-category text-info">
            <i class="tim-icons icon-single-02 text-success"></i>
            {{ $t("dashboard.vpnUsersConnected") }}
          </h5>
          <ul class="list-group list-group-flush list-unstyled">
            <li v-for="(user, index) in vpnUsersConnected" :key="index">
              <i class="tim-icons icon-single-02 text-success"></i> {{ user }}
            </li>
          </ul>
        </card>
      </div>
      <!-- //////////////////// -->
    </div>
    <!-- /////////////////////////////////// -->
    <div class="row">
      <!-- ///////////////////////// -->
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.successfulReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ successfulReceivedEmail }}
            </h3>
          </template>
        </card>
      </div>
      <!-- //////////////////////////// -->
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.quarantinedReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ quarantinedReceivedEmail }}
            </h3>
          </template>
        </card>
      </div>
      <!-- ///////////////////////// -->
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.failedReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ failedReceivedEmail }}
            </h3>
          </template>
        </card>
      </div>
      <!-- //////////////////// -->
    </div>
    <!-- //////////////////////////////// -->
    <div class="row">
      <!-- ///////////////////////// -->
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10AppsUsedInternally") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="appData in top10AppsUsedInternally" :key="appData.app">
                {{ appData.app }}: {{ appData.count }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <!-- //////////////////////////// -->
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10RequestedAppsGovNet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="domainData in top10RequestedAppsGovNet" :key="domainData.domain">
                {{ domainData.domain }}: {{ domainData.count }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <!-- ///////////////////////// -->
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10RequestedAppsInternet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="domainData in top10RequestedAppsInternet" :key="domainData.domain">
                {{ domainData.domain }}: {{ domainData.count }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <!-- //////////////////// -->
    </div>
    <!-- //////////////////// -->
    <!-- /////////////////////// -->

  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import { MotCounts } from "@/data/mockData.js";
import { getAllowedTraffic } from '@/services/api.service';
import { getDroppedTrafficSeverityGovNet } from '@/services/api.service';

export default {
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      allowedTraffic: 0, /////////////////////////////////
      droppedTraffic: 0,
      droppedTrafficSeverityGovNet: 0,////////////////////
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
      ///////////////////////////////////////////////////////////////////
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
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
      return this.$t("dashboard.chartCategories");
    },
  },
  /////////////////////////////////////////////////////////////////
  async created() {
    this.$root.$on('timeRangeChanged', this.fetchData);
  },

  destroyed() {
    this.$root.$off('timeRangeChanged', this.fetchData);
  },
  ///////////////////////////////////////////////////////
  methods: {
    ///////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    async fetchData(timeRange) {
      try {
        // If timeRange is not provided, use the default value from the route query parameters
        if (!timeRange) {
          timeRange = {
            gte: this.$route.query.gte,
            lte: this.$route.query.lte,
            format: 'yyyy-MM-dd',
          };
        }

        console.log('Dashboard fetchData timeRange:', timeRange);//////////////////

        // Allowed Traffic
        const allowedTrafficResponse = await getAllowedTraffic(timeRange);
        console.log('Dashboard fetchData allowedTrafficResponse:', allowedTrafficResponse);//////////////////
        this.allowedTraffic = allowedTrafficResponse && allowedTrafficResponse.count ? allowedTrafficResponse.count : 0;

        // Dropped Traffic Severity By GovNet Source
        const droppedTrafficSeverityGovNetResponse = await getDroppedTrafficSeverityGovNet(timeRange);
        console.log('Dashboard fetchData droppedTrafficSeverityGovNetResponse:', droppedTrafficSeverityGovNetResponse);
        // Extract relevant data from the dropped traffic severity response
        const buckets = droppedTrafficSeverityGovNetResponse.aggregations.top_attacks.buckets;
        // Map the extracted data to get an array of objects with keys and doc counts
        const droppedTrafficSeverityData = buckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        // Update droppedTrafficSeverityGovNet with the new data
        this.droppedTrafficSeverityGovNet = droppedTrafficSeverityData;



      } catch (error) {
        console.error('Error fetching allowed traffic:', error);
      }
    },
    ///////////////////////////////////////////////////////////
    formatNumber(number) {
      if (Number.isInteger(number)) {
        return number.toLocaleString(); // Format integer numbers with commas using toLocaleString
      } else {
        return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Format floating-point numbers with decimal points and commas
      }
    },
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
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
@import '~@fortawesome/fontawesome-free/css/all.css';
</style>
