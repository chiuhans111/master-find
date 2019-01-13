
import settings from 'electron-settings'

export default {
    get data() {
        return {
            xmlPath: settings.get('xmlPath', ""),
            numWorkers: settings.get('numWorkers', 2),
        }
    }, settings
}