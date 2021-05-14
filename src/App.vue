<template>
  <div id="app">
    <button class="select-files-btn" @click="onSelectFiles">Select Files</button>
    <div class="files-selected-section">
      <p class="files-selected">Files Selected</p>
      <div v-for="(file) in selectedFiles" :key="file.id" class="file-name">
        {{ fileNameFormatted(file.name) }}
      </div>
    </div>
    <DocumentsModal
      :open="documentsModalState"
      @close-documents-modal="closeDocumentsModal"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from './store'
import DocumentsModal from './components/DocumentsModal.vue'

export default {
  name: 'App',
  components: {
    DocumentsModal
  },
  data () {
    return {
      documentsModalState: false
    }
  },
  methods: {
    onSelectFiles () {
      this.documentsModalState = true
      if (!this.documents) {
        store.dispatch('getDocuments')
      }
    },
    closeDocumentsModal () {
      this.documentsModalState = false
    }
  },
  computed: mapState({
    documents: state => state.documents,
    selectedFiles: state => state.selectedFiles,
    fileNameFormatted  () {
      return name => {
        return name.length < 10 ? name : name.slice(0, 10) + '...'
      }
    }
  })
}
</script>

<style>
#app {
  font-family: SF Pro Display, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-items: center;
  margin-top: 124px;
}
.files-selected-section {
  margin-top: 32px;
}
.files-selected {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #262626;
}
.file-name {
  margin-top: 13px;
}
</style>
