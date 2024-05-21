import { BaseInput, Card, BaseDropdown, BaseButton, BaseCheckbox } from "../components/index";
///////////////////////////////////////////////////
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(Card.name, Card);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    ///////////////////////////////////////////////////////////////////////////
    Vue.component('apexchart', VueApexCharts);
  }
};

export default GlobalComponents;
