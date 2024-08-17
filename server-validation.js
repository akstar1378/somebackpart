import * as yup from 'yup'

import { duplicateChecker } from '@/app/sakoku/server'

export const serverSchema = yup.object().shape({
    ip: yup
        .string()
        .required('IP is required')
        .matches(
            /(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2}))\.){3}(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2})))/,
            'Invalid IP address'
        )
        .test('Duplicate IP', 'IP is duplicate', async value => {
            return await duplicateChecker(value)
        }),
    serverId: yup
        .string()
        .required('Server ID is required')
        .min(2, 'Server ID must be at least 2 characters long')
        .max(5, 'Server ID must be less than or equal to 5'),
    location: yup
        .string()
        .required('Location is required')
        .min(2, 'Location must be at least 2 characters long')
        .max(15, 'Location must be less than or equal to 15'),
    protocol: yup
        .string()
        .required('Protocol is required')
        .min(2, 'Protocol must be at least 2 characters long')
        .max(20, 'Protocol must be less than or equal to 20')
        .matches(/(v2ray|hysteria2)/, 'Invalid protocol')
})
