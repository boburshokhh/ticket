<script >

export default {
  props: ['projects', 'status'],
  data() {
    return {
      modelConfig: {
        type: 'date',
        mask: 'DD.MM.YYYY'
      },
      masks: {
        input: "DD.MM.YYYY"
      },
      range: {
        start: this.$moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end: this.$moment().format('YYYY-MM-DD')
      },
      ticketData: {
        ticket_type: '',
        status: null,
        ticket_loyalty: null,
        ticket_name: '',
        description: '',
        ticket_num: '',
        tag: '',
        b_date: '',
        e_date: '',
        ticket_tab: ''
      },
      ticket_tab: 'all',
      focus: false,
      inputFocus: false,
      mouseoverFilters: false
    }
  },
  computed: {
    activeInput() {
      return this.inputFocus || this.mouseoverFilters
    },
    ticketDataActive() {
      return this.ticketData.status || this.ticketData.ticket_loyalty
    },
    ticketDataTicketType() {
      return this.ticketData.ticket_type
    }

    // mouseoverFiltersAndFocus() {
    //   return this.mouseoverFilters && this.focus
    // }
  },
  watch: {
    activeInput() {
      this.$emit('activeInputSend', this.activeInput)
      console.log('ace', this.activeInput)
    }
  },
  mounted() {
    this.ticketData.b_date = this.range.start
    this.ticketData.e_date = this.range.end
  },
  methods: {
    show() {
      this.$emit('showTicketModal')
    },
    clearTicketType() {
      this.ticketData.ticket_type = ''
      this.$emit('fiter-event', this.ticketData);
    },
    clearData() {
      this.ticketData.ticket_type = ''
      this.ticketData.status = null
      this.ticketData.ticket_loyality = null
      this.ticketData.ticket_name = ''
      this.ticketData.description = ''
      this.ticketData.ticket_num = ''
      this.ticketData.tag = ''
      this.ticketData.b_date = this.$moment().subtract(30, 'days').format('YYYY-MM-DD')
      this.ticketData.e_date = this.$moment().format('YYYY-MM-DD')
      this.range.start = this.$moment().subtract(30, 'days').format('YYYY-MM-DD')
      this.range.end = this.$moment().format('YYYY-MM-DD')
      this.ticketData.ticket_tab = '';
      this.ticket_tab = '';
      this.$emit('fiter-event', this.ticketData);
    },
    searchTickets() {
      this.ticketData.b_date = this.range.start;
      this.ticketData.e_date = this.range.end;
      this.ticketData.ticket_tab = this.ticket_tab;
      this.$emit('fiter-event', this.ticketData);
      this.inputFocus = false;
    },
    ticketTypeName(value) {
      let val = "";
      switch (value) {
        case "STARTED":
          val = 'ЯНГИ'
          break;
        case "IN_PROGRESS":
          val = 'ЖАРАЁНДА'
          break;
        case "SOLVED":
          val = 'БАЖАРИЛГАР'
          break;
        case "ARCHIVED":
          val = 'АРХИВЛАНГАН'
          break;
        case "UNSOLVED":
          val =  'ЖАВОБ ҚАЙТАРИЛГАН'
          break;
        case "REJECTED":
          val = 'ҚАЙТАРИЛГАН'
          break;
        case "ESTIMATED":
          val = 'БАҲОЛАНГАН'
          break;
        case "REDIRECTED":
          val = 'ЙУНАЛТИРИЛГАН'
          break;
        case "CLOSED":
          val = 'ЙОПИЛГАН'
          break;
        default:
          val = "";
          break;
      }
      return val;
    }
  },
}
</script>

<template>
  <div class="smt-big-div">

    <div class="smt-filter-create-ticket" @click="show">
      <span style="font-size: 18px; margin-bottom: 5px; margin-right: 4px;">+</span> Яратиш
    </div>

    <div style="position: relative;">
      <div class="smt-big-input" :class="{'smt-big-input-active': activeInput }">
        <div class="smt-filters">
          <div v-if="ticketData.ticket_type" class="smt-filter-card" :class="{'smt-filter-card-active': activeInput}">
            {{ ticketTypeName(ticketData.ticket_type) }}

            <span class="smt-filter-card-close" @click="clearTicketType()">
                      <svg class="smt-big-input-close" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                         <path fill="" fill-rule="evenodd" d="M5.065 3.682L2.377.994 1.01 2.362 3.696 5.05.99 7.757l1.368 1.37 2.708-2.71 2.7 2.703 1.37-1.368-2.702-2.7 2.682-2.684L7.748 1 5.065 3.682z" />
                      </svg>
                   </span>
          </div>
        </div>
        <span v-if="ticketData.ticket_type" class="smt-big-input-plus" :class="{'smt-big-input-plus-active': activeInput}">+</span>
        <input class="smt-big-input-text" :class="{'smt-big-input-text-active': activeInput, 'smt-big-input-text-padding-10': !ticketData.ticket_type}" type="text" v-model="ticketData.description" placeholder="поиск" @focus="inputFocus = true" @blur="inputFocus = false" />
        <div class="smt-search-btn" @click="searchTickets()" :class="{'smt-search-btn-active': activeInput}">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
            <path fill="" fill-rule="evenodd" d="M1.33 5.5c0-2.304 1.866-4.17 4.17-4.17S9.67 3.195 9.67 5.5c0 2.305-1.865 4.17-4.17 4.17-2.305 0-4.17-1.865-4.17-4.17m12.528 6.944l-3.816-3.817-.014-.008C10.64 7.73 11 6.66 11 5.5 11 2.462 8.537 0 5.5 0S0 2.462 0 5.5 2.463 11 5.5 11c1.158 0 2.232-.36 3.118-.972.004.004.005.01.01.014l3.816 3.817c.372.37.982.37 1.354 0l.06-.063c.372-.372.372-.982 0-1.354" />
          </svg>
        </div>
        <div class="smt-search-close"  @click="clearData()" :class="{'smt-search-close-active': activeInput}">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11">
            <path fill="" fill-rule="evenodd" d="M7.587 5.503l4.4-4.398-1.132-1.13-4.4 4.397L2.06-.026l-1.13 1.13 4.397 4.4L.927 9.9l1.13 1.132 4.4-4.398 4.398 4.398 1.13-1.13-4.398-4.4z" />
          </svg>
        </div>
      </div>
      <!--      -->
      <div  @mouseover="mouseoverFilters = true" @mouseleave="mouseoverFilters = false" v-if="inputFocus || mouseoverFilters"  class="smt-all-filters" >
        <div class="smt-all-filters-tabs" style="">
          <div class="smt-all-filters-tab" :class="{'smt-all-filters-tab-active': ticket_tab == 'all'}" @click="ticket_tab = 'all'">
            ҲАММАСИ
          </div>
          <div class="smt-all-filters-tab" :class="{'smt-all-filters-tab-active': ticket_tab == 'in'}" @click="ticket_tab = 'in'">
            КИРУВЧИ
          </div>
          <div class="smt-all-filters-tab" :class="{'smt-all-filters-tab-active': ticket_tab == 'out'}" @click="ticket_tab = 'out'">
            ЧИҚУВЧИ
          </div>
        </div>
        <div class=" smt-all-filters-grid">
          <div class="smt-all-content1">
            <div class="smt-all-content1-card">
              <h5 class="smt-all-content1-title">
                СТАТУС
              </h5>
              <div class="smt-all-content1-statuses">
                <div class="smt-all-content1-status" :class="{'smt-all-content1-status-active': (ticketDataTicketType == 'STARTED')}" @click="ticketData.ticket_type = 'STARTED'">
                  ЯНГИ
                </div>
                <div :class="{'smt-all-content1-status-active': (ticketDataTicketType == 'IN_PROGRESS')}" class="smt-all-content1-status" @click="ticketData.ticket_type = 'IN_PROGRESS'">
                  ЖАРАЁНДА
                </div>
                <div :class="{'smt-all-content1-status-active': ticketDataTicketType == 'SOLVED'}" class="smt-all-content1-status" @click="ticketData.ticket_type = 'SOLVED'">
                  БАЖАРИЛГАР
                </div>
                <div :class="{'smt-all-content1-status-active': ticketDataTicketType == 'UNSOLVED'}" class="smt-all-content1-status" @click="ticketData.ticket_type = 'UNSOLVED'">
                  ЖАВОБ ҚАЙТАРИЛГАН
                </div>
                <div :class="{'smt-all-content1-status-active': ticketDataTicketType == 'REJECTED'}" class="smt-all-content1-status" @click="ticketData.ticket_type = 'REJECTED'">
                  ҚАЙТАРИЛГАН
                </div>
                <div :class="{'smt-all-content1-status-active': ticketDataTicketType == 'REDIRECTED'}" class="smt-all-content1-status" @click="ticketData.ticket_type = 'REDIRECTED'">
                  ЙУНАЛТИРИЛГАН
                </div>
                <div :class="{'smt-all-content1-status-active': ticketDataTicketType == 'CLOSED'}" class="smt-all-content1-status" @click="ticketData.ticket_type = 'CLOSED'">
                  ЙОПИЛГАН
                </div>
              </div>
            </div>
          </div>
          <div class="smt-all-filters-content2">
            <div class="smt-all-filters-input">
              <span class="smt-all-filters-input-label">Тикет тексти</span>
              <input class="smt-all-filters-input-in" type="text" v-model="ticketData.description" />
            </div>
            <div class="smt-all-filters-input">
              <span class="smt-all-filters-input-label">Проект</span>
<!--              <Treeselect :max-height="80" placeholder="" v-model="ticketData.department" :multiple="false" :options="projects"></Treeselect>-->
            </div>
            <div class="smt-all-filters-input">
              <span class="smt-all-filters-input-label">теги</span>
              <input @click.enter="searchTickets" class="smt-all-filters-input-in" type="text" v-model="ticketData.tag" />
            </div>
            <div class="smt-all-filters-input">
              <span class="smt-all-filters-input-label">Тикет номер</span>
              <input @click.enter="searchTickets" class="smt-all-filters-input-in" type="text" v-model="ticketData.ticket_num" />
            </div>
            <span class="smt-all-filters-input-label">Дата</span>
            <div class="smt-date-range">
<!--              <v-date-picker v-model="range" is-range :model-config="modelConfig" :masks="masks" class="">-->
<!--                <template v-slot="{ inputValue, inputEvents }">-->
<!--                  <div class="flex justify-center items-center">-->
<!--                    <input :value="inputValue.start" v-on="inputEvents.start" class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300 smt-all-kpi-range-date" />-->
<!--                    <input :value="inputValue.end" v-on="inputEvents.end" class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300 smt-all-kpi-range-date" />-->
<!--                  </div>-->
<!--                </template>-->
<!--              </v-date-picker>-->
            </div>
            <div class="smt-all-filters-content2-btns">
              <div class="smt-all-filters-nayti" @keyup.enter="searchTickets" @click="searchTickets()">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 1 26 27">
                  <path fill="#fff" d="M18.896054,16.7747337 L21.8474034,19.7260831 C22.2413242,20.1200039 22.247652,20.752348 21.8542912,21.1457088 L21.1457088,21.8542912 C20.755592,22.244408 20.1200735,22.2413938 19.7260831,21.8474034 L16.7747337,18.896054 C15.6855772,19.5947944 14.390109,20 13,20 C9.1340068,20 6,16.8659932 6,13 C6,9.1340068 9.1340068,6 13,6 C16.8659932,6 20,9.1340068 20,13 C20,14.390109 19.5947944,15.6855772 18.896054,16.7747337 Z M13,18 C15.7614237,18 18,15.7614237 18,13 C18,10.2385763 15.7614237,8 13,8 C10.2385763,8 8,10.2385763 8,13 C8,15.7614237 10.2385763,18 13,18 Z" />
                </svg> ИЗЛАШ
              </div>
              <div @click="clearData()" class="smt-all-filters-sbrosit">
                ТОЗАЛАШ
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<style >
.smt-date-range {
  position: relative;
  height: 40px;
  border-radius: 4px;
  z-index: 1;
  display: flex;
  border: 1px solid rgb(221 223 225);
  transition: all .1s ease;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.smt-all-kpi-range-date {
  border: none !important;
  width: 100px;
}

.smt-all-kpi-range-date:focus {
  outline: none;
}

.smt-all-kpi-range-date-line {
  width: 12px;
  border-top: 2px solid #434343;
  top: 15px;
  position: absolute;
  left: 96px;
}


.smt-all-filters-tabs {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 6px 0 18px 0;
}

.smt-all-filters-tab {
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 1px solid #e7eaec;
  min-width: 100px;
  height: 40px;
  color: #535c69;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: all .1s ease;
}

.smt-all-filters-tab-active {
  border-bottom: 1px solid #0fa7d7;
  color: #0fa7d7;
}

.smt-filter-create-ticket {
  padding: 10px 20px;
  color: #535c69;
  border-radius: 8px;
  font-size: 12px;
  flex-wrap: nowrap;
  border: 1px solid #bbed21;
  background: #bbed21;
  font-weight: 600;
  user-select: none;
  text-transform: uppercase;
  min-width: 90px;
  max-width: 100px;
  white-space: nowrap;
  margin: 0px 10px 0px 0px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .1s ease;
}

.smt-filter-create-ticket:hover {
  background: #d2f960;
}




.smt-all-content1-title {
  color: #a0a5ab;
  font-size: 10px;
  font-weight: 600;
  border-bottom: 1px solid #e7eaec;
  text-align: center;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  justify-content: center;
  padding-top: 4px;
  margin: 0px;
}

.smt-all-content1-statuses {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.smt-all-content1-status {
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 1px solid #e7eaec;
  padding: 0 0 0 3px;
  min-width: 174px;
  height: 40px;
  color: #535c69;
  display: flex;
  align-items: center;
}
.smt-all-content1-status:hover {
  color: #0fa7d7;
}
.smt-all-content1-status-active {
  color: #0fa7d7 !important;
}
.smt-all-content1 {
  padding: 10px 20px 10px 20px;;
  width: 215px;
  height: 100%;
  border-right: 1px solid #e7eaec;
  background: #f8fafb;
  min-height: 333px;
}

.smt-big-div {
  /*   background-image: linear-gradient(120deg, #ff8ed8 0%, #60b0ff 100%);
    width: 100vw;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center; */
  position: relative;
  z-index: 1;
  display: flex;
  padding: 6px;
  /*   flex-direction: row;
    align-items: center;
    justify-content: center; */
}
.smt-filters {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.smt-big-input {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  border-radius: 8px;
  box-sizing: border-box;
  z-index: 1;
  overflow: hidden;
  width: 560px;
  border: 1px solid white;
  background-color: white;
  /*     border: 1px solid rgb(255 255 255);
      background-color: rgb(255 255 255); */
  transition: all .1s ease;
}

.smt-big-input-active {
  border: 1px solid transparent;
  background: #fff;
}

.smt-filter-card {
  position: relative;
  margin: 3.5px 3.5px 3.5px 4px;
  background: #70deff;
  padding: 5px 30px 4px 13px;
  font-size: 14px;
  height: 30px;
  border-radius: 6px;
  display: inline-block;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  font-weight: 400;
  user-select: none;
}

.smt-filter-card-active {
  background: #bceefc;
}

.smt-filter-card-close {
  position: absolute;
  right: 6px;
  top: 0;
  width: 10px;
  height: 100%;
  -webkit-transition: opacity .3s ease;
  transition: opacity .3s ease;
  opacity: .3;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
}


.smt-big-input-text::placeholder {
  /*   color: #c5c8cc !important; */
  color: #ccc !important;
}
.smt-big-input-text-active::placeholder {
  color: #c5c8cc !important;
}
.smt-big-input-text-padding-10 {
  padding: 0px 0px 0px 10px !important;
}
.smt-big-input-plus {
  display: flex;
  width: 14px;
  height: 36px;
  /*     color: rgb(197, 200, 204); */
  color: rgba(255, 255, 255, .5);
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
/* #c5c8cc */
.smt-big-input-plus-active {
  color: #c5c8cc;
}
.smt-big-input-text {
  position: relative;
  margin: 3.5px 3.5px 3.5px 4px;
  background: transparent;
  padding: 0px;
  font-size: 14px;
  height: 30px;
  border-radius: 2px;
  display: inline-block;
  /*   color: #333; */
  /*   color: #ccc; */
  color: #535c69;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 400;
  outline: none;
  border: none;
}

.smt-search-btn {
  width: 14px;
  fill: rgb(54 128 250);;
  margin: 5px;
  cursor: pointer;
  transition: fill .1s ease;
}
.smt-search-btn:hover {
  fill: #535d6a;
}

.smt-search-btn-active {
  fill: #c5c8cc;
}

.smt-search-close {
  width: 14px;
  fill: rgb(54 128 250);;
  margin: 5px 10px 5px 5px;
  cursor: pointer;
  transition: fill .1s ease;
}

.smt-search-close:hover {
  fill: #535d6a;
}

.smt-search-close-active {
  fill: #c5c8cc;
}





/* smt-all-filters */

/* .smt-all-filters {
  position: absolute;
  top: 44px;
  left: 0px;
  z-index: 2;
  background: white;
  width: 748px;
  background-color: #fff;
  box-shadow: 0 7px 21px rgba(83,92,105,.12), 0 -1px 6px 0 rgba(83,92,105,.06);
  border-radius: 12px;
  overflow: hidden;
} */

.smt-all-filters {
  position: absolute;
  top: 48px;
  left: -50px !important;
  z-index: 2;
  background: white;
  width: 670px;
  background-color: #fff;
  box-shadow: 0 7px 21px rgba(83, 92, 105, .12), 0 -1px 6px 0 rgba(83, 92, 105, .06);
  border-radius: 12px;
  overflow: hidden;
}

.smt-all-filters-grid {
  display: grid;
  grid-template-columns: auto 1fr;
}

.smt-all-filters-content2 {
  padding: 20px 26px;
}
.smt-all-filters-input {
  margin-bottom: 16px;
}
.smt-all-filters-input-label {
  margin-left: 2px;
  line-height: 1;
  color: #a9adb2;
  display: inline-block;
  width: 100%;
  font-weight: 300;
  font-size: 13px;
  opacity: .7;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: system-ui;
}
.smt-all-filters-input-in {
  position: relative;
  padding: 0 10px;
  height: 38px;
  width: 100%;
  border: 1px solid rgba(83, 92, 105, .2);
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
  box-sizing: border-box;
  transition: all .3s ease-in-out;
  outline: 0;
}

.smt-all-filters-input-in:focus {
  border: 1px solid rgba(81, 203, 238, 1);
  outline: none;
}

.smt-all-filters-content2 .vue-treeselect__control {
  position: relative;
  padding: 0 10px;
  height: 38px;
  width: 100%;
  border: 1px solid rgba(83, 92, 105, .2);
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
  box-sizing: border-box;
  transition: all .3s ease-in-out;
  outline: 0;
}
.smt-all-filters-content2 .vue-treeselect__control:focus-withen {
  border: 1px solid rgba(81, 203, 238, 1);
  outline: none;
}
.smt-all-filters-content2 .vue-treeselect__control:active {
  border: 1px solid rgba(81, 203, 238, 1);
  outline: none;
}
.smt-all-filters-content2 .vue-treeselect__control:hover {
  border: 1px solid rgba(81, 203, 238, 1);
  outline: none;
}
.smt-all-filters-content2 .vue-treeselect__control:target {
  border: 1px solid rgba(81, 203, 238, 1);
  outline: none;
}
.smt-all-filters-content2 .vue-treeselect__control:visited {
  border: 1px solid rgba(81, 203, 238, 1);
  outline: none;
}

.smt-all-filters-nayti {
  background: #3bc8f5;
  padding: 5px 18px 5px 12px;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  border: 1px solid #3bc8f5;
  transition: all .1s linear;
  user-select: none;
}

.smt-all-filters-nayti:hover {
  border: 1px solid #3eddff;
  cursor: pointer;
  background: #3eddff;
}


.smt-all-filters-sbrosit {
  padding: 9px 18px;
  color: #69737e;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  border: 1px solid #c6cdd3;
  background: white;
  font-weight: 600;
  transition: all .1s linear;
  user-select: none;
}

.smt-all-filters-sbrosit:hover {
  cursor: pointer;
  background: #cfd4d8;
}

.smt-all-filters-content2-btns {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f2f3f4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 14px;
  flex-wrap: nowrap;
}

</style>
