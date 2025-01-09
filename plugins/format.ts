export default defineNuxtPlugin(() => {
    return {
        provide: {
            numberFormat: (amount: number) => new Intl.NumberFormat().format(amount),
            dateFormat: (date: Date) => {
                const _date = new Date(date)
                return _date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
            },
            timeFormat: (date: Date) => {
                const _date = new Date(date)
                return `${String(_date.getHours()).padStart(2, '0')}:${String(_date.getMinutes()).padStart(2, '0')}`
            }
        }
    }
})