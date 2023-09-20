import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY = 'toyDB'

const gToys = [
    {
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: false,
    },
    {
        _id: 't102',
        name: 'Wooden Puzzle Set',
        price: 45,
        labels: ['Puzzle', 'Outdoor'],
        createdAt: 1631032801011,
        inStock: true,
    },
    {
        _id: 't103',
        name: 'Remote Control Car',
        price: 79,
        labels: ['On wheels', 'Battery Powered', 'Outdoor'],
        createdAt: 1631033801011,
        inStock: true,
    }
]

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.inStock) {
                if (filterBy.inStock === 'false') {
                    toys = toys.filter(toy => toy.inStock === false)
                } else {
                    toys = toys.filter(toy => toy.inStock === true)
                }
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    return storageService[method](STORAGE_KEY, toy)
}

function getDefaultFilter() {
    return { txt: '', inStock: '' }
}

function getDefaultSort() {
    return { type: '', desc: -1 }
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = gToys
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}