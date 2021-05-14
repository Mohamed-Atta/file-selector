<template>
  <div v-if="open" class="documents-modal">
    <div class="header">
      <div v-if="!isRootDirectory" @click="back" class="back-btn">
        <img src="../assets/icons/back.svg" alt="">
      </div>
      <h1 :class="`header-title ${isRootDirectory ? 'pl-24' : ''}`">{{ title }}</h1>
      <div class="close-btn" @click="close">
        <img src="../assets/icons/close.svg" alt="">
      </div>
    </div>
    <div class="modal-body">
      <div v-for="(folder) in folders" :key="folder.id">
        <DocumentItem
          :name="folder.name"
          is-folder
          @show-child-documents="showChildDocuments(folder)"
        />
      </div>
      <div v-for="(file) in files" :key="file.id">
        <DocumentItem
          :name="file.name"
          :file="file"
        />
      </div>
    </div>
    <div class="footer">
      <button @click="selectFiles" class="select-files-btn" :disabled="selectedFiles.length === 0">
        <span v-if="selectedFiles.length === 0">Select Files</span>
        <span v-else>Select {{ selectedFiles.length }} file{{ selectedFiles.length > 1 ? 's' : '' }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DocumentItem from './DocumentItem.vue'

export default {
  name: 'DocumentsModal',
  components: {
    DocumentItem
  },
  data () {
    return {
      isRootDirectory: true,
      title: 'Torstraße 145, 39481 Nürnberg'
    }
  },
  props: {
    open: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    close () {
      this.$store.dispatch('clearFiles')
      this.$emit('close-documents-modal')
    },
    selectFiles () {
      this.$emit('close-documents-modal')
    },
    findDocument(id, currentDocument) {
      let i, currentChild, result
      if (id == currentDocument.id) {
        return currentDocument
      } else {
        for (i = 0; i < currentDocument.folders.length; i += 1) {
          currentChild = currentDocument.folders[i]
          result = this.findDocument(id, currentChild)
          if (result) {
            return result
          }
        }
        return false
      }
    },
    setFolderTitle (title) {
      this.title = title
    },
    back () {
      if (!this.parentFolderId) { // No parent id means get back to root
        this.isRootDirectory = true
        this.title = 'Torstraße 145, 39481 Nürnberg'
        this.$store.dispatch('propagateDocuments', this.$store.state.documents)
      } else {
        this.title = this.findDocument(this.parentFolderId, this.$store.state.documents).name
        this.$store.dispatch('propagateDocuments', this.findDocument(this.parentFolderId, this.$store.state.documents))
      }
    },
    showChildDocuments (folder) {
      this.isRootDirectory = false
      this.setFolderTitle(folder.name)
      this.$store.dispatch('propagateDocuments', folder)
    }
  },
  computed: mapState({
    selectedFiles: state => state.selectedFiles,
    parentFolderId: state => state.currentDocuments?.parentFolderId,
    folders: state => state.currentDocuments?.folders,
    files: state => state.currentDocuments?.files
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.documents-modal {
  margin: auto;
  position: fixed;
  z-index: 2;
  top: 124px;
  left: 50%;
  transform: translateX(-50%);
  width: 420px;
  height: 380px;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 8px 24px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.header {
  height: 60px;
  padding-top: 18px;
  display: flex;
  flex-direction: row;
}
.header-title {
  width: 80%;
  margin: 0;
  font-size: 20px;
  line-height: 24px;
  color: #262626;
  text-align: left;
}
.back-btn, .close-btn {
  padding-top: 4px;
  width: 10%;
  cursor: pointer;
}
.back-btn {
  padding-left: 12px;
}
.close-btn {
  padding-right: 13px;
}
.modal-body {
  height: 270px;
  overflow: scroll;
}
.footer {
  height: 50px;
  padding-top: 16px;
  padding-right: 16px;
  text-align: right;
}
</style>
