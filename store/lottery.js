import { defineStore } from "pinia";

export const useLotteryStore = defineStore('lottery', {
    state: () => ({
        stockTitle: '',
        lottoNumber: []
    }),
    getters: {
        _stockTitle: (state) => state.stockTitle
    },
    actions: {
        async updateNumberSelect(store_name, type, number, convert) {
            const _payload = {'type': type, 'number': number}
            // if(this.lottoNumber.length === 0) this.lottoNumber.push(_payload)
            // else {
            //     const _number = this.lottoNumber.filter(n => n.number == number)
            //     const _indexOf = this.lottoNumber.findIndex(n => n.number == number)
            //     if(_indexOf >= 0) {
            //         if(this.lottoNumber[_indexOf].type.length > 1) {
            //             this.lottoNumber[_indexOf].type.forEach((t, i) => {
            //                 this.lottoNumber[_indexOf].type.splice(i, 1)
            //             })
            //         }
            //         else {
            //             this.lottoNumber.splice(_indexOf, 1)
            //         }
            //     }
            //     else {
            //         this.lottoNumber.push(_payload)
            //     }
            // }
            
            this.lottoNumber.push(_payload)
            this.setLocalStore(store_name)
        },
        async removeNumber(store_name, index, type) {
            this.lottoNumber = JSON.parse(localStorage.getItem(store_name))
            const r = this.lottoNumber.find((_r, _i) => { return _i === index })
            const t = r.type.findIndex(_t => { return _t === type })

            this.lottoNumber.splice(index, 1)
            if(r.type.length > 1) {
                r.type.splice(t, 1)
                this.lottoNumber.push(r)
            }
            this.setLocalStore(store_name)
        },
        setLocalStore(store_name) {
            localStorage.setItem(store_name, JSON.stringify(this.lottoNumber.sort((a,b) => a.number - b.number)))
        },
        async getLotteryNumber(store_name) {
            this.lottoNumber = JSON.parse(localStorage.getItem(store_name)) ?? []
        },
        async clearNumber(store_name) {
            this.lottoNumber = []
            localStorage.removeItem(store_name)
        },
        async removeType(store_name, type) {
            this.lottoNumber = JSON.parse(localStorage.getItem(store_name))
            // _i > มี type ที่ส่งมาอยู่ในนั้น
            // i_ > มี type ที่ส่งมาและมีเพียง 1 length
            const _i = [], i_ = []
            this.lottoNumber.forEach((item, index) => { if(item.type.find(_t => { return _t === type })) { _i.push(index) } })
            for(let i = 0; i < _i.length; i++) {
                if(this.lottoNumber[_i[i]].type.length > 1) {
                    let typeIndex = this.lottoNumber[_i[i]].type.findIndex(t => { return t === type })
                    this.lottoNumber[_i[i]].type.splice(typeIndex, 1)
                }
                else i_.push(_i[i])
            }
            i_.reverse((a,b) => a.number - b.number)
            for(let i = 0; i < i_.length; i++) { this.lottoNumber.splice(i_[i], 1) }
            this.setLocalStore(store_name)
        }
    }
})