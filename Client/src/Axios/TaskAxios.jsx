import axios from 'axios'
import {BaseApi} from '../Constants/TaskUrl'

export const taskInstance = axios.create({
    baseURL:BaseApi
})

