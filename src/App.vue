<template>

  <div style="width: 100%; display: flex; padding-bottom: 10px; flex-direction: column; align-items: center; justify-content: start; height: calc(100vh - 60px); background: #f2f2f2; overflow: hidden; position: relative;">
    <div class="ticks-header" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 10px 40px 0px 40px; width: 100%;">
      <div class="ticks-header-title" style="font-size: 30px; font-weight: 500; color: #0D0D0D;">
        Тикетлар
      </div>
      <div class="xr-tick" style="display: flex; width: 100%; padding: 0px 34px; flex-direction: row; justify-content: center; align-items: center; gap: 2px; margin-top: 0px;" :class="{'xr-tick-active': activeInput}">
        <ticketSearch @fiter-event="handleFilterEvent" @activeInputSend="setActiveInput" :projects="projects" :status="status">
        </ticketSearch>
        <div class="ticks-header-create-btn" style="border-radius: 8px; background: #3680FA; color: white; padding: 8px 30px; display: flex; align-items: center; justify-content: center; height: 40px; width: 130px; cursor: pointer;" @click="showTicketModal">
          <span style="font-size: 18px; margin-bottom: 2px; margin-right: 4px;">+Яратиш</span>
        </div>
      </div>
    </div>
    <div style="display: flex; width: 100%; padding: 0px 0px 0px 40px; flex-direction: row; justify-content: start; margin-top: 0px;">
      <div class="tickx-table-div">
        <table>
          <thead>
          <tr>
            <th class="tickx-table-number" style="position: sticky; top: 0px; left: 1px; text-align: center !important; padding: 0 !important;">№</th>
            <th class="tickx-table-department">проект</th>
            <th class="tickx-table-ticket" style="position: sticky; top: 0px; left: 53px;">тикет номери</th>
            <th class="tickx-table-owner">мурожаатчи</th>
            <th class="tickx-table-title" style="position: sticky; top: 0px; left: 153px;">мурожат матни</th>
            <th class="tickx-table-responsible">масъул шахс</th>
            <th class="tickx-table-responsible">лойиҳа</th>
            <th class="tickx-table-status" style="text-align: center !important;">ҳолати</th>
            <th class="tickx-table-responsible">теглар</th>
            <th class="tickx-table-actions" style="text-align: center !important;">ҳаракатлар</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in paginatedItems" :key="index" :class="{'thickx-body-tr-grey': index % 2 == 1, 'thickx-body-tr-white': index % 2 == 0}">
            <td class="tickx-number">{{index + 1}}</td>
            <td class="tick-department">{{item.project_name}}</td>
            <td class="tickx-ticket" @click="showTopics(item.id, index)">
              <span style="text-decoration: underline; cursor: pointer;">{{item.ticket_num}}</span>
            </td>
            <td class="tickx-owner" v-if="item.owner_name">
              <div class="tick-owner-info-card">
                <p style="color:#909090">{{item.owner_name}}</p>
              </div>
            </td>
            <td class="tickx-owner" v-else style="text-align: center !important;">-</td>
            <td class="tickx-title">{{item.title}}</td>
            <td class="tickx-responsible" v-if="executors(index).length > 0">
              <div class="tick-modal-info-header-avatars-block">
                <div class="tick-modal-info-header-btns-avatar" v-for="(executor, indx) in executors(index)" :key="executor.staff_id" :style="styleAvatar(indx)"></div>
                <div v-if="executors(index).length > 3" class="tick-modal-info-header-btns-avatar" :style="styleAvatar(4)">
                  <div class="tick-modal-info-header-avatar-number">+{{executors(index).length - 4}}</div>
                </div>
              </div>
            </td>
            <td class="tickx-responsible" v-else style="text-align: center">-</td>
            <td class="tickx-status-td" style="text-align: center !important;">
              <span class="tickx-status" :style="setTicketStatus(item.status)">{{item.status}}</span>
            </td>
            <td class="tickx-tags" v-if="item.tags">
              <h5 class="badge badge-primary mr-1" v-for="tag in item.tags.split(',')" :key="tag">{{tag}}</h5>
            </td>
            <td class="tickx-tags" v-else>-</td>
            <td class="tickx-status-td" style="max-width: 200px !important;">
              <div style="display: flex; align-items: center; flex-direction: row; justify-content: center; gap: 8px; min-width: 160px;"></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row thickx-pagination">
      <div class="col">
        <div class="mt-3">
          <b-pagination v-model="currentPage" size="lg" :per-page="pageSize" pills :total-rows="rows" @input="getTickets"></b-pagination>
        </div>
      </div>
      <div class="col">
        <div class="mt-3">
          <b-form-select id="per-page-select" v-model="pageSize" :options="pageOptions" size="sm"></b-form-select>
        </div>
      </div>
    </div>
    <select-component :totalPages="totalPages" :currentPage.sync="currentPage"/>
  </div>
</template>


<script>
import qs from "qs";
import ticketSearch from "./components/ticketSearch.vue";
import selectComponent from './components/select-component.vue'
export default {
  components:{
    ticketSearch,
    selectComponent
  },
  data: function () {
    return {
      totalPages:10,
      activeInput: false,
      rows: 100,
      currentPage: 1,
      pageSize: 10,
      pageOptions: [10, 20, 30, 50, 100],
      items: [],
      apiUrl:'https://api.smart-office.uz/api/v1/new/get-tickets',
      filter: {
        description: '',
        ticket_num: '',
        status: '',
        project: '',
        tag: '',
        bdate: this.$moment().subtract(30, 'days').format('YYYY-MM-DD'),
        edate: this.$moment().format('YYYY-MM-DD'),
        ticket_tab: null,
      },
      params:{
        username: 'call24user',
        password: '9H5Q6Sn6K7dz'
      },
      access_token:''
    }
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.items.slice(startIndex, endIndex);
    }
  },
mounted() {
  this.getToken()
  // this.sendRequest()
},
  methods: {
    getToken: async function () {
      const url = '/api/services/platon-auth/api/login';
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'device-id': 'Bobur'
      };
      const body = qs.stringify(this.params);

      try {
        const response = await this.axios.post(url, body, {headers});
        this.access_token = response.data.data.access_token
        this.sendRequest()
      } catch (error) {
        console.error("Ошибка при получении токена:", error.response ? error.response.data : error.message);
      }

    },



    async sendRequest() {
      this.requestData = {
        project_id: '2757ed47-87d5-0234-45c5-1b5624885abd',
        type:2
      }
      try {
        const response = await this.axios.get(this.apiUrl, {
          params: this.requestData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.access_token}`
          }
        })
        console.log(response.data.data)
        this.items = response.data.data.tickets
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    styleAvatar(index) {
      return {
        zIndex: 9999,
        position: 'absolute',
        left: index * 30 + 'px'
      };
    },
    setTicketStatus(status) {
      const statusStyles = {
        STARTED: { color: '#f8a13e', background: '#fef6ec' },
        IN_PROGRESS: { color: '#357bff', background: '#ebf2ff' },
        SOLVED: { color: '#4caf50', background: '#edf7ee' },
        REJECTED: { color: '#f44336', background: '#fdecea' }
      };
      return statusStyles[status] || { color: '#357bff', background: '#ebf2ff' };
    },
    executors(index) {
      return this.items[index]?.executors || [];
    },
    showTicketModal() {
      // Your logic to show the ticket creation modal
    },
    showTopics(id, index) {
      // Your logic to show topics related to a ticket
    }
  }
}
</script>

<style>
.tick-owner-info-card {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  width: 98%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: center;
}
.xr-tick-active {
  z-index: 2 !important;
}

.tickx-tags h5 {
  font-size: 14px;
}

.tickx-tags .badge {
  background: rgb(53, 123, 255) !important;
}

.tick-owner-info-card p{
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
}
.thickx-pagination .b-pagination .page-link {
  border-radius: 6px !important;
  background: white !important;
  display: flex;
  color: #5b5b5b;
  align-items: center;
  justify-content: center;
  height: 43px;
  width: 43px;
  font-size: 14px;
  border: 1px solid #ffffff85;
}

.tick-modal-info-header-avatars-block {
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
}

.tick-modal-info-header-avatar-number {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  color: black;
  border-radius: 50%;
  font-weight: 600;
  padding: 2px;
  border: 2px solid #f4f4f4;
}

#pet-select {
  border: 1px solid rgb(241, 242, 244) !important;
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  outline: none;
  margin-top: 10px;
}

.avatar-employee {
  justify-content: center;
}

.tickx-responsible {
  text-align: center;
  /* Центрируем содержимое по горизонтали */
  vertical-align: middle;
  /* Центрируем содержимое по вертикали */
}

.tick-modal-main-input input {
  color: black !important;
  background: rgb(247, 247, 248) !important;
  border: none;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
}

.xr-tick .smt-filter-create-ticket {
  display: none !important;
}

.platon-body {
  padding: 0;
}

.thickx-pagination .pagination .page-item.active .page-link {
  background: white !important;
  border-color: #ffffff;
  color: #000000;
  z-index: 0 !important
}

.thickx-pagination #per-page-select {
  border: none;
  width: 52px;
  height: 43px;
  color: black;
  padding-left: 10px;
  border-radius: 6px;
  appearance: none;
}

.tickx-number {
  max-width: 100px;
  text-align: center;
  position: sticky;
  left: 1px;
}

.tickx-ticket {
  max-width: 100px;
  position: sticky;
  left: 53px;
}

.tickx-title {
  min-width: 250px;
  max-width: 250px;
  position: sticky;
  left: 153px;
}

.tickx-owner {
  min-width: 200px;
}

.tickx-status {
  text-align: center !important;
}

.tickx-actions {
  text-align: center !important;
}

/* .tickx-title {
  min-width: 160px;
} */
.tickx-table-header {
  position: sticky;
  top: 0;
  background: white;
  padding-left: 10px;
  font-size: 14px;
  padding-bottom: 10px;
  font-weight: 600;
  font-family: Inter, Helvetica, "sans-serif";
  padding-top: 20px;
  color: #0b193b;
}

.tickx-table-div {
  /*   border: 1px dashed #e7e5e4; */
  border-radius: 10px;
  overflow-wrap: break-word;
  flex-direction: column;
  min-width: 0px;
  display: flex;
  position: relative;
  /*   padding: 0px 20px 20px 20px; */
  background: #fdfefe;
  /*   max-width: 96%; */
  min-width: 80%;
  margin-top: 20px;
  overflow: scroll;
  max-height: 72vh;
  border-bottom: 10px solid white;
  width: 100%;
  margin-right: 40px;
}

.tickx-table-div::-webkit-scrollbar {
  display: none;
}

.tickx-table-div .tickx-number {
  text-align: center;
  height: 64px;
  width: 64px;
  color: #0D0D0D !important;
}

.tickx-table-div .tickx-title {
  color: #0D0D0D !important;
}

.tickx-table-div .tickx-tags {
  color: #0D0D0D !important;
}


.tickx-table-div .tickx-responsible {
  color: #3680FA !important;
  min-width: 200px;
  max-width: 200px;
}


.tickx-table-div thead {
  position: sticky;
  top: 0px;
  background: white;
}


.tickx-table-div thead tr th {
  /*   padding-bottom: 13px !important;
  padding-top: 17px; */
  /*   display: flex;
  align-items: center;
  justify-content: center; */
  height: 54px;
  /*   width: 64px; */
  color: black;
  text-align: start;
  padding-left: 20px;
  /*   border-inline-end: 1px solid #f2f2f2; */
  border-bottom: 1px solid #ffffff;

  background: white;
  outline: 1px solid #f2f2f2;
}

.tickx-table-div thead th {
  border: none;
  color: rgb(158 171 183);
  font-weight: 500;
  text-align: start;
  font-size: 14px;
  /*   padding: 10px 16px; */
}

.tickx-table-div table tbody tr td {
  border: none;
  padding: 2px 16px;
  color: #909090;
  font-size: 14px;
  font-weight: 400;
  font-family: Inter, Helvetica, "sans-serif";
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
  overflow: hidden;
  padding-left: 20px;
  text-align: start;
}

.thickx-body-tr-grey {
  background: white;
  /*   border-inline-end: 1px solid #f2f2f2; */
  border-bottom: 1px solid #f2f2f2;
}

.thickx-body-tr-white {
  background: #f2f2f2;
  /*   border-inline-end: 1px solid white; */
  border-bottom: 1px solid white;
}

.thickx-body-tr-grey td {
  background: white;
  /*   border-inline: 1px solid #f2f2f2 !important; */
  border-bottom: 1px solid #f2f2f2 !important;
  outline: 1px solid #f2f2f2;
}

.thickx-body-tr-white td {
  background: #f2f2f2;
  /*   border-inline: 1px solid white !important; */
  border-bottom: 1px solid white !important;
  outline: 1px solid white;
}


.tickx-status {
  border: none;
  color: rgb(53 123 255);
  line-height: 1;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  padding: 8px 8px;
  background: rgb(235 242 255);
  font-family: Inter, Helvetica, "sans-serif";
  border-radius: 30px;
  display: inline-block;
  width: 124px;
}

#per-page-select {
  border: none;
  width: 52px;
  height: 32px;
  color: black;
  border-radius: 6px;
  appearance: none;
}

/* Скрыть стрелку вниз */
.custom-select-arrow {
  display: none !important;
  height: 32px;
}

.tick-modal-info-header-btns-avatars {
  display: flex;
  gap: 0px;
  flex-direction: row;
  max-width: 400px;
  position: relative;
  height: 45px;
  overflow: auto;
}

.tick-modal-info-header-btns-avatar:hover {
  z-index: 99999 !important;
}

.tick-modal-info-header-btns-avatar .avatar-employee-image {
  border: 3px solid #f4f4f4;
}
</style>
