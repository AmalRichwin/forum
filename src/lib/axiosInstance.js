import axios from 'axios'

import { BASE_API_URL } from '../utils/constants'

export default axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})
