<template>
  <transition name="tick-fade1">
    <div class="tick-modal-div-info" style="
      position: absolute;
      z-index: 99999;
      top: 0px;
      right: 0px;
      height: auto;
      width: 100%;
      background: #0003;
      min-height: 100vh;
    ">
      <transition name="tick-fade2">
        <div class="tick-modal-main-info" style="
          position: relative;
          background: rgb(255, 255, 255);
          color: black;
        ">
          <div class="tick-modal-info-header">
            <div>
              <button class="tick-modal-info-close" @click="hide">
                <img style="
                  margin-top: 0px;
                  height: 14px;
                  width: 14px;
                  display: block;
                " src="/media/store/img/ticket/back-tick-modal.svg" /> Тикетлар
              </button>
            </div>
          </div>
          <div class="tick-modal-info-body" style="
            display: flex !important;
            flex-direction: column !important;
            justify-content: start;
            align-items: center;
            height: 110vh;
            padding-top: 20px !important;
          ">
            <div class="tick-modal-info-body2" style="
              min-width: 800px !important;
            ">
              <div class="tick-modal-main-input tick-inputs1">
                <label for="ticket-name">Тикет мавзўси<span style="color: #eb5757">*</span></label>
                <br />
                <input type="text" v-model="ticketName" id="ticket-name" placeholder="Ticket" style="
                  color: rgba(99, 108, 121, 1) !important;
                  background: rgba(247, 247, 248, 1) !important;
                " />
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="tick-inputs4 mt-3">
                  <label for="pet-select">Лойиҳа<span style="color: #eb5757">*</span></label>
                  <select class="tick-modal-main-select" style="
                    color: rgb(99, 108, 121) !important;
                    background: rgb(247, 247, 248) !important;
                    padding: 16px !important;
                  " name="pets" id="pet-select" v-model="selectedProjectId" @change="getDepartmentNameAndSecuance(selectedProjectId);getExecutorBasicInfo()">
                    <option v-for="(project, index) in projects" :key="project.id" :value="project.id">
                      {{ project.label }}
                    </option>
                  </select>
                </div>
                <div class="tick-modal-main-input mt-3 tick-inputs4">
                  <label for="ticket-name">Тикет номери</label>
                  <br />
                  <input disabled v-model="ticket_num" type="text" id="ticket-name" placeholder="TT-00-00" style="
                    color: rgba(99, 108, 121, 1) !important;
                    background: rgba(247, 247, 248, 1) !important;
                    margin-top: 10px;
                  " />
                </div>
              </div>
              <div class="ticket-files-and-photo-block">
                <div class="ticket-upload-files-and-photo"> Расм юклаш
                  <div class="" style="
                    position: relative;
                    padding: 4px 10px;
                    display: flex;
                    border-radius: 8px;
                    background: rgb(247, 247, 248);
                    margin-top: 4px;
                    min-height: 50px;
                    height: auto;
                    width: 100%;
                    border: 1px solid #f1f2f4;
                  ">
                    <input type="file" @change="onFileChange" multiple accept="image/*" ref="fileInput" style="display:none;" :value="null">
                    <img src="/media/store/img/ticket/file-upload.svg" @click="openFileInput" alt="uploadButton" style="
                      position: absolute;
                      cursor: pointer;
                      right: 17px;
                      top: 17px;
                    ">
                    <div class="image-container" style="gap: 5px;">
                      <div v-for="(file, index) in files" :key="index" class="tick-form-file-item" style="position: relative;">
                        <a :href="file.imageUrl" data-fancybox="gallery">
                          <img :src="file.imageUrl" class="uploaded-image" style="border-radius: 6px !important;">
                        </a>
                        <button class="tick-form-file-upload-close-btn" style="border: none;">
                          <img src="/media/store/img/ticket/actions/close-icon.svg" alt="uploadButton" @click="deleteUploadedFile(index)">
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ticket-upload-files-and-photo"> Файл бириктириш
                  <div class="" style="
                    position: relative;
                    padding: 4px 10px;
                    display: flex;
                    border-radius: 8px;
                    background: rgb(247, 247, 248);
                    margin-top: 4px;
                    min-height: 50px;
                    height: auto;
                    width: 100%;
                    border: 1px solid #f1f2f4;
                  ">
                    <input type="file" @change="handleFileChange" multiple accept="video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" ref="fileInput2" style="display:none;" :value="null">
                    <img src="/media/store/img/ticket/file-upload.svg" @click="triggerFileInput" alt="uploadButton" style="
                      position: absolute;
                      cursor: pointer;
                      right: 17px;
                      top: 17px;
                    ">
                    <div class="image-container" style="gap: 5px;">
                      <div v-for="(uploadedFile, index) in filesRender" :key="index" class="tick-form-file-item" style="position: relative;">
                        <a :href="`https://smart-office.uz/uploads/images/${uploadedFile.id}`">
                          <img src="https://img.icons8.com/?size=100&id=FZtRbGC72S1r&format=png&color=000000" class="uploaded-image" style="border-radius: 6px !important;">
                        </a>
                        <button class="tick-form-file-upload-close-btn" style="border: none;">
                          <img src="/media/store/img/ticket/actions/close-icon.svg" alt="uploadButton" @click="removeUploadedFile(index)">
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <canvas ref="canvas" style="display:none;"></canvas>
              <div class="tick-modal-main-input tick-inputs1">
                <label for="ticket-description">Description </label>
                <br />
                <textarea class="text-area-custom" v-model="ticket_description" id="ticket-description" :placeholder="ticketPlaceholderValue" style="
                  color: rgba(99, 108, 121, 1) !important;
                  background: rgba(247, 247, 248, 1) !important;
                "></textarea>
              </div>
              <div class="tick-modal-main-input tick-inputs2">
                <label for="ticket-name">#Теглар</label>
                <br />
                <div style="
                  display: flex;
                  flex-flow: wrap;
                  align-items: center;
                  gap: 6px;
                  position: relative;
                  background: #f7f7f8;
                  border-radius: 10px;
                  padding: 16px;
                  margin-bottom: 16px;
                " @click="focusInput()">
                  <p v-for="(tag, index) in tags" :key="index" class="tag">
                    {{ '#' + tag }} <i class="mdi mdi-close-circle-outline" @click="deleteTag(index)"></i>
                  </p>
                  <input ref="tagRef" type="text" v-model="tagInput" @keyup.enter="addTag" style="
                    border-radius: 8px;
                    padding: 0px;
                    border: none;
                    outline: none;
                    color: black !important;
                    background: #f7f7f8;
                    padding: 0px 6px;
                  " />
                </div>
                <div class="tick-modal-files-upload tick-inputs6 mt-3">
                  <div class="tick-modal-files-title">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                      <div class="tick-modal-info-create mt-3 tick-modal-info-body2-owner-info">
                        <div class="tick-modal-info-body2-title mb-2"> Мурожаатчи маълумотлари</div>
                        <!-- <avatar-employee style="justifiy-content: start !important;" class="mb-2"
                          :name="owner_info.name" :position="owner_info.department_name" :image="owner_info.avatar">
                        </avatar-employee> -->
                      </div>
                      <div class="tick-modal-info-create mt-3 tick-modal-info-body2-owner-info">
                        <div v-if="main_executors.length > 0" class="tick-modal-info-body2-title mb-2">
                          Ижрочилар
                        </div>
                        <div class="mb-3 tick-modal-info-create tick-modal-info-header-btns-avatars-2" style="height: 90px !important;">
                          <div class="tick-modal-info-header-btns-avatar" style="position: absolute; top: 0;" :style="styleAvatar(index)" v-if="main_executors.length > 0" v-for="(executor, index) in main_executors" :key="executor.staff_id">
                            <!-- <avatar-employee v-b-tooltip.hover.bottom :position="executor.department_name"
                              :title="executor.name" :id="'avatar-' + index"
                              :image="executor.avatar">
                            </avatar-employee> -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tick-modal-info-header-btns" style="
                      gap: 10px !important;
                      width: 100%;
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      justify-content: end;
                    ">
                      <button class="tick-modal-info-close-btn tick-modal-info-btn" @click="hide">
                        Ёпиш
                      </button>
                      <button class="tick-modal-info-create-btn tick-modal-info-btn" style="
                        background: rgb(54, 128, 250) !important;
                        color: white !important;
                      " @click="saveTicket">
                        Сақлаш
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>


<style>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>

<script>
export default {
  props: ["projects", "edit", "ticketInfo"],
  data() {
    return {
      ticketName: "",
      ticketTag: "",
      priority: "",
      ticketNumber: "",
      selectedProjectId: "",
      topicCreate: false,
      value: 'Ticket number one',
      ticketData: {},
      addExecutorCondition: false,
      tagInput: "",
      tags: [],
      name: "",
      sequence: null,
      department: "",
      ticket_num: "",
      chatCondition: false,
      owner_info: {},
      main_executors: [],
      sendTicketId: "",
      executor_staff_id: "",
      files: [],
      images: [],
      conditionImageUpload: false,
      ticket_description: "",
      form_element_id: 33151,
      editMode: false,
      linkToFilesForm: '',
      resizedImage: null,
      uploadedFiles: [],
      fileUploadedId: [],
      filesRender: [],
      fileFormattedString: "",
      ticketPlaceholderValue: this.$l("ticketPlaceholderValue", "Имкони борича кўпроқ тавсилотлар киритинг.")
    }
  },
  created() {
    this.addCompressor();
    this.getOwnerInfo();
    this.getEditTicketInfo();
    this.funcyBoxGalleryImport();
  },
  methods: {
    getEditTicketInfo() {
      if (!this.ticketInfo) return
      this.$api.get(`v1/new/get-tickets?type=10&id=${this.ticketInfo.id}`).then(res => {
        try {
          if (!res.data || !res.data.data || !res.data.data.get_photo_ticket) {
            throw new Error("Invalid response structure");
          }
          let imagesValue = res.data.data.get_photo_ticket.images.value;
          if (typeof imagesValue !== 'string') {
            throw new Error("Images value is not a valid JSON string");
          }
          let images = JSON.parse(imagesValue);
          this.compressStart(images);
          let filesValue = res.data.data.get_photo_ticket.files.value;
          if (typeof filesValue !== 'string') {
            throw new Error("Files value is not a valid JSON string");
          }
          let files = JSON.parse(filesValue);
          this.fileUploadedId = files
          this.fileFormattedString = `{${this.fileUploadedId.map((fl) => `'${fl}'`).join(',')}}`;
          const transformedArray = files.map(item => ({ id: item }));
          this.filesRender = transformedArray
          console.log("files:", files)
        } catch (error) {
          console.error("Error processing response:", error.message);
        }
      });

      this.ticketName = this.ticketInfo.title;
      if (!this.ticketInfo.tags) {
        this.tags = []
      } else {
        let arrTags = (this.ticketInfo.tags).split(',')
        this.tags.push(...arrTags);
      }

      this.ticket_description = this.ticketInfo.description;
      this.selectedProjectId = this.ticketInfo.project_id;
      this.ticket_num = this.ticketInfo.ticket_num;
      this.editMode = true;
      this.getDepartmentNameAndSecuance(this.ticketInfo.project_id);
      this.getExecutorBasicInfo();
    },

    styleAvatar(index) {
      return {
        zIndex: 9999,
        left: index * 30 + 'px'
      };
    },
    focusInput() {
      this.$refs.tagRef.focus()
    },
    deleteUploadedFile(index) {
      this.files.splice(index, 1)
      this.images.splice(index, 1)
      this.formattedString = `{${this.images.map((img) => `'${img}'`).join(',')}}`;
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    fileUpload(e) {
      const files = e.target.files;
      console.log("files:", files)
    },
    onFileChange(e) {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          alert('Один из выбранных файлов не является изображением.');
          return;
        }
        const originalSize = file.size;
        new Compressor(file, {
          quality: 0.6,
          success: (compressedFile) => {
            const compressedSize = compressedFile.size;
            if (compressedSize > 1 * 1024 * 1024) {
              this.$platonApp.errorToast("Размер сжатого файла превышает 1 МБ")
              return;
            }
            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append('form_element_id', this.form_element_id);
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = () => {
              this.files.push({
                name: compressedFile.name,
                imageUrl: reader.result
              });
            };
            this.$api.post('https://smart-office.uz/services/platon-core/web/v1/public/forms/file/upload', formData)
                .then((res) => {
                  this.images.push(res.data.id);
                  this.conditionImageUpload = true;
                  this.formattedString = `{${this.images.map((img) => `'${img}'`).join(',')}}`;
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
          },
          error: (err) => {
            console.error('Error compressing file:', err.message);
          },
        });
      }
    },
    getExecutorBasicInfo() {
      this.$api.get(`v1/new/ticket/executors?type=1&project_id=${this.selectedProjectId}`).then(res => {
        this.main_executors = res.data.data.main_executors;
      })
    },
    getOwnerInfo() {
      this.$api.get("v1/new/ticket/get?type=5").then(res => {
        this.owner_info = res.data.data.owner_info;
      })
    },
    hide() {
      if (this.editMode) {
        this.$emit('hideEditTicketModal');
        this.clearForm();
        return
      }
      this.$emit('hideTicketModal');
      this.clearForm();
    },
    addTag() {
      if (this.tagInput.trim() !== "") {
        this.tags.push(this.tagInput.trim());
        this.tagInput = "";
      }
    },
    deleteTag(index) {
      this.tags.splice(index, 1)
    },
    getDepartmentNameAndSecuance(id) {
      this.$api.get(`v1/new/get-tickets?type=5&id=${id}`).then((res) => {
        this.name = res.data.data.department_seq_name.name;
        this.sequence = res.data.data.department_seq_name.sequence;
        this.department = res.data.data.department_seq_name.short_name_department;
      }).then(() => {
        this.addTicketNum(this.name, this.sequence);
      });
    },
    addTicketNum(name, sequence) {
      let checkName = parseInt(name.slice(0, 2));
      if (isNaN(checkName)) {
        let words = name.replace('"', "").split(' ');
        if (words.length == 1) {
          this.ticket_num = 'T' + '-' + words[0][0].toUpperCase() + '-' + sequence;
        } else {
          if (words[1][0] == '(') {
            this.ticket_num = 'T' + '-' + words[0][0].toUpperCase() + '-' + sequence;
          } else {
            this.ticket_num = 'T' + '-' + words[0][0].toUpperCase() + words[1][0].toUpperCase() + '-' + sequence;
          }
        }
      } else {
        this.ticket_num = 'T' + '-' + checkName + '-' + sequence;
      }
    },
    validationName() {
      if (this.ticketName) {
        return true
      } else {
        this.$platonApp.errorToast('Тикет номини киритинг!')
        return false
      }
    },
    validationProject() {
      if (this.selectedProjectId) {
        return true
      } else {
        this.$platonApp.errorToast('Проектни танланг!')
        return false
      }
    },
    saveTicket() {
      if (!this.validationName()) return
      if (!this.validationProject()) return
      if (!this.ticket_description) {
        this.$platonApp.errorToast("Тикет хакида купрок маълумот киритинг!")
        return
      }
      let ticketData = {
        title: this.ticketName,
        project_id: this.selectedProjectId,
        tags: `{${this.tags.map(tag => `'${tag}'`).join(',')}}`,
        ticket_num: this.ticket_num,
        description: this.ticket_description,
        images: this.formattedString,
        files: this.fileFormattedString
      };
      if (this.editMode) {
        this.$api.post('v1/new/ticket/update?type=1', {
          title: this.ticketName,
          project_id: this.selectedProjectId,
          tags: `{${this.tags.map(tag => `'${tag}'`).join(',')}}`,
          ticket_num: this.ticket_num,
          description: this.ticket_description,
          images: this.formattedString,
          id: this.ticketInfo.id,
          files: this.fileFormattedString
        }).then(res => {
          this.sendTicketId = res.data.data.update.id
          this.hide();
        }).catch(error => {
          console.error('Error:', error);
        })
        return
      }
      this.$api.post('v1/new/create/ticket', {
        ...ticketData
      }).then(res => {
        this.sendTicketId = res.data.data.create.id;
        this.showTicketTopics(res.data.data.create.id);
        this.hide();
      }).catch(error => {
        console.error('Error:', error);
        return this.$platonApp.errorToast("xatolik!");
      })
    },
    showTicketTopics(id) {
      this.$router.push({ path: '/pages/ticket-info', query: { ticket_id: id } });
    },
    clearForm() {
      this.ticketName = ""
      this.tagInput = ""
      this.ticket_num = ""
      this.selectedProjectId = ""
      this.tags = []
    },
    compressStart(images) {
      images.forEach((image) => {
        const imageUrl = `${window.location.origin}/uploads/images/${image}`;
        const name = "image.jpg";
        const type = "image/jpeg";
        this.urlToFile(imageUrl, name, type)
            .then((file) => {
              if (file && file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                  this.resizeImage(e.target.result, file.type, file.name, file.size, image)
                }
                reader.readAsDataURL(file)
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
      })
    },
    async urlToFile(url, name, type) {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], name, {
        type: type
      });
    },
    resizeImage(dataUrl, type, name, size, imageId) {
      const img = new Image()
      img.onload = async () => {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        const maxWidth = 800
        const maxHeight = 800
        let width = img.width
        let height = img.height
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        this.resizedImage = canvas.toDataURL(type, 0.7)
        const base64Prefix = this.resizedImage.indexOf("base64,") + 7;
        const base64Data = this.resizedImage.substring(base64Prefix);
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const binaryArray = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          binaryArray[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([binaryArray], {
          type: type
        });
        const file = new File([blob], name, {
          type: type
        });
        let base64File = `data:${blob.type};base64,${base64Data}`
        let fileName = `${file.name}`
        this.files.push({
          imageUrl: base64File,
          name: fileName
        })
        let images = []
        this.images.push(imageId)
        this.formattedString = `{${this.images.map((img) => `'${img}'`).join(',')}}`;
      }
      img.src = dataUrl
    },
    triggerFileInput() {
      this.$refs.fileInput2.click();
    },
    handleFileChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.uploadFile(files[i]);
      }
    },
    uploadFile(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('form_element_id', 15773);
      this.$api.post('https://smart-office.uz/services/platon-core/web/v1/public/forms/file/upload', formData)
          .then((res) => {
            this.filesRender.push(res.data);
            this.fileUploadedId.push(res.data.id);
            this.fileFormattedString = `{${this.fileUploadedId.map((fl) => `'${fl}'`).join(',')}}`;
          })
          .catch((error) => {
            console.error('Error:', error);
          });

    },
    removeUploadedFile(index) {
      this.uploadedFiles.splice(index, 1);
    },
  },
}
</script>
