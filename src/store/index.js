import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        documents: null,
        currentDocuments: {},
        selectedFiles: [],
        error: null
	},
	mutations: {
		setDocumentsSuccess(state, payload) {
            state.documents = payload
		},
		setDocumentsFailure(state, payload) {
			state.error = payload
        },
        setCurrentDocuments(state, payload) {
            state.currentDocuments = payload
        },
        addToSelectedFiles(state, payload) {
            state.selectedFiles = [...state.selectedFiles, payload]
        },
        removeFromSelectedFiles(state, payload) {
            state.selectedFiles = payload
        },
        clearSelectedFiles(state) {
            state.selectedFiles = []
        }
    },
	actions: {
		getDocuments({ commit }) {
			axios.get('https://api-dev.reo.so/api/folderStructure').then(response => {
                const documents = response.data
                commit('setDocumentsSuccess', documents)
                commit('setCurrentDocuments', documents)
            }).catch( error => {
                commit('setDocumentsSuccess', error)
            })
        },
        propagateDocuments({ commit }, folder) {
            commit('setCurrentDocuments', folder)
        },
        selectFile({ commit }, file) {
            commit('addToSelectedFiles', file)
        },
        removeFile({ commit, state }, file) {
            const files = state.selectedFiles.filter(f => f.id !== file.id)
            commit('removeFromSelectedFiles', files)
        },
        clearFiles({ commit }) {
            commit('clearSelectedFiles')
        }
	}
})