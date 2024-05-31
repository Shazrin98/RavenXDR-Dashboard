<template>
  <div>
    <div class="row">
      <div class="col-lg-8">
        <card>
          <div class="row-filter">
            <p class="text-success filter-text">Time Filters</p>
          </div>
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
              <base-button type="success" icon @click="resetFilters" class="reset-button">
                <i class="tim-icons icon-refresh-02"></i>
              </base-button>
            </div>
          </div>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <div class="row-refresh">
            <p class="text-success refresh-text">Refresh Rate</p>
          </div>
          <div class="row-refresh">
            <div>
              <select v-model="refreshRate" class="refresh-dropdown">
                <option value="" disabled selected>Refresh Rate</option>
                <option value="">No Refresh Rate</option>
                <option value="5000">Every 5 seconds</option>
                <option value="10000">Every 10 seconds</option>
                <option value="15000">Every 15 seconds</option>
              </select>
            </div>
          </div>
        </card>
      </div>
    </div>
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
              </div>
            </div>
          </template>
          <div class="double-line-chart-area">
            <apexchart type="line" height="350" :options="bigLineChartOptions" :series="bigLineChartSeries"
              class="double-line-chart"></apexchart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card>
          <gauge :title="'Risk Scale Meter'" :value="riskyEventPercentage" />
        </card>
      </div>
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
              Traffic Severity By GovNet Source
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="severityData in droppedTrafficSeverityGovNet" :key="severityData.key">
                {{ capitalizeFirstLetter(severityData.key) }}:
                {{ formatNumber(severityData.docCount) }}
              </li>
            </ul>
            <div class="donut-chart-area">
              <apexchart type="donut" width="380" :options="droppedTrafficSeverityGovNetChartOptions"
                :series="droppedTrafficSeverityGovNetSeries"></apexchart>
              <!-- ///////////////////////////////////////////////////////////////////////////// -->
            </div>
          </template>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              Traffic Severity By Internet Source
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="severityData in droppedTrafficSeverityInternet" :key="severityData.key">
                {{ capitalizeFirstLetter(severityData.key) }}:
                {{ formatNumber(severityData.docCount) }}
              </li>
            </ul>
            <div class="donut-chart-area">
              <apexchart type="donut" width="380" :options="droppedTrafficSeverityInternetChartOptions"
                :series="droppedTrafficSeverityInternetSeries"></apexchart>
              <!-- ///////////////////////////////////////////////////////////////////////////// -->
            </div>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-lg-12" :class="{ 'text-right': isRTL }"> -->
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <!-- ///////////////////////////////////////// -->
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-globe-2 text-success"></i>
              {{ $t("dashboard.top5CountryTrafficAllowed") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="countryData in top5CountryTrafficAllowed" :key="countryData.key" class="country-list">
                <country-flag :country="getCountryCode(countryData.key)" svg class="country-flag" />
                {{ countryData.key }}: {{ formatNumber(countryData.docCount) }}
              </li>
            </ul>
            <div class="donut-chart-area">
              <apexchart type="donut" :options="top5CountryTrafficAllowedChartOptions"
                :series="top5CountryTrafficAllowedSeries"></apexchart>
              <!-- ///////////////////////////////////////////////////////////////////////////// -->
            </div>
          </template>
        </card>
        <!-- ///////////////////////////////////////// -->
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <!-- ///////////////////////////////////////// -->
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-globe-2 text-success"></i>
              {{ $t("dashboard.top5CountryTrafficBlocked") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="countryData in top5CountryTrafficBlocked" :key="countryData.key">
                <country-flag :country="getCountryCode(countryData.key)" svg class="country-flag" />
                {{ countryData.key }}: {{ formatNumber(countryData.docCount) }}
              </li>
            </ul>
            <div class="donut-chart-area">
              <apexchart type="donut" :options="top5CountryTrafficBlockedChartOptions"
                :series="top5CountryTrafficBlockedSeries"></apexchart>
              <!-- ///////////////////////////////////////////////////////////////////////////// -->
            </div>
          </template>
        </card>
        <!-- ///////////////////////////////////////// -->
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
          <div class="bar-chart-area">
            <apexchart type="bar" :options="vpnUsersConnectedChartOptions" :series="vpnUsersConnectedSeries">
            </apexchart>
            <!-- ///////////////////////////////////////////////////////////////////////////// -->
          </div>
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
    <div class="row">
      <div class="col-lg-12 col-md-12" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Endpoint Severity</h5>
          </template>
          <div class="bar-chart-area">
            <bar-chart style="height: 100%" chart-id="blue-bar-chart" :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops" :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import Gauge from "@/components/Gauge/Gauge.vue";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import * as apiService from "@/services/api.service";
import Datepicker from 'vuejs-datepicker';
import { format } from 'date-fns';
import VueApexCharts from 'vue-apexcharts';
import CountryFlag from 'vue-country-flag';
import { countryCodes } from '@/utils/countryCodes';
///////////////////////////////////////////////////////////////////////////////
// import VueTimepicker from 'vue-time-picker';
// import { capitalizeFirstLetter, formatNumber, formatDate } from '@/utils/helpers';
//////////////////////////////////////////////////////////////////////////////

export default {
  components: {
    LineChart,
    BarChart,
    Gauge,
    Datepicker,
    apexchart: VueApexCharts,
    CountryFlag,
    //////////////////////////////////////
    // VueTimepicker,
    //////////////////////////////////////
  },
  data() {
    return {
      autoRefresh: false,
      refreshRate: null,
      refreshInterval: null,
      selectedTimeRange: '',
      customStartDate: null,
      customEndDate: null,
      customStartDatePlaceholder: 'Choose a START date',
      customEndDatePlaceholder: 'Choose an END date',
      riskyEventPercentage: 0,
      timeRange: {},
      allowedTraffic: 0,
      droppedTraffic: 0,
      // droppedTrafficSeverityGovNet: 0,
      // droppedTrafficSeverityInternet: 0,
      // top5CountryTrafficAllowed: 0,
      // top5CountryTrafficBlocked: 0,
      // vpnUsersConnected: 0,
      successfulReceivedEmail: 0,
      quarantinedReceivedEmail: 0,
      failedReceivedEmail: 0,
      top10AppsUsedInternally: 0,
      top10RequestedAppsGovNet: 0,
      top10RequestedAppsInternet: 0,
      selectedOption: "Allowed",
      ////////////////////////////////////////////////////////////////////
      severityColorMap: {
        low: '#33cc33',   // Green
        medium: '#e6e600', // Yellow
        high: '#ff3300',   // Red
      },
      droppedTrafficSeverityGovNet: [],
      droppedTrafficSeverityGovNetSeries: [],
      droppedTrafficSeverityGovNetChartOptions: {
        chart: {
          width: 380,
          type: 'donut',
        },
        labels: [],
        legend: {
          position: 'bottom',
          formatter: (seriesName, opts) => {
            const color = opts.w.globals.colors[opts.seriesIndex];
            return `<span style="color: ${color}">${seriesName}</span>`;
          },
        },
        ////////////////////////////
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      droppedTrafficSeverityInternet: [],
      droppedTrafficSeverityInternetSeries: [],
      droppedTrafficSeverityInternetChartOptions: {
        chart: {
          width: 380,
          type: 'donut',
        },
        labels: [],
        legend: {
          position: 'bottom',
          formatter: (seriesName, opts) => {
            const color = opts.w.globals.colors[opts.seriesIndex];
            return `<span style="color: ${color}">${seriesName}</span>`;
          },
        },
        ////////////////////////////
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      ///////////////////////////////////////////////////////////////////
      top5CountryTrafficAllowed: [],
      top5CountryTrafficAllowedSeries: [],
      top5CountryTrafficAllowedChartOptions: {
        chart: {
          width: 380,
          type: 'donut',
        },
        labels: [],
        legend: {
          position: 'bottom',
          formatter: (seriesName, opts) => {
            const color = opts.w.globals.colors[opts.seriesIndex];
            return `<span style="color: ${color}">${seriesName}</span>`;
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      top5CountryTrafficBlocked: [],
      top5CountryTrafficBlockedSeries: [],
      top5CountryTrafficBlockedChartOptions: {
        chart: {
          width: 380,
          type: 'donut',
        },
        labels: [],
        legend: {
          position: 'bottom',
          formatter: (seriesName, opts) => {
            const color = opts.w.globals.colors[opts.seriesIndex];
            return `<span style="color: ${color}">${seriesName}</span>`;
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      ////////////////////////////////////////////////////////////////////
      vpnUsersConnected: [],
      vpnUsersConnectedSeries: [],
      vpnUsersConnectedChartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#ffffff', // White color for x-axis labels
              fontSize: '12px'
            }
          },
          title: {
            style: {
              color: '#ffffff', // White color for x-axis title
              fontSize: '14px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#ffffff', // White color for y-axis labels
              fontSize: '12px'
            }
          },
          title: {
            style: {
              color: '#ffffff', // White color for y-axis title
              fontSize: '14px'
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val, opts) {
              return opts.w.globals.labels[opts.dataPointIndex] + ": " + val;
            }
          },
          style: {
            fontSize: '12px',
            fontFamily: undefined
          },
        },
        grid: {
          borderColor: '#f1f1f1'
        },
      },
      //////////////////////////////////////////////////////////////
      bigLineChartSeries: [
        {
          name: 'Allowed',
          data: [],
          color: '#00FF00', // Green
        },
        {
          name: 'Blocked',
          data: [],
          color: '#FF0000', // Red
        },
      ],
      bigLineChartOptions: {
        chart: {
          height: 350,
          type: 'line',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories: [
            "1 Week Ago",
            "2 Weeks Ago",
            "3 Weeks Ago",
            "4 Weeks Ago",
            "5 Weeks Ago",
            "6 Weeks Ago",
            "7 Weeks Ago"
          ],
          labels: {
            style: {
              colors: '#FFFFFF',
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#FFFFFF',
            },
            formatter: (value) => {
              return value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              });
            },
          }
        },
        tooltip: {
          y: {
            formatter: (value) => {
              if (value !== undefined) {
                return value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                });
              }
              return '';
            },
          },
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
        legend: {
          labels: {
            colors: ['#00FF00', '#FF0000'], // Green for "Allowed", Red for "Blocked"
            useSeriesColors: false,
          },
        },
      },
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
  watch: {
    refreshRate(newVal) {
      if (newVal !== "") {
        this.stopAutoRefresh();
        this.startAutoRefresh();
      } else {
        this.stopAutoRefresh();
      }
    },
  },
  methods: {
    startAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
      }
      const timeRange = this.timeRange;

      console.log("startAutoRefresh timeRange:", timeRange);

      this.refreshInterval = setInterval(() => {
        this.fetchData(timeRange);
      }, this.refreshRate);

      console.log("startAutoRefresh this.refreshInterval:", this.refreshInterval);
    },
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;

        console.log("stopAutoRefresh this.refreshInterval:", this.refreshInterval);
      }
    },
    resetFilters() {
      this.selectedTimeRange = '',
        this.customStartDate = null,
        this.customEndDate = null,
        this.fetchData(this.selectedTimeRange);
    },
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
    getCountryCode(countryName) {
      return countryCodes[countryName] || '';
    },
    async fetchTimeDateData() {
      try {
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

        this.fetchData(timeRange);

        console.log("fetchTimeDateData timeRange:", timeRange);


      } catch (error) {
        console.error('Error fetching TimeDate data:', error);
      }
    },
    ////////////////////////////////////////////////////////////////////
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
              backgroundColor: "#5a8dee",
              data: [0, 0, 0, 0, 0]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      };
    },
    ////////////////////////////////////////////////////////////////////////////
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
          apiService.getTotalEventNumbers(this.timeRange),
          apiService.getRiskyEventNumbers(this.timeRange),
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
        ///////////////////////////////////////////////////////////////////////////////////////////
        this.updateDroppedTrafficSeverityGovNetChartData();
        this.updateDroppedTrafficSeverityInternetChartData();
        this.updateTop5CountryTrafficAllowedChartData();
        this.updateTop5CountryTrafficBlockedChartData();
        this.updateVpnUsersConnectedChartData();
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
      } catch (error) {
        console.error("Error fetching data from APIs:", error);
      }
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////
    extractBuckets(response, aggregationKey) {
      return response.aggregations[aggregationKey]?.buckets.map((bucket) => ({
        key: bucket.key,
        docCount: bucket.doc_count,
      })) || [];
    },
    /////////////////////////////////////////////////////////////////////////
    async updateDroppedTrafficSeverityGovNetChartData() {
      this.droppedTrafficSeverityGovNetSeries = this.droppedTrafficSeverityGovNet.map(data => data.docCount);
      this.droppedTrafficSeverityGovNetChartOptions = {
        ...this.droppedTrafficSeverityGovNetChartOptions,
        labels: this.droppedTrafficSeverityGovNet.map(data => this.capitalizeFirstLetter(data.key)),
        colors: this.droppedTrafficSeverityGovNet.map(data => this.severityColorMap[data.key]),
      };
    },
    async updateDroppedTrafficSeverityInternetChartData() {
      this.droppedTrafficSeverityInternetSeries = this.droppedTrafficSeverityInternet.map(data => data.docCount);
      this.droppedTrafficSeverityInternetChartOptions = {
        ...this.droppedTrafficSeverityInternetChartOptions,
        labels: this.droppedTrafficSeverityInternet.map(data => this.capitalizeFirstLetter(data.key)),
        colors: this.droppedTrafficSeverityInternet.map(data => this.severityColorMap[data.key]),
      };
    },
    updateTop5CountryTrafficAllowedChartData() {
      this.top5CountryTrafficAllowedSeries = this.top5CountryTrafficAllowed.map(data => data.docCount);
      this.top5CountryTrafficAllowedChartOptions = {
        ...this.top5CountryTrafficAllowedChartOptions,
        labels: this.top5CountryTrafficAllowed.map(data => this.capitalizeFirstLetter(data.key))
      };
    },
    updateTop5CountryTrafficBlockedChartData() {
      this.top5CountryTrafficBlockedSeries = this.top5CountryTrafficBlocked.map(data => data.docCount);
      this.top5CountryTrafficBlockedChartOptions = {
        ...this.top5CountryTrafficBlockedChartOptions,
        labels: this.top5CountryTrafficBlocked.map(data => this.capitalizeFirstLetter(data.key))
      };
    },
    updateVpnUsersConnectedChartData() {
      this.vpnUsersConnectedSeries = [{
        data: this.vpnUsersConnected.map(data => data.docCount)
      }];
      this.vpnUsersConnectedChartOptions = {
        ...this.vpnUsersConnectedChartOptions,
        xaxis: {
          categories: this.vpnUsersConnected.map(data => this.capitalizeFirstLetter(data.key))
        }
      };
    },
    //////////////////////////////////////////////////////////////////////////////////////////////
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
            return "#5a8dee";
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
    async fetchDataForWeek(weekNumber) {
      try {
        const [allowedTrafficResponse, droppedTrafficResponse] = await Promise.all([
          apiService[`getAllowedTrafficWeek${weekNumber}`](),
          apiService[`getDroppedTrafficWeek${weekNumber}`]()
        ]);

        const allowedTraffic = allowedTrafficResponse.count;
        const blockedTraffic = droppedTrafficResponse.count;

        return { allowedTraffic, blockedTraffic };
      } catch (error) {
        console.error(`Failed to fetch traffic data for week ${weekNumber}:`, error);
        throw new Error(`Failed to fetch traffic data for week ${weekNumber}: ${error.message}`);
      }
    },
    async initBigChart() {
      try {
        const promises = [];
        for (let i = 1; i <= 7; i++) {
          promises.push(this.fetchDataForWeek(i));
        }

        const results = await Promise.all(promises);
        const allowedData = results.map(result => result.allowedTraffic);
        const blockedData = results.map(result => result.blockedTraffic);

        this.bigLineChartSeries = [
          {
            name: 'Allowed',
            data: allowedData,
            color: '#00FF00',
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
          },
          {
            name: 'Blocked',
            data: blockedData,
            color: '#FF0000',
            fill: true,
            borderColor: config.colors.danger,
            borderWidth: 2,
            pointBackgroundColor: config.colors.danger,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
          },
        ];
      } catch (error) {
        console.error('Error initializing chart:', error);
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
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  async mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    await this.initBigChart();
    await this.fetchTimeDateData();
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
  /* margin-top: 13px; */
  margin-left: 15px;
  font-family: Arial;
  margin-top: 5px;
}

.search-timerange {
  color: black;
  background-color: white;
  padding: 5px;
  /* border-radius: 5px; */
  border: 1px solid #ccc;
  margin-left: 15px;
  margin-top: 5px;
  font-family: arial;
  height: 45px;
  line-height: 40px;
  width: 170px
}

.reset-button {
  margin-top: 10px;
  margin-left: 25px;
  /* margin-bottom: 0px; */
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
  /* justify-content: center; */
}

.row-filter {
  margin-left: 0px;
  display: flex;
  align-items: center;
}

.refresh-checkbox {
  margin-top: 5px;
  border-radius: 5px;
  height: 20px;
  width: 20px;
}

.refresh-dropdown {
  margin-left: 0px;
  border-radius: 5px;
  margin-bottom: 18px;
  margin-top: 10px;
}

.refresh-text {
  font-size: 18px
}

.filter-text {
  font-size: 18px
}

.double-line-chart-area {
  width: 100%;
}

/* .bar-chart-area {
  height: 300px;
  width: 100%;
} */

.country-flag {}

.country-list {}
</style>
