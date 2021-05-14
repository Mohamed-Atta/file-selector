<template>
  <div @click="handleClick" class="document-item">
    <div v-if="isFolder" class="folder-icon ml-16">
      <img class="folder-icon-img" src="../assets/icons/folder-icon.svg" alt="">
    </div>
    <div v-else class="ml-16">
      <img class="file-img" src="../assets/images/room.jpeg" alt="">
    </div>
    <h1 class="item-name">{{ name }}</h1>
    <div v-if="isFolder" class="next-btn">
      <img src="../assets/icons/next.svg" alt="">
    </div>
    <div v-else class="check">
      <img v-if="isSelectedFile" src="../assets/icons/check.svg" alt="">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DocumentsModal',
  props: {
    isFolder: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    file: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  methods: {
    handleClick () {
      if (this.isFolder) {
        this.$emit('show-child-documents')
      } else {
        if(!this.selectedFiles.includes(this.file)) {
          this.$store.dispatch('selectFile', this.file)
        } else {
          this.$store.dispatch('removeFile', this.file)
        }
      }
    }
  },
  computed: mapState({
    selectedFiles: state => state.selectedFiles,
    isSelectedFile () {
      if(this.selectedFiles.includes(this.file)) {
        return true
      }
      return false
    }
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.document-item {
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 16px 0;
  cursor: pointer;
  padding-top: 8px;
}
.document-item:hover {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}
.document-item:active {
  background: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}
.next-btn, .check {
  width: 10%;
  cursor: pointer;
  margin-right: 20px;
  margin-top: 4px;
}
.folder-icon {
  width: 10%;
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
.folder-icon-img {
  margin: 6px;
}
.item-name {
  width: 80%;
  margin: 4px 0 0 12px;
  font-size: 16px;
  line-height: 19px;
  font-weight: normal;
  color: #262626;
  text-align: left;
}
.file-img {
  width: 28px;
  height: 28px;
}
</style>
