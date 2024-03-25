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
              {{ formatNumber(droppedTraffic) }}
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
              <li v-for="severityData in droppedTrafficSeverityInternet" :key="severityData.key">
                {{ severityData.key }}: {{ formatNumber(severityData.docCount) }}
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
              <li v-for="countryData in top5CountryTrafficAllowed" :key="countryData.key">
                {{ countryData.key }}: {{ formatNumber(countryData.docCount) }}
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
              <li v-for="countryData in top5CountryTrafficBlocked" :key="countryData.key">
                {{ countryData.key }}: {{ formatNumber(countryData.docCount) }}
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
            <li v-for="vpnUserData in vpnUsersConnected" :key="vpnUserData.key">
              <i class="tim-icons icon-single-02 text-success"></i> {{ vpnUserData.key }}: {{ formatNumber(vpnUserData.docCount) }}
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
              {{ formatNumber(successfulReceivedEmail) }}
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
              {{ formatNumber(quarantinedReceivedEmail) }}
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
              {{ formatNumber(failedReceivedEmail) }}
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
              <li v-for="appData in top10AppsUsedInternally" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
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
              <li v-for="appData in top10RequestedAppsGovNet" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
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
              <li v-for="appData in top10RequestedAppsInternet" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
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
import { getAllowedTraffic } from '@/services/api.service';
import { getDroppedTraffic } from '@/services/api.service';
import { getDroppedTrafficSeverityGovNet } from '@/services/api.service';
import { getDroppedTrafficSeverityInternet } from '@/services/api.service';
import { getTop5CountryTrafficAllowed } from '@/services/api.service';
import { getTop5CountryTrafficBlocked } from '@/services/api.service';
import { getVpnUsersConnected } from '@/services/api.service';
import { getSuccessfulReceivedEmail } from '@/services/api.service';
import { getQuarantinedReceivedEmail } from '@/services/api.service';
import { getFailedReceivedEmail } from '@/services/api.service';
import { getTop10AppsUsedInternally } from '@/services/api.service';
import { getTop10RequestedAppsGovNet } from '@/services/api.service';
import { getTop10RequestedAppsInternet } from '@/services/api.service';

export default {
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
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

        // Dropped Traffic
        const droppedTrafficResponse = await getDroppedTraffic(timeRange);
        console.log('Dashboard fetchData droppedTrafficResponse:', droppedTrafficResponse);//////////////////
        this.droppedTraffic = droppedTrafficResponse && droppedTrafficResponse.count ? droppedTrafficResponse.count : 0;

        // Successful Received Email
        const successfulReceivedEmailResponse = await getSuccessfulReceivedEmail(timeRange);
        console.log('Dashboard fetchData successfulReceivedEmailResponse:', successfulReceivedEmailResponse);//////////////////
        this.successfulReceivedEmail = successfulReceivedEmailResponse && successfulReceivedEmailResponse.count ? successfulReceivedEmailResponse.count : 0;

        // Quarantined Received Email
        const quarantinedReceivedEmailResponse = await getQuarantinedReceivedEmail(timeRange);
        console.log('Dashboard fetchData quarantinedReceivedEmailResponse:', quarantinedReceivedEmailResponse);//////////////////
        this.quarantinedReceivedEmail = quarantinedReceivedEmailResponse && quarantinedReceivedEmailResponse.count ? quarantinedReceivedEmailResponse.count : 0;

        // Failed Received Email
        const failedReceivedEmailResponse = await getFailedReceivedEmail(timeRange);
        console.log('Dashboard fetchData failedReceivedEmailResponse:', failedReceivedEmailResponse);//////////////////
        this.failedReceivedEmail = failedReceivedEmailResponse && failedReceivedEmailResponse.count ? failedReceivedEmailResponse.count : 0;

        // Dropped Traffic Severity By GovNet Source
        const droppedTrafficSeverityGovNetResponse = await getDroppedTrafficSeverityGovNet(timeRange);
        console.log('Dashboard fetchData droppedTrafficSeverityGovNetResponse:', droppedTrafficSeverityGovNetResponse);
        const DTSGNbuckets = droppedTrafficSeverityGovNetResponse.aggregations.top_attacks.buckets;
        const droppedTrafficSeverityGovNetData = DTSGNbuckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.droppedTrafficSeverityGovNet = droppedTrafficSeverityGovNetData;

        // Dropped Traffic Severity By Internet Source////////
        const droppedTrafficSeverityInternetResponse = await getDroppedTrafficSeverityInternet(timeRange);
        console.log('Dashboard fetchData droppedTrafficSeverityInternetResponse:', droppedTrafficSeverityInternetResponse);
        const DTSIbuckets = droppedTrafficSeverityInternetResponse.aggregations.top_attacks.buckets;
        const droppedTrafficSeverityInternetData = DTSIbuckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.droppedTrafficSeverityInternet = droppedTrafficSeverityInternetData;

        // Top 5 Country Traffic Allowed////////////
        const top5CountryTrafficAllowedResponse = await getTop5CountryTrafficAllowed(timeRange);
        console.log('Dashboard fetchData top5CountryTrafficAllowedResponse:', top5CountryTrafficAllowedResponse);
        const T5CTAbuckets = top5CountryTrafficAllowedResponse.aggregations.top_countries.buckets;
        const top5CountryTrafficAllowedData = T5CTAbuckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top5CountryTrafficAllowed = top5CountryTrafficAllowedData;

        // Top 5 Country Traffic Blocked//////////
        const top5CountryTrafficBlockedResponse = await getTop5CountryTrafficBlocked(timeRange);
        console.log('Dashboard fetchData top5CountryTrafficBlockedResponse:', top5CountryTrafficBlockedResponse);
        const T5CTBbuckets = top5CountryTrafficBlockedResponse.aggregations.top_countries.buckets;
        const top5CountryTrafficBlockedData = T5CTBbuckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top5CountryTrafficBlocked = top5CountryTrafficBlockedData;

        // VPN Users Connected/////////
        const vpnUsersConnectedResponse = await getVpnUsersConnected(timeRange);
        console.log('Dashboard fetchData vpnUsersConnectedResponse:', vpnUsersConnectedResponse);
        const VUCbuckets = vpnUsersConnectedResponse.aggregations.top_users.buckets;
        const vpnUsersConnectedData = VUCbuckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.vpnUsersConnected = vpnUsersConnectedData;

        // Top 10 Apps Used Internally//////////
        const top10AppsUsedInternallyResponse = await getTop10AppsUsedInternally(timeRange);
        console.log('Dashboard fetchData top10AppsUsedInternallyResponse:', top10AppsUsedInternallyResponse);
        const T10AUIbuckets = top10AppsUsedInternallyResponse.aggregations.top_websites.buckets;
        const top10AppsUsedInternallyData = T10AUIbuckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top10AppsUsedInternally = top10AppsUsedInternallyData;

        // Top 10 Requested Apps By GovNet//////////
        const top10RequestedAppsGovNetResponse = await getTop10RequestedAppsGovNet(timeRange);
        console.log('Dashboard fetchData top10RequestedAppsGovNetResponse:', top10RequestedAppsGovNetResponse);
        const T10RAGNbuckets = top10RequestedAppsGovNetResponse.aggregations.top_websites.buckets;
        const top10RequestedAppsGovNetData = T10RAGNbuckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top10RequestedAppsGovNet = top10RequestedAppsGovNetData;

        // Top 10 Requested Apps By Internet//////
        const top10RequestedAppsInternetResponse = await getTop10RequestedAppsInternet(timeRange);
        console.log('Dashboard fetchData top10RequestedAppsInternetResponse:', top10RequestedAppsInternetResponse);
        const T10RAIbuckets = top10RequestedAppsInternetResponse.aggregations.top_website.buckets;
        const top10RequestedAppsInternetData = T10RAIbuckets.map(bucket => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top10RequestedAppsInternet = top10RequestedAppsInternetData;        

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
